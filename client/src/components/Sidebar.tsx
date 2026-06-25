import { Trail } from '@/lib/curriculum';
import { useProgress } from '@/hooks/useProgress';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  onSelectTrail: (trailId: string) => void;
  selectedTrailId?: string;
}

export function Sidebar({ onSelectTrail, selectedTrailId }: SidebarProps) {
  const { trails, getTrailProgress } = useProgress();
  const [expandedTrail, setExpandedTrail] = useState<string | null>(selectedTrailId || null);

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen overflow-y-auto fixed left-0 top-0 pt-20 flex flex-col">
      <div className="px-4 py-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-sidebar-accent mb-4">
          Trilhas de Aprendizado
        </h2>

        <nav className="space-y-2">
          {trails.map(trail => (
            <div key={trail.id}>
              <button
                onClick={() => {
                  onSelectTrail(trail.id);
                  setExpandedTrail(expandedTrail === trail.id ? null : trail.id);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                  selectedTrailId === trail.id
                    ? 'bg-sidebar-accent/20 text-sidebar-accent'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/10'
                }`}
              >
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-lg">{trail.icon}</span>
                  <span className="flex-1">{trail.title}</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    expandedTrail === trail.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Módulos expandidos */}
              {expandedTrail === trail.id && (
                <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border/50 pl-3">
                  {trail.modules.map(module => {
                    const progress = getTrailProgress(trail.id);
                    const isCompleted = module.completed;

                    return (
                      <div
                        key={module.id}
                        className={`text-xs py-1.5 px-2 rounded transition-colors duration-200 ${
                          isCompleted
                            ? 'bg-green-500/10 text-green-300 border border-green-500/30'
                            : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/5'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          {isCompleted ? (
                            <span className="text-green-400">✓</span>
                          ) : (
                            <span className="text-sidebar-accent">•</span>
                          )}
                          <span className="truncate">{module.title}</span>
                        </div>
                        <div className="text-xs mt-1 text-sidebar-foreground/50">
                          {module.duration}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Progress bar */}
              <div className="mt-2 px-3 h-1.5 bg-sidebar-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sidebar-accent to-cyan-400 transition-all duration-300"
                  style={{ width: `${getTrailProgress(trail.id)}%` }}
                />
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer com progresso geral */}
      <div className="mt-auto px-4 py-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/60 mb-2">Progresso Geral</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-sidebar-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sidebar-accent to-cyan-400"
              style={{ width: '0%' }}
            />
          </div>
          <span className="text-xs font-semibold text-sidebar-accent">0%</span>
        </div>
      </div>
    </aside>
  );
}
