import os
import asyncio
from datetime import datetime
from telegram import Update, WebAppInfo, KeyboardButton, ReplyKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from supabase import create_client, Client

# Конфигурация
TELEGRAM_BOT_TOKEN = "8485022944:AAECrKvSpPa6US-iY_Gsez4F32UGVjIe3rg"
SUPABASE_URL = "https://cegougvcycqkvnxwiqnw.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlZ291Z3ZjeWNxa3ZueHdpcW53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NjQwNzIsImV4cCI6MjA4MTU0MDA3Mn0.fNj9IOgxCp880kNAGkB9difzCP6q8il-QxP1JwBVTCo"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ==================== АВТОРИЗАЦИЯ ====================

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Регистрация/авторизация мерчендайзера"""
    user = update.effective_user
    telegram_id = str(user.id)
    
    # Проверяем существует ли пользователь
    result = supabase.table("merchandisers").select("*").eq("telegram_id", telegram_id).execute()
    
    if result.data:
        merchandiser = result.data[0]
        if merchandiser["status"] == "blocked":
            await update.message.reply_text("❌ Ваш аккаунт заблокирован.")
            return
        await update.message.reply_text(
            f"👋 С возвращением, {merchandiser['name']}!\n"
            f"📊 Баллы: {merchandiser['total_points']}\n\n"
            "Используйте /route для просмотра маршрута."
        )
    else:
        # Создаём нового мерчендайзера
        new_user = {
            "telegram_id": telegram_id,
            "name": user.full_name,
            "phone": "",
            "status": "active",
            "total_points": 0
        }
        supabase.table("merchandisers").insert(new_user).execute()
        await update.message.reply_text(
            f"✅ Добро пожаловать, {user.full_name}!\n"
            "Отправьте свой номер телефона для завершения регистрации.",
            reply_markup=ReplyKeyboardMarkup(
                [[KeyboardButton("📱 Отправить номер", request_contact=True)]],
                resize_keyboard=True, one_time_keyboard=True
            )
        )

async def handle_contact(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Сохранение номера телефона"""
    contact = update.message.contact
    telegram_id = str(update.effective_user.id)
    
    supabase.table("merchandisers").update({
        "phone": contact.phone_number
    }).eq("telegram_id", telegram_id).execute()
    
    await update.message.reply_text("✅ Номер сохранён! Используйте /route для маршрута.")

# ==================== МАРШРУТЫ ====================

async def route(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Показать сегодняшний маршрут"""
    telegram_id = str(update.effective_user.id)
    today = datetime.now().strftime("%Y-%m-%d")
    
    # Получаем мерчендайзера
    merch = supabase.table("merchandisers").select("id").eq("telegram_id", telegram_id).single().execute()
    if not merch.data:
        await update.message.reply_text("❌ Вы не зарегистрированы. Используйте /start")
        return
    
    # Получаем маршрут на сегодня
    route = supabase.table("routes").select(
        "*, route_points(*, stores(*))"
    ).eq("merchandiser_id", merch.data["id"]).eq("date", today).execute()
    
    if not route.data:
        await update.message.reply_text("📭 На сегодня маршрут не назначен.")
        return
    
    route_data = route.data[0]
    points = sorted(route_data.get("route_points", []), key=lambda x: x["order"])
    
    message = f"📍 Маршрут на {today}\n\n"
    for i, point in enumerate(points, 1):
        store = point.get("stores", {})
        status_emoji = {"pending": "⏳", "in_progress": "🔄", "completed": "✅", "skipped": "⏭️"}
        message += f"{i}. {status_emoji.get(point['status'], '⏳')} {store.get('name', 'N/A')}\n"
        message += f"   📍 {store.get('address', 'N/A')}\n\n"
    
    await update.message.reply_text(message)

# ==================== ОТЧЁТЫ С ФОТО ====================

async def handle_photo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработка фото отчёта"""
    telegram_id = str(update.effective_user.id)
    photo = update.message.photo[-1]  # Лучшее качество
    
    # Получаем мерчендайзера
    merch = supabase.table("merchandisers").select("id").eq("telegram_id", telegram_id).single().execute()
    if not merch.data:
        await update.message.reply_text("❌ Сначала зарегистрируйтесь: /start")
        return
    
    # Скачиваем фото
    file = await context.bot.get_file(photo.file_id)
    file_bytes = await file.download_as_bytearray()
    
    # Загружаем в Supabase Storage
    filename = f"{merch.data['id']}/{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
    supabase.storage.from_("reports").upload(filename, bytes(file_bytes), {"content-type": "image/jpeg"})
    
    # Получаем публичный URL
    photo_url = supabase.storage.from_("reports").get_public_url(filename)
    
    # Сохраняем в контекст для создания отчёта
    context.user_data["pending_photo"] = photo_url
    
    await update.message.reply_text(
        "📸 Фото получено!\n\n"
        "Теперь отправьте геолокацию для подтверждения визита.",
        reply_markup=ReplyKeyboardMarkup(
            [[KeyboardButton("📍 Отправить геолокацию", request_location=True)]],
            resize_keyboard=True, one_time_keyboard=True
        )
    )

async def handle_location(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Создание отчёта с геолокацией"""
    telegram_id = str(update.effective_user.id)
    location = update.message.location
    
    photo_url = context.user_data.get("pending_photo")
    if not photo_url:
        await update.message.reply_text("❌ Сначала отправьте фото!")
        return
    
    merch = supabase.table("merchandisers").select("id, name").eq("telegram_id", telegram_id).single().execute()
    
    # Создаём отчёт
    report = {
        "merchandiser_id": merch.data["id"],
        "lat": location.latitude,
        "lng": location.longitude,
        "photo_url": photo_url,
        "status": "pending"
    }
    supabase.table("reports").insert(report).execute()
    
    # Начисляем баллы
    supabase.table("merchandisers").update({
        "total_points": merch.data.get("total_points", 0) + 10
    }).eq("id", merch.data["id"]).execute()
    
    context.user_data.pop("pending_photo", None)
    await update.message.reply_text("✅ Отчёт отправлен! +10 баллов")

# ==================== ЗАПУСК ====================

def main():
    app = Application.builder().token(TELEGRAM_BOT_TOKEN).build()
    
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("route", route))
    app.add_handler(MessageHandler(filters.CONTACT, handle_contact))
    app.add_handler(MessageHandler(filters.PHOTO, handle_photo))
    app.add_handler(MessageHandler(filters.LOCATION, handle_location))
    
    print("🤖 Бот запущен...")
    app.run_polling()

if __name__ == "__main__":
    main()
