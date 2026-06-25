import { useProgress } from '@/hooks/useProgress';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onMenuToggle?: (open: boolean) => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { overallProgress } = useProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    onMenuToggle?.(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-background border-b border-border z-50 flex items-center px-6">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Logo e Título */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">&lt;/&gt;</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Dev Academy</h1>
            <p className="text-xs text-muted-foreground">Engenheiro de Software</p>
          </div>
        </div>

        {/* Desktop Progress */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Progresso Geral</p>
              <p className="text-lg font-bold text-primary">{overallProgress}%</p>
            </div>
            <div className="w-24 h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 hover:bg-card rounded-lg transition-colors"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
