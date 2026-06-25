import { useState, useEffect } from 'react';
import { Trail, allTrails, calculateProgress } from '@/lib/curriculum';

const STORAGE_KEY = 'dev-academy-progress';

export function useProgress() {
  const [trails, setTrails] = useState<Trail[]>(allTrails);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar progresso do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const savedTrails = JSON.parse(saved);
        setTrails(savedTrails);
      } catch (error) {
        console.error('Erro ao carregar progresso:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Salvar progresso no localStorage sempre que mudar
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trails));
    }
  }, [trails, isLoaded]);

  // Marcar módulo como concluído
  const completeModule = (trailId: string, moduleId: string) => {
    setTrails(trails.map(trail => {
      if (trail.id === trailId) {
        return {
          ...trail,
          modules: trail.modules.map(module => {
            if (module.id === moduleId) {
              return { ...module, completed: true };
            }
            return module;
          }),
          completed: trail.modules.every(m => m.id === moduleId || m.completed)
        };
      }
      return trail;
    }));
  };

  // Desmarcar módulo
  const uncompleteModule = (trailId: string, moduleId: string) => {
    setTrails(trails.map(trail => {
      if (trail.id === trailId) {
        return {
          ...trail,
          modules: trail.modules.map(module => {
            if (module.id === moduleId) {
              return { ...module, completed: false };
            }
            return module;
          }),
          completed: false
        };
      }
      return trail;
    }));
  };

  // Obter módulo específico
  const getModule = (trailId: string, moduleId: string) => {
    const trail = trails.find(t => t.id === trailId);
    if (!trail) return null;
    return trail.modules.find(m => m.id === moduleId) || null;
  };

  // Obter trilha específica
  const getTrail = (trailId: string) => {
    return trails.find(t => t.id === trailId) || null;
  };

  // Calcular progresso geral
  const overallProgress = calculateProgress(trails);

  // Calcular progresso por trilha
  const getTrailProgress = (trailId: string) => {
    const trail = trails.find(t => t.id === trailId);
    if (!trail) return 0;
    const completed = trail.modules.filter(m => m.completed).length;
    return Math.round((completed / trail.modules.length) * 100);
  };

  return {
    trails,
    isLoaded,
    completeModule,
    uncompleteModule,
    getModule,
    getTrail,
    overallProgress,
    getTrailProgress
  };
}
