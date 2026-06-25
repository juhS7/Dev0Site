import { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ModuleView } from '@/components/ModuleView';
import { useProgress } from '@/hooks/useProgress';
import { Grid, BookOpen } from 'lucide-react';

export default function Dashboard() {
  const { trails, getTrail, overallProgress, getTrailProgress } = useProgress();
  const [selectedTrailId, setSelectedTrailId] = useState<string | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectedTrail = selectedTrailId ? getTrail(selectedTrailId) : null;
  const selectedModule = selectedTrail && selectedModuleId
    ? selectedTrail.modules.find(m => m.id === selectedModuleId)
    : null;

  const currentModuleIndex = selectedTrail
    ? selectedTrail.modules.findIndex(m => m.id === selectedModuleId)
    : -1;

  const handleSelectTrail = (trailId: string) => {
    setSelectedTrailId(trailId);
    // Selecionar primeiro módulo automaticamente
    const trail = getTrail(trailId);
    if (trail && trail.modules.length > 0) {
      setSelectedModuleId(trail.modules[0].id);
    }
  };

  const handleNextModule = () => {
    if (selectedTrail && currentModuleIndex < selectedTrail.modules.length - 1) {
      setSelectedModuleId(selectedTrail.modules[currentModuleIndex + 1].id);
    }
  };

  const handlePreviousModule = () => {
    if (selectedTrail && currentModuleIndex > 0) {
      setSelectedModuleId(selectedTrail.modules[currentModuleIndex - 1].id);
    }
  };

  // Visualização de Trilhas (Grid)
  if (!selectedTrailId || !selectedModule) {
    return (
      <div className="min-h-screen bg-background">
        <Header onMenuToggle={setMobileMenuOpen} />

        <div className="flex">
          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block`}>
            <Sidebar onSelectTrail={handleSelectTrail} selectedTrailId={selectedTrailId || undefined} />
          </div>

          <main className="flex-1 ml-0 md:ml-64 pt-20 p-6">
            <div className="max-w-6xl mx-auto">
              {/* Hero Section */}
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Bem-vindo à Dev Academy
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Aprenda engenharia de software do zero ao profissional. Escolha uma trilha para começar.
                </p>

                {/* Progresso Geral */}
                <div className="bg-card border border-border rounded-lg p-6 mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold text-foreground">Seu Progresso</h2>
                    <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
                  </div>
                  <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Grid de Trilhas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trails.map(trail => {
                  const progress = getTrailProgress(trail.id);
                  const completedModules = trail.modules.filter(m => m.completed).length;

                  return (
                    <button
                      key={trail.id}
                      onClick={() => handleSelectTrail(trail.id)}
                      className="module-card text-left group"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl">{trail.icon}</div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{progress}%</div>
                          <div className="text-xs text-muted-foreground">
                            {completedModules}/{trail.modules.length}
                          </div>
                        </div>
                      </div>

                      {/* Conteúdo */}
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {trail.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">{trail.description}</p>

                      {/* Progress Bar */}
                      <div className="h-2 bg-border rounded-full overflow-hidden mb-4">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      {/* Módulos Preview */}
                      <div className="space-y-1">
                        {trail.modules.slice(0, 3).map(module => (
                          <div key={module.id} className="flex items-center gap-2 text-xs">
                            {module.completed ? (
                              <span className="text-green-400">✓</span>
                            ) : (
                              <span className="text-muted-foreground">•</span>
                            )}
                            <span className="text-muted-foreground truncate">{module.title}</span>
                          </div>
                        ))}
                        {trail.modules.length > 3 && (
                          <div className="text-xs text-muted-foreground italic">
                            +{trail.modules.length - 3} mais módulos
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Visualização de Módulo
  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={setMobileMenuOpen} />

      <div className="flex">
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block`}>
          <Sidebar
            onSelectTrail={handleSelectTrail}
            selectedTrailId={selectedTrailId || undefined}
          />
        </div>

        <main className="flex-1 ml-0 md:ml-64 pt-20 flex flex-col">
          {selectedTrail && selectedModule && (
            <ModuleView
              trailId={selectedTrailId}
              module={selectedModule}
              onNext={handleNextModule}
              onPrevious={handlePreviousModule}
              hasNext={currentModuleIndex < selectedTrail.modules.length - 1}
              hasPrevious={currentModuleIndex > 0}
            />
          )}
        </main>
      </div>
    </div>
  );
}
