// Dev Academy Curriculum Structure
// Trilhas, módulos e conteúdo educacional

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string; // "2h 30m"
  level: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  completed: boolean;
  locked: boolean;
  content: string; // HTML content
  quiz?: Quiz;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Trail {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  modules: Module[];
  completed: boolean;
}

// TRILHA 1: FUNDAMENTOS
export const trail1: Trail = {
  id: 'fundamentos',
  title: 'Fundamentos da Programação',
  description: 'Aprenda os conceitos essenciais de programação, lógica e linguagens fundamentais',
  icon: '📚',
  color: '#6366F1',
  completed: false,
  modules: [
    {
      id: 'fund-1-1',
      title: 'Lógica de Programação',
      description: 'Algoritmos, variáveis, tipos de dados e estruturas de controle',
      duration: '3h',
      level: 'beginner',
      topics: ['Algoritmos', 'Variáveis', 'Condicionais', 'Loops', 'Funções', 'Recursão'],
      completed: false,
      locked: false,
      content: `
        <h2>Lógica de Programação</h2>
        <p>A lógica de programação é a base de todo desenvolvimento de software. Ela envolve a capacidade de pensar de forma estruturada e resolver problemas usando algoritmos.</p>
        
        <h3>O que é um Algoritmo?</h3>
        <p>Um algoritmo é uma sequência de passos bem definidos para resolver um problema. Exemplo: receita de bolo é um algoritmo!</p>
        
        <div class="highlight-tip">
          💡 <strong>Dica:</strong> Sempre pense em um problema como uma série de passos simples antes de começar a codificar.
        </div>
        
        <h3>Variáveis e Tipos de Dados</h3>
        <p>Variáveis são espaços na memória que armazenam valores. Cada variável tem um tipo de dado:</p>
        <ul>
          <li><strong>String:</strong> texto ("Hello World")</li>
          <li><strong>Number:</strong> números (42, 3.14)</li>
          <li><strong>Boolean:</strong> verdadeiro ou falso (true/false)</li>
          <li><strong>Array:</strong> lista de valores [1, 2, 3]</li>
          <li><strong>Object:</strong> coleção de propriedades {name: "Alex"}</li>
        </ul>
        
        <h3>Condicionais (if/else)</h3>
        <p>Permitem que seu código tome decisões baseado em condições:</p>
        <div class="code-block">
          <pre><code class="language-javascript">
if (idade >= 18) {
  console.log("Você é maior de idade");
} else {
  console.log("Você é menor de idade");
}
          </code></pre>
        </div>
        
        <h3>Loops (for, while)</h3>
        <p>Permitem repetir um bloco de código múltiplas vezes:</p>
        <div class="code-block">
          <pre><code class="language-javascript">
// Loop for
for (let i = 0; i < 5; i++) {
  console.log(i); // Imprime 0, 1, 2, 3, 4
}

// Loop while
let contador = 0;
while (contador < 5) {
  console.log(contador);
  contador++;
}
          </code></pre>
        </div>
        
        <h3>Funções</h3>
        <p>Blocos de código reutilizáveis que realizam uma tarefa específica:</p>
        <div class="code-block">
          <pre><code class="language-javascript">
function saudar(nome) {
  return "Olá, " + nome + "!";
}

console.log(saudar("Alex")); // "Olá, Alex!"
          </code></pre>
        </div>
        
        <div class="highlight-warning">
          ⚠️ <strong>Atenção:</strong> Funções devem ter uma responsabilidade única e clara.
        </div>
      `,
      quiz: {
        questions: [
          {
            id: 'q1',
            question: 'O que é um algoritmo?',
            options: [
              'Uma linguagem de programação',
              'Uma sequência de passos bem definidos para resolver um problema',
              'Um tipo de variável',
              'Um framework JavaScript'
            ],
            correctAnswer: 1,
            explanation: 'Um algoritmo é uma sequência de passos bem definidos. Exemplo: receita de bolo!'
          },
          {
            id: 'q2',
            question: 'Qual é o tipo de dado correto para armazenar um número?',
            options: [
              'String',
              'Boolean',
              'Number',
              'Array'
            ],
            correctAnswer: 2,
            explanation: 'O tipo Number é usado para armazenar valores numéricos como 42 ou 3.14.'
          },
          {
            id: 'q3',
            question: 'Quantas vezes o loop abaixo executa? for (let i = 0; i < 5; i++)',
            options: [
              '4 vezes',
              '5 vezes',
              '6 vezes',
              'Infinitamente'
            ],
            correctAnswer: 1,
            explanation: 'O loop executa enquanto i < 5, então: 0, 1, 2, 3, 4 = 5 vezes.'
          }
        ]
      }
    },
    {
      id: 'fund-1-2',
      title: 'JavaScript Essencial',
      description: 'Variáveis, tipos, arrays, objetos, promises e async/await',
      duration: '4h',
      level: 'beginner',
      topics: ['let/const', 'Tipos primitivos', 'Arrays', 'Objetos', 'Promises', 'async/await'],
      completed: false,
      locked: false,
      content: `
        <h2>JavaScript Essencial</h2>
        <p>JavaScript é a linguagem da web. Vamos dominar os conceitos fundamentais.</p>
        
        <h3>Variáveis: var, let, const</h3>
        <div class="code-block">
          <pre><code class="language-javascript">
// ❌ Evite var (escopo confuso)
var nome = "Alex";

// ✅ Use let (escopo de bloco)
let idade = 25;

// ✅ Use const (não pode ser reatribuída)
const PI = 3.14159;
          </code></pre>
        </div>
        
        <div class="highlight-info">
          🎯 <strong>Objetivo:</strong> Sempre prefira const, use let quando necessário reatribuir, evite var.
        </div>
        
        <h3>Arrays e Métodos Essenciais</h3>
        <div class="code-block">
          <pre><code class="language-javascript">
const numeros = [1, 2, 3, 4, 5];

// map: transforma cada elemento
const dobrados = numeros.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter: mantém apenas elementos que passam no teste
const pares = numeros.filter(n => n % 2 === 0);
// [2, 4]

// reduce: reduz array a um único valor
const soma = numeros.reduce((acc, n) => acc + n, 0);
// 15
          </code></pre>
        </div>
        
        <h3>Objetos e Destructuring</h3>
        <div class="code-block">
          <pre><code class="language-javascript">
const usuario = {
  nome: "Alex",
  idade: 25,
  email: "alex@dev.com"
};

// Destructuring
const { nome, idade } = usuario;
console.log(nome); // "Alex"

// Spread operator
const novoUsuario = { ...usuario, idade: 26 };
          </code></pre>
        </div>
        
        <h3>Promises e async/await</h3>
        <div class="code-block">
          <pre><code class="language-javascript">
// Promise
function buscarDados() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Dados!"), 1000);
  });
}

// async/await (mais legível)
async function obterDados() {
  try {
    const dados = await buscarDados();
    console.log(dados); // "Dados!"
  } catch (erro) {
    console.error(erro);
  }
}
          </code></pre>
        </div>
      `,
      quiz: {
        questions: [
          {
            id: 'q1',
            question: 'Qual é a diferença entre let e const?',
            options: [
              'Não há diferença',
              'let pode ser reatribuída, const não',
              'const é mais rápido',
              'let é apenas para números'
            ],
            correctAnswer: 1,
            explanation: 'let permite reatribuição, const não. Sempre prefira const!'
          }
        ]
      }
    }
  ]
};

// TRILHA 2: FRONTEND
export const trail2: Trail = {
  id: 'frontend',
  title: 'Frontend Moderno',
  description: 'HTML, CSS, React, Next.js e Tailwind CSS',
  icon: '🎨',
  color: '#22D3EE',
  completed: false,
  modules: [
    {
      id: 'front-2-1',
      title: 'HTML & CSS Semântico',
      description: 'HTML5 semântico, Flexbox, Grid e Responsividade',
      duration: '3h',
      level: 'beginner',
      topics: ['HTML5 semântico', 'Flexbox', 'Grid', 'Media queries', 'Acessibilidade'],
      completed: false,
      locked: false,
      content: `
        <h2>HTML & CSS Semântico</h2>
        <p>HTML semântico torna seu código mais legível e acessível.</p>
        
        <h3>HTML5 Semântico</h3>
        <div class="code-block">
          <pre><code class="language-html">
&lt;!-- ✅ Semântico --&gt;
&lt;header&gt;
  &lt;nav&gt;Menu&lt;/nav&gt;
&lt;/header&gt;

&lt;main&gt;
  &lt;article&gt;
    &lt;h1&gt;Título do Artigo&lt;/h1&gt;
    &lt;p&gt;Conteúdo...&lt;/p&gt;
  &lt;/article&gt;
&lt;/main&gt;

&lt;footer&gt;Rodapé&lt;/footer&gt;
          </code></pre>
        </div>
        
        <h3>Flexbox</h3>
        <p>Flexbox é perfeito para layouts unidimensionais (linha ou coluna):</p>
        <div class="code-block">
          <pre><code class="language-css">
.container {
  display: flex;
  justify-content: center; /* Alinha horizontalmente */
  align-items: center;     /* Alinha verticalmente */
  gap: 1rem;               /* Espaço entre itens */
}
          </code></pre>
        </div>
        
        <h3>CSS Grid</h3>
        <p>Grid é perfeito para layouts bidimensionais (linhas e colunas):</p>
        <div class="code-block">
          <pre><code class="language-css">
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
          </code></pre>
        </div>
      `,
      quiz: {
        questions: [
          {
            id: 'q1',
            question: 'Qual tag HTML é usada para o conteúdo principal da página?',
            options: [
              '&lt;section&gt;',
              '&lt;main&gt;',
              '&lt;article&gt;',
              '&lt;div&gt;'
            ],
            correctAnswer: 1,
            explanation: 'A tag &lt;main&gt; define o conteúdo principal e único da página.'
          }
        ]
      }
    },
    {
      id: 'front-2-2',
      title: 'React do Zero',
      description: 'Componentes, Props, Estado e useEffect',
      duration: '4h',
      level: 'intermediate',
      topics: ['Componentes', 'Props', 'useState', 'useEffect', 'Renderização condicional'],
      completed: false,
      locked: false,
      content: `
        <h2>React do Zero</h2>
        <p>React é uma biblioteca JavaScript para construir interfaces de usuário com componentes reutilizáveis.</p>
        
        <h3>Componentes Funcionais</h3>
        <div class="code-block">
          <pre><code class="language-javascript">
function Saudacao({ nome }) {
  return &lt;h1&gt;Olá, {nome}!&lt;/h1&gt;;
}

// Uso
&lt;Saudacao nome="Alex" /&gt;
          </code></pre>
        </div>
        
        <h3>useState - Gerenciando Estado</h3>
        <div class="code-block">
          <pre><code class="language-javascript">
import { useState } from 'react';

function Contador() {
  const [count, setCount] = useState(0);
  
  return (
    &lt;div&gt;
      &lt;p&gt;Contagem: {count}&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Incrementar
      &lt;/button&gt;
    &lt;/div&gt;
  );
}
          </code></pre>
        </div>
        
        <h3>useEffect - Efeitos Colaterais</h3>
        <div class="code-block">
          <pre><code class="language-javascript">
import { useEffect, useState } from 'react';

function Dados() {
  const [dados, setDados] = useState(null);
  
  useEffect(() => {
    // Executado após o render
    fetch('/api/dados')
      .then(res => res.json())
      .then(data => setDados(data));
  }, []); // Array vazio = executa uma vez
  
  return &lt;div&gt;{dados ? JSON.stringify(dados) : 'Carregando...'}&lt;/div&gt;;
}
          </code></pre>
        </div>
      `,
      quiz: {
        questions: [
          {
            id: 'q1',
            question: 'O que é um componente React?',
            options: [
              'Uma função que retorna JSX',
              'Um arquivo HTML',
              'Uma classe CSS',
              'Uma biblioteca externa'
            ],
            correctAnswer: 0,
            explanation: 'Um componente React é uma função JavaScript que retorna JSX (HTML em JS).'
          }
        ]
      }
    }
  ]
};

// TRILHA 3: BACKEND
export const trail3: Trail = {
  id: 'backend',
  title: 'Backend e APIs',
  description: 'Node.js, Fastify, REST APIs, GraphQL e Bancos de Dados',
  icon: '⚙️',
  color: '#8B5CF6',
  completed: false,
  modules: [
    {
      id: 'back-3-1',
      title: 'Node.js Fundamentos',
      description: 'Event loop, módulos nativos, npm e PM2',
      duration: '3h',
      level: 'intermediate',
      topics: ['Event loop', 'Módulos', 'npm', 'Logging', 'PM2'],
      completed: false,
      locked: false,
      content: `
        <h2>Node.js Fundamentos</h2>
        <p>Node.js permite executar JavaScript no servidor. Vamos entender como funciona.</p>
        
        <h3>O Event Loop</h3>
        <p>Node.js é single-threaded mas não-bloqueante. O event loop permite executar operações assíncronas:</p>
        <div class="code-block">
          <pre><code class="language-javascript">
console.log("1. Início");

setTimeout(() => {
  console.log("2. Timeout");
}, 0);

console.log("3. Fim");

// Output:
// 1. Início
// 3. Fim
// 2. Timeout
          </code></pre>
        </div>
        
        <div class="highlight-warning">
          ⚠️ <strong>Atenção:</strong> setTimeout(0) não executa imediatamente! Ele vai para a fila de callbacks.
        </div>
        
        <h3>Módulos Nativos</h3>
        <div class="code-block">
          <pre><code class="language-javascript">
// fs: Sistema de arquivos
const fs = require('fs');
const conteudo = fs.readFileSync('arquivo.txt', 'utf-8');

// path: Manipular caminhos
const path = require('path');
const caminhoCompleto = path.join(__dirname, 'arquivo.txt');

// http: Criar servidor
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Olá!');
});
server.listen(3000);
          </code></pre>
        </div>
      `,
      quiz: {
        questions: [
          {
            id: 'q1',
            question: 'O que é o event loop em Node.js?',
            options: [
              'Um erro que ocorre frequentemente',
              'Um mecanismo que permite executar operações assíncronas',
              'Uma biblioteca de loops',
              'Um tipo de variável'
            ],
            correctAnswer: 1,
            explanation: 'O event loop permite que Node.js execute operações não-bloqueantes mesmo sendo single-threaded.'
          }
        ]
      }
    }
  ]
};

// TRILHA 4: CLOUD & DEVOPS
export const trail4: Trail = {
  id: 'cloud',
  title: 'Cloud, Infra & DevOps',
  description: 'AWS, Docker, Kubernetes, Terraform e CI/CD',
  icon: '☁️',
  color: '#EC4899',
  completed: false,
  modules: [
    {
      id: 'cloud-4-1',
      title: 'Fundamentos de Cloud Computing',
      description: 'IaaS, PaaS, SaaS e modelo de responsabilidade compartilhada',
      duration: '2h',
      level: 'intermediate',
      topics: ['IaaS', 'PaaS', 'SaaS', 'Regiões', 'Availability Zones'],
      completed: false,
      locked: false,
      content: `
        <h2>Fundamentos de Cloud Computing</h2>
        <p>Cloud computing permite acessar recursos de computação sob demanda.</p>
        
        <h3>IaaS, PaaS e SaaS</h3>
        <div class="highlight-info">
          🎯 <strong>IaaS (Infrastructure as a Service):</strong> Você gerencia aplicação, dados, runtime. Provedor gerencia infra.
        </div>
        <div class="highlight-info">
          🎯 <strong>PaaS (Platform as a Service):</strong> Você gerencia aplicação e dados. Provedor gerencia tudo mais.
        </div>
        <div class="highlight-info">
          🎯 <strong>SaaS (Software as a Service):</strong> Você usa a aplicação. Provedor gerencia tudo.
        </div>
        
        <h3>Exemplos Reais</h3>
        <ul>
          <li><strong>IaaS:</strong> AWS EC2, Google Compute Engine</li>
          <li><strong>PaaS:</strong> Heroku, Google App Engine</li>
          <li><strong>SaaS:</strong> Gmail, Slack, Salesforce</li>
        </ul>
      `,
      quiz: {
        questions: [
          {
            id: 'q1',
            question: 'Qual é a diferença entre IaaS e PaaS?',
            options: [
              'Não há diferença',
              'Em IaaS você gerencia mais; em PaaS o provedor gerencia mais',
              'IaaS é mais caro',
              'PaaS é apenas para startups'
            ],
            correctAnswer: 1,
            explanation: 'Em IaaS você gerencia aplicação, dados e runtime. Em PaaS o provedor gerencia mais coisas.'
          }
        ]
      }
    }
  ]
};

// TRILHA 5: AI & LLMs
export const trail5: Trail = {
  id: 'ai-llm',
  title: 'Inteligência Artificial & LLMs',
  description: 'OpenAI API, Prompt Engineering, LangChain, RAG e MCP',
  icon: '🤖',
  color: '#F59E0B',
  completed: false,
  modules: [
    {
      id: 'ai-5-1',
      title: 'Fundamentos de IA para Devs',
      description: 'Machine Learning, Deep Learning, LLMs e Transformers',
      duration: '2h',
      level: 'intermediate',
      topics: ['ML vs DL', 'LLMs', 'Transformers', 'Tokens', 'Embeddings'],
      completed: false,
      locked: false,
      content: `
        <h2>Fundamentos de IA para Devs</h2>
        <p>Entenda como LLMs funcionam e como usá-los em suas aplicações.</p>
        
        <h3>Machine Learning vs Deep Learning vs LLMs</h3>
        <div class="highlight-tip">
          💡 <strong>Machine Learning:</strong> Algoritmos que aprendem padrões dos dados.
        </div>
        <div class="highlight-tip">
          💡 <strong>Deep Learning:</strong> Redes neurais com múltiplas camadas.
        </div>
        <div class="highlight-tip">
          💡 <strong>LLMs:</strong> Modelos treinados em bilhões de parâmetros para entender e gerar texto.
        </div>
        
        <h3>Como um LLM Funciona</h3>
        <p>Um LLM (Large Language Model) como GPT-4 funciona através de:</p>
        <ol>
          <li><strong>Tokenização:</strong> Texto é dividido em tokens (palavras/subpalavras)</li>
          <li><strong>Embeddings:</strong> Cada token é convertido em um vetor numérico</li>
          <li><strong>Transformers:</strong> Rede neural que processa os embeddings</li>
          <li><strong>Predição:</strong> Modelo prediz o próximo token mais provável</li>
        </ol>
        
        <h3>Limitações dos LLMs</h3>
        <div class="highlight-warning">
          ⚠️ <strong>Alucinação:</strong> LLMs podem gerar informações falsas com confiança.
        </div>
        <div class="highlight-warning">
          ⚠️ <strong>Cutoff de Conhecimento:</strong> Modelo foi treinado até uma data específica.
        </div>
        <div class="highlight-warning">
          ⚠️ <strong>Contexto Limitado:</strong> Há um limite de tokens que o modelo pode processar.
        </div>
      `,
      quiz: {
        questions: [
          {
            id: 'q1',
            question: 'O que é um token em um LLM?',
            options: [
              'Uma moeda digital',
              'Uma palavra ou subpalavra que o modelo processa',
              'Um tipo de autenticação',
              'Uma biblioteca JavaScript'
            ],
            correctAnswer: 1,
            explanation: 'Um token é uma unidade de texto (palavra ou subpalavra) que o LLM processa.'
          }
        ]
      }
    }
  ]
};

// TRILHA 6: ARQUITETURA
export const trail6: Trail = {
  id: 'arquitetura',
  title: 'Arquitetura & Boas Práticas',
  description: 'Clean Code, Clean Architecture, SOLID, Design Patterns e Testes',
  icon: '🏗️',
  color: '#22C55E',
  completed: false,
  modules: [
    {
      id: 'arch-6-1',
      title: 'Clean Code',
      description: 'Nomenclatura clara, funções pequenas e code smells',
      duration: '2h',
      level: 'intermediate',
      topics: ['Nomenclatura', 'Funções', 'Comentários', 'Code smells', 'Refatoração'],
      completed: false,
      locked: false,
      content: `
        <h2>Clean Code</h2>
        <p>Código limpo é código que é fácil de ler, entender e manter.</p>
        
        <h3>Nomenclatura Clara</h3>
        <div class="code-block">
          <pre><code class="language-javascript">
// ❌ Ruim
const d = new Date();
const u = getUserData(id);

// ✅ Bom
const dataAtual = new Date();
const usuarioLogado = getUserData(id);
          </code></pre>
        </div>
        
        <h3>Funções Pequenas com Responsabilidade Única</h3>
        <div class="code-block">
          <pre><code class="language-javascript">
// ❌ Ruim - Faz múltiplas coisas
function processarUsuario(id) {
  const usuario = buscarUsuario(id);
  validarEmail(usuario.email);
  salvarNoBanco(usuario);
  enviarEmail(usuario.email);
  registrarLog(usuario);
  return usuario;
}

// ✅ Bom - Uma responsabilidade
function buscarEValidarUsuario(id) {
  const usuario = buscarUsuario(id);
  validarEmail(usuario.email);
  return usuario;
}
          </code></pre>
        </div>
        
        <h3>Code Smells - Sinais de Alerta</h3>
        <div class="highlight-warning">
          ⚠️ <strong>Funções muito longas:</strong> Divida em funções menores.
        </div>
        <div class="highlight-warning">
          ⚠️ <strong>Duplicação de código:</strong> Extraia para uma função reutilizável.
        </div>
        <div class="highlight-warning">
          ⚠️ <strong>Muitos parâmetros:</strong> Use um objeto para agrupar parâmetros relacionados.
        </div>
      `,
      quiz: {
        questions: [
          {
            id: 'q1',
            question: 'Qual é o princípio de responsabilidade única?',
            options: [
              'Uma função deve fazer uma coisa e fazer bem',
              'Uma função deve ter apenas um parâmetro',
              'Uma função deve retornar apenas um valor',
              'Uma função deve ser escrita em uma linha'
            ],
            correctAnswer: 0,
            explanation: 'Uma função deve ter uma única responsabilidade e fazer bem. Isso facilita testes e manutenção.'
          }
        ]
      }
    }
  ]
};

// Array de todas as trilhas
export const allTrails: Trail[] = [trail1, trail2, trail3, trail4, trail5, trail6];

// Função para obter progresso geral
export function calculateProgress(trails: Trail[]): number {
  const totalModules = trails.reduce((acc, trail) => acc + trail.modules.length, 0);
  const completedModules = trails.reduce(
    (acc, trail) => acc + trail.modules.filter(m => m.completed).length,
    0
  );
  return totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
}
