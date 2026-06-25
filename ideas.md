# Dev Academy — Brainstorming de Design

## Três Abordagens Estilísticas

### 1. **Modern Minimalist** (Probabilidade: 0.08)
Uma interface limpa, centrada em conteúdo, com muito whitespace. Cores neutras (preto, branco, cinza), tipografia sans-serif elegante. Foco total na legibilidade e clareza do conteúdo educacional.

### 2. **Tech Forward Dark** (Probabilidade: 0.05)
Design escuro e sofisticado inspirado em IDEs e ferramentas de desenvolvimento. Cores vibrantes (índigo, ciano) contra fundo navy-escuro. Atmosfera de "hacker/developer", com elementos que remetem a código e terminal.

### 3. **Vibrant Learning Hub** (Probabilidade: 0.02)
Cores ousadas e gradientes dinâmicos (roxo, azul, ciano). Design energético com ilustrações, cards coloridos e muita interatividade visual. Sensação de comunidade e engajamento.

---

## Abordagem Escolhida: **Tech Forward Dark**

A Dev Academy é uma plataforma para engenheiros de software — profissionais que vivem em IDEs escuras, terminais e ambientes de desenvolvimento. O design deve refletir essa realidade, criando uma experiência que se sinta **nativa** ao universo tech, sofisticada e motivadora.

### Design Movement
**Cyberpunk Minimalism** — Influenciado por interfaces de ficção científica, mas com rigor minimalista. Cores saturadas contra fundos escuros, tipografia geométrica, elementos de grid e linhas que remetem a circuitos.

### Core Principles
1. **Dark-First Aesthetics:** Fundo navy-escuro (#0F172A) como base, reduzindo fadiga visual para sessões longas de estudo
2. **Accent-Driven Hierarchy:** Índigo (#6366F1) e Ciano (#22D3EE) como cores de ação, guiando o olhar para elementos interativos
3. **Developer Empathy:** Componentes que respeitam o fluxo de trabalho de um dev — sidebar de navegação, progresso visual claro, código com syntax highlighting
4. **Micro-Interactions:** Transições suaves, hover effects que respondem ao movimento do mouse, animações que comunicam estado

### Color Philosophy
- **Fundo:** `#0F172A` (Navy escuro) — profundo, profissional, reduz fadiga
- **Superfícies:** `#1E293B` (Slate escuro) — cards e containers com contraste sutil
- **Accent Primário:** `#6366F1` (Índigo) — botões, links, destaques principais
- **Accent Secundário:** `#22D3EE` (Ciano) — ênfase secundária, hover states
- **Texto Primário:** `#F1F5F9` (Slate claro) — legibilidade máxima
- **Texto Secundário:** `#94A3B8` (Slate médio) — labels, descrições
- **Sucesso:** `#22C55E` (Verde) — conclusão de módulos
- **Aviso:** `#F59E0B` (Âmbar) — atenção, dicas importantes

### Layout Paradigm
**Sidebar + Main Content** — Inspirado em VS Code e JetBrains IDEs. Sidebar fixa à esquerda mostra a estrutura de trilhas e módulos (navegação persistente). Main content area expande para mostrar aulas, quizzes e progresso. Em mobile, sidebar colapsável.

Estrutura em **Grid Assimétrico:** Cards de módulos em grid 2-3 colunas (responsivo), com destaque visual para módulos em progresso vs. concluídos vs. bloqueados.

### Signature Elements
1. **Progress Rings:** Círculos de progresso animados ao redor de ícones de trilhas
2. **Code Blocks com Syntax Highlight:** Blocos de código com tema Dracula/One Dark, com copy button e line numbers
3. **Caixas de Destaque Coloridas:** 💡 Dica (ciano), ⚠️ Atenção (âmbar), 🎯 Objetivo (índigo), 📌 Referência (verde)

### Interaction Philosophy
- **Hover States:** Elementos interativos elevam-se com sombra suave, cores se intensificam
- **Loading States:** Spinners animados em índigo, feedback visual imediato
- **Transições:** 200-300ms ease-out para mudanças de estado
- **Feedback Tátil:** Botões "Marcar como concluído" com animação de checkmark satisfatória

### Animation Guidelines
- **Entrance:** Elementos entram com fade + slide up (150ms ease-out)
- **Hover:** Botões escalam 1.05x com sombra (100ms ease-out)
- **Loading:** Spinners rodam continuamente em índigo
- **Success:** Checkmark com bounce suave (300ms ease-out)
- **Transições de Página:** Fade entre módulos (200ms)

### Typography System
- **Display Font:** `Inter` 700 (bold) — títulos de trilhas e seções principais
- **Body Font:** `Inter` 400-500 — corpo do texto, descrições
- **Code Font:** `JetBrains Mono` — blocos de código, exemplos
- **Escala:** 12px base, 14px corpo, 16px subtítulos, 24px títulos, 36px hero

### Brand Essence
**"Educação de Engenheiro para Engenheiro"** — Uma plataforma que respeita a inteligência e o tempo do desenvolvedor, oferecendo conteúdo profundo, prático e sem fluff. Atmosfera de comunidade tech, rigor técnico, e progressão clara.

**Personalidade:** Profissional, Acessível, Motivadora

### Brand Voice
Títulos e CTAs devem ser diretos, técnicos e motivadores. Sem clichês como "Bem-vindo!" ou "Comece agora!".

**Exemplos de Microcopy:**
- ✅ "Domine TypeScript em 4 módulos" (em vez de "Aprenda TypeScript")
- ✅ "50% da trilha concluída — continue firme" (em vez de "Progresso")
- ✅ "Próximo: Backend com Node.js" (em vez de "Próximo módulo")

### Wordmark & Logo
Um símbolo geométrico: **`</>`** (tags HTML/código) estilizado em índigo com ciano como accent, formando um símbolo de "aprendizado em progresso". Sem texto no logo — apenas o símbolo.

### Signature Brand Color
**Índigo (#6366F1)** — Cor que aparece em todos os CTAs, progresso, destaques. Imediatamente reconhecível como "Dev Academy".

---

## Implementação
Este design será aplicado em:
- Paleta de cores em `client/src/index.css`
- Componentes React com Tailwind + shadcn/ui
- Animações CSS e Framer Motion
- Sidebar persistente com navegação de trilhas
- Cards de módulos com progress rings
- Blocos de código com Prism.js
- Quizzes interativos com feedback visual
