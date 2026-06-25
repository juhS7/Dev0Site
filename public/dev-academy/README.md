# Dev Academy

Escola virtual completa em HTML/CSS/JS puro: 6 trilhas, 39 módulos, do iniciante ao engenheiro de software pleno (currículo 2026).

## 🧭 Como rodar

Não há build. Você tem duas opções:

1. **Abrir direto no navegador** — abra `index.html` com duplo clique. Funciona offline.
2. **Servidor estático local** (recomendado para URLs limpas):
   ```bash
   npx serve .
   # ou
   python3 -m http.server 8000
   ```
   E acesse `http://localhost:8000/`.

Dentro do projeto Lovable (TanStack Start), tudo já é servido em `/dev-academy/index.html`.

## 📂 Estrutura

```
dev-academy/
├── index.html               Landing page com as 6 trilhas
├── dashboard.html           Painel de progresso do aluno
├── trilhas/
│   ├── fundamentos.html     Trilha 1: Fundamentos
│   ├── frontend.html        Trilha 2: Frontend
│   ├── backend.html         Trilha 3: Backend
│   ├── cloud.html           Trilha 4: Cloud & DevOps
│   ├── ai-llm.html          Trilha 5: AI / LLM
│   └── arquitetura.html     Trilha 6: Arquitetura & Boas Práticas
├── aulas/
│   ├── trilha-1/modulo-1..5.html
│   ├── trilha-2/modulo-1..7.html
│   ├── trilha-3/modulo-1..7.html
│   ├── trilha-4/modulo-1..7.html
│   ├── trilha-5/modulo-1..6.html
│   └── trilha-6/modulo-1..7.html
├── assets/
│   ├── style.css            Design system (dark navy + índigo/cyan)
│   └── app.js               Catálogo de módulos, progresso, quiz, sidebar
└── README.md
```

## 🎓 Currículo (39 módulos)

- **Trilha 1 — Fundamentos** (5): Lógica, JavaScript, TypeScript, Python, SQL
- **Trilha 2 — Frontend** (7): HTML/CSS, React, React Avançado, Next.js 15, Tailwind, React Query, WebSockets
- **Trilha 3 — Backend** (7): Node.js, Fastify, REST, GraphQL, Prisma, PostgreSQL Avançado, Redis
- **Trilha 4 — Cloud/DevOps** (7): Cloud Computing, AWS Core, Serverless, Docker, Kubernetes, Terraform, CI/CD
- **Trilha 5 — AI/LLM** (6): IA Fundamentos, OpenAI API, Prompt Eng, LangChain, RAG, MCP
- **Trilha 6 — Arquitetura** (7): Clean Code, Clean Architecture, DDD, Testes, Microsserviços, Segurança, Code Review

## 🧠 Roadmap de conteúdo

Esta entrega corresponde à **Fase 1** do roadmap:

- ✅ Design system, navegação e sistema de progresso completos
- ✅ Landing, dashboard, todas as páginas de trilha
- ✅ **Trilha 1** com conteúdo completo (texto denso, código real, callouts e quiz)
- 🟡 Trilhas 2–6 com páginas stub navegáveis (conteúdo completo publicado por fase)

Cada módulo tem ID estável (`t1-m1`, `t2-m3`, etc.) — o progresso já salvo no `localStorage` continua válido conforme o conteúdo é publicado.

## 💾 Sistema de progresso

Tudo é salvo em `localStorage` na chave `dev-academy:v1`:

```json
{
  "user": { "name": "Aluno", "started": "2026-01-01T00:00:00Z" },
  "lastVisited": "t1-m3",
  "progress": {
    "t1-m1": { "completed": true, "score": 100, "date": "..." },
    "t1-m2": { "completed": false, "score": 75 }
  }
}
```

- O dashboard mostra % global, por trilha e link "continuar de onde parou".
- Quiz precisa de **score ≥ 60%** para liberar o botão "Marcar como concluído".
- Limpando o storage do navegador, o progresso é resetado.

## 🛠 Tecnologias usadas no site

- HTML5 semântico, CSS3 puro (variáveis CSS, Grid, Flexbox), JS vanilla.
- **CDNs**: Google Fonts (Inter + JetBrains Mono), Prism.js 1.29 (tema tomorrow).
- **Zero build, zero frameworks**, zero dependências runtime além das CDNs acima.

## ✏️ Adicionando um novo módulo de conteúdo

1. Crie `aulas/trilha-X/modulo-Y.html` copiando um módulo existente como base.
2. Substitua o conteúdo dentro de `<article id="da-content">`.
3. No bloco `<script>` final, atualize `moduleId`, `toc` e `quiz`.
4. Se for um módulo novo (não substituindo um stub), adicione-o em `assets/app.js` dentro do array `TRILHAS`.

---

Conteúdo educacional aberto, feito para acompanhar o currículo de um engenheiro de software pleno em 2026.
