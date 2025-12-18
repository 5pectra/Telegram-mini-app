import { Bell, Settings } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <header className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 px-4 py-3 border-b border-border/30">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl hover:bg-secondary transition-colors relative">
            <Bell size={20} className="text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </button>
          <button className="p-2 rounded-xl hover:bg-secondary transition-colors">
            <Settings size={20} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};
