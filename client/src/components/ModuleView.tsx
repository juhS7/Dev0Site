import { Module, Quiz } from '@/lib/curriculum';
import { useProgress } from '@/hooks/useProgress';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ModuleViewProps {
  trailId: string;
  module: Module;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export function ModuleView({
  trailId,
  module,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}: ModuleViewProps) {
  const { completeModule, uncompleteModule } = useProgress();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleCompleteModule = () => {
    if (module.completed) {
      uncompleteModule(trailId, module.id);
    } else {
      completeModule(trailId, module.id);
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'advanced':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header do Módulo */}
      <div className="bg-card border-b border-border p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded border ${getLevelBadgeColor(
                  module.level
                )}`}
              >
                {module.level === 'beginner'
                  ? 'Iniciante'
                  : module.level === 'intermediate'
                    ? 'Intermediário'
                    : 'Avançado'}
              </span>
              <span className="text-xs text-muted-foreground">{module.duration}</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{module.title}</h1>
            <p className="text-muted-foreground">{module.description}</p>
          </div>

          {/* Botão de Conclusão */}
          <button
            onClick={handleCompleteModule}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              module.completed
                ? 'bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30'
                : 'bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30'
            }`}
          >
            {module.completed ? (
              <>
                <Check size={18} />
                Concluído
              </>
            ) : (
              'Marcar como Concluído'
            )}
          </button>
        </div>

        {/* Topics */}
        <div className="mt-4 flex flex-wrap gap-2">
          {module.topics.map(topic => (
            <span
              key={topic}
              className="px-2 py-1 text-xs bg-primary/10 text-primary rounded border border-primary/20"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto p-6">
        {!showQuiz ? (
          <>
            {/* Conteúdo HTML */}
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: module.content }}
            />

            {/* Botão para Quiz */}
            {module.quiz && (
              <div className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-foreground mb-3">
                  Pronto para testar seus conhecimentos?
                </p>
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  Fazer Quiz ({module.quiz.questions.length} perguntas)
                </Button>
              </div>
            )}
          </>
        ) : (
          <QuizView
            quiz={module.quiz!}
            answers={quizAnswers}
            onAnswerChange={(questionId, answer) => {
              setQuizAnswers(prev => ({
                ...prev,
                [questionId]: answer
              }));
            }}
            submitted={quizSubmitted}
            onSubmit={handleQuizSubmit}
            onBack={() => setShowQuiz(false)}
          />
        )}
      </div>

      {/* Footer com Navegação */}
      <div className="bg-card border-t border-border p-6 flex items-center justify-between">
        <Button
          onClick={onPrevious}
          disabled={!hasPrevious}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ChevronLeft size={18} />
          Anterior
        </Button>

        <div className="text-sm text-muted-foreground">
          {module.level === 'beginner'
            ? 'Iniciante'
            : module.level === 'intermediate'
              ? 'Intermediário'
              : 'Avançado'}
        </div>

        <Button
          onClick={onNext}
          disabled={!hasNext}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          Próximo
          <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
}

interface QuizViewProps {
  quiz: Quiz;
  answers: Record<string, number>;
  onAnswerChange: (questionId: string, answer: number) => void;
  submitted: boolean;
  onSubmit: () => void;
  onBack: () => void;
}

function QuizView({
  quiz,
  answers,
  onAnswerChange,
  submitted,
  onSubmit,
  onBack
}: QuizViewProps) {
  const correctCount = quiz.questions.filter(
    q => answers[q.id] === q.correctAnswer
  ).length;
  const percentage = Math.round((correctCount / quiz.questions.length) * 100);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6">Quiz</h2>

      {quiz.questions.map((question, index) => (
        <div key={question.id} className="mb-8 p-6 bg-card border border-border rounded-lg">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {index + 1}. {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, optionIndex) => {
              const isSelected = answers[question.id] === optionIndex;
              const isCorrect = optionIndex === question.correctAnswer;
              const showResult = submitted && isSelected;

              return (
                <label
                  key={optionIndex}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    showResult
                      ? isCorrect
                        ? 'bg-green-500/20 border-green-500/50'
                        : 'bg-red-500/20 border-red-500/50'
                      : isSelected
                        ? 'bg-primary/20 border-primary/50'
                        : 'bg-card border-border hover:border-primary/30'
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={optionIndex}
                    checked={isSelected}
                    onChange={() => onAnswerChange(question.id, optionIndex)}
                    disabled={submitted}
                    className="mr-3"
                  />
                  <span className="flex-1 text-foreground">{option}</span>
                  {showResult && (
                    <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                  )}
                </label>
              );
            })}
          </div>

          {submitted && (
            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-300">
                <strong>Explicação:</strong> {question.explanation}
              </p>
            </div>
          )}
        </div>
      ))}

      {submitted && (
        <div className="mb-8 p-6 bg-card border border-border rounded-lg text-center">
          <h3 className="text-2xl font-bold text-foreground mb-2">Resultado</h3>
          <p className={`text-4xl font-bold mb-2 ${percentage >= 70 ? 'text-green-400' : 'text-yellow-400'}`}>
            {percentage}%
          </p>
          <p className="text-muted-foreground">
            Você acertou {correctCount} de {quiz.questions.length} questões
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="flex-1">
          Voltar ao Conteúdo
        </Button>
        {!submitted && (
          <Button
            onClick={onSubmit}
            disabled={Object.keys(answers).length !== quiz.questions.length}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Enviar Quiz
          </Button>
        )}
      </div>
    </div>
  );
}
