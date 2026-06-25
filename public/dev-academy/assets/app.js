/* Dev Academy — global app logic */
(function(){
  'use strict';

  const STORAGE_KEY = 'dev-academy:v1';

  // ----- Catalogue of trilhas / modules -----
  const TRILHAS = [
    { id:'t1', slug:'fundamentos', title:'Fundamentos da Programação', icon:'F', accent:'#22D3EE',
      desc:'Lógica, JavaScript, TypeScript, Python e SQL — a base sólida de qualquer engenheiro.',
      level:'Iniciante',
      modules:[
        {id:'t1-m1', title:'Lógica de Programação', level:'iniciante', dur:'45 min'},
        {id:'t1-m2', title:'JavaScript Essencial', level:'iniciante', dur:'70 min'},
        {id:'t1-m3', title:'TypeScript Zero ao Avançado', level:'intermediario', dur:'80 min'},
        {id:'t1-m4', title:'Python para Engenheiros', level:'intermediario', dur:'60 min'},
        {id:'t1-m5', title:'SQL do Básico ao Avançado', level:'intermediario', dur:'75 min'},
      ]},
    { id:'t2', slug:'frontend', title:'Frontend Moderno', icon:'⚛', accent:'#6366F1',
      desc:'HTML/CSS, React 19, Next.js 15, Tailwind, React Query e WebSockets.',
      level:'Intermediário',
      modules:[
        {id:'t2-m1', title:'HTML & CSS Semântico', level:'iniciante', dur:'50 min'},
        {id:'t2-m2', title:'React do Zero', level:'intermediario', dur:'80 min'},
        {id:'t2-m3', title:'React Avançado (React 19)', level:'avancado', dur:'90 min'},
        {id:'t2-m4', title:'Next.js 15', level:'avancado', dur:'90 min'},
        {id:'t2-m5', title:'Tailwind CSS', level:'intermediario', dur:'50 min'},
        {id:'t2-m6', title:'React Query (TanStack Query)', level:'avancado', dur:'60 min'},
        {id:'t2-m7', title:'WebSockets e Tempo Real', level:'avancado', dur:'70 min'},
      ]},
    { id:'t3', slug:'backend', title:'Backend e APIs', icon:'⚙',  accent:'#22D3EE',
      desc:'Node.js, Fastify, REST, GraphQL, Prisma, PostgreSQL avançado e Redis.',
      level:'Intermediário',
      modules:[
        {id:'t3-m1', title:'Node.js Fundamentos', level:'intermediario', dur:'60 min'},
        {id:'t3-m2', title:'Fastify (Framework Principal)', level:'avancado', dur:'80 min'},
        {id:'t3-m3', title:'REST APIs Profissionais', level:'intermediario', dur:'70 min'},
        {id:'t3-m4', title:'GraphQL', level:'avancado', dur:'70 min'},
        {id:'t3-m5', title:'Prisma ORM', level:'intermediario', dur:'60 min'},
        {id:'t3-m6', title:'PostgreSQL Avançado', level:'avancado', dur:'80 min'},
        {id:'t3-m7', title:'Redis', level:'avancado', dur:'55 min'},
      ]},
    { id:'t4', slug:'cloud', title:'Cloud, Infra & DevOps', icon:'☁', accent:'#6366F1',
      desc:'AWS, Lambda, Docker, Kubernetes, Terraform e CI/CD com GitHub Actions.',
      level:'Avançado',
      modules:[
        {id:'t4-m1', title:'Fundamentos de Cloud Computing', level:'iniciante', dur:'40 min'},
        {id:'t4-m2', title:'AWS Core Services', level:'intermediario', dur:'90 min'},
        {id:'t4-m3', title:'AWS Serverless (Lambda + API Gateway)', level:'avancado', dur:'80 min'},
        {id:'t4-m4', title:'Docker do Zero ao Deploy', level:'intermediario', dur:'80 min'},
        {id:'t4-m5', title:'Kubernetes Essencial', level:'avancado', dur:'90 min'},
        {id:'t4-m6', title:'Terraform e Infrastructure as Code', level:'avancado', dur:'80 min'},
        {id:'t4-m7', title:'CI/CD com GitHub Actions', level:'intermediario', dur:'70 min'},
      ]},
    { id:'t5', slug:'ai-llm', title:'Inteligência Artificial & LLMs', icon:'✦', accent:'#22D3EE',
      desc:'Como LLMs funcionam, OpenAI API, prompt engineering, LangChain, RAG e MCP.',
      level:'Avançado',
      modules:[
        {id:'t5-m1', title:'Fundamentos de IA para Devs', level:'iniciante', dur:'45 min'},
        {id:'t5-m2', title:'OpenAI API na Prática', level:'intermediario', dur:'75 min'},
        {id:'t5-m3', title:'Prompt Engineering Profissional', level:'intermediario', dur:'60 min'},
        {id:'t5-m4', title:'LangChain em Produção', level:'avancado', dur:'85 min'},
        {id:'t5-m5', title:'RAG (Retrieval-Augmented Generation)', level:'avancado', dur:'90 min'},
        {id:'t5-m6', title:'MCP (Model Context Protocol)', level:'profissional', dur:'70 min'},
      ]},
    { id:'t6', slug:'arquitetura', title:'Arquitetura & Boas Práticas', icon:'△', accent:'#6366F1',
      desc:'Clean Code, Clean Architecture, DDD, testes, microsserviços, segurança e cultura.',
      level:'Profissional',
      modules:[
        {id:'t6-m1', title:'Clean Code', level:'intermediario', dur:'60 min'},
        {id:'t6-m2', title:'Clean Architecture', level:'avancado', dur:'75 min'},
        {id:'t6-m3', title:'Domain-Driven Design (DDD)', level:'profissional', dur:'80 min'},
        {id:'t6-m4', title:'Testes Profissionais', level:'avancado', dur:'70 min'},
        {id:'t6-m5', title:'Microsserviços e Sistemas Distribuídos', level:'profissional', dur:'85 min'},
        {id:'t6-m6', title:'Segurança para Desenvolvedores', level:'avancado', dur:'70 min'},
        {id:'t6-m7', title:'Code Review e Cultura de Engenharia', level:'intermediario', dur:'55 min'},
      ]},
  ];

  // Index helpers
  const ALL_MODULES = TRILHAS.flatMap(t => t.modules.map(m => ({...m, trilhaId:t.id, trilhaSlug:t.slug, trilhaTitle:t.title})));
  const moduleById = id => ALL_MODULES.find(m => m.id === id);
  const trilhaById = id => TRILHAS.find(t => t.id === id);
  const trilhaBySlug = slug => TRILHAS.find(t => t.slug === slug);

  function modulePath(m){
    return `../aulas/trilha-${m.trilhaId.slice(1)}/modulo-${m.id.split('-m')[1]}.html`;
  }
  function modulePathFromRoot(m){ // from index/dashboard at root
    return `aulas/trilha-${m.trilhaId.slice(1)}/modulo-${m.id.split('-m')[1]}.html`;
  }
  function modulePathFromLesson(m){ // sibling lesson page
    return `modulo-${m.id.split('-m')[1]}.html`;
  }
  function trilhaPathFromRoot(t){ return `trilhas/${t.slug}.html`; }
  function trilhaPathFromLesson(t){ return `../../trilhas/${t.slug}.html`; }

  // ----- Storage -----
  function load(){
    try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch(e){ return {}; }
  }
  function save(state){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){}
  }
  function getProgress(){
    const s = load();
    return s.progress || {};
  }
  function setModuleProgress(id, patch){
    const s = load();
    s.progress = s.progress || {};
    s.progress[id] = Object.assign({}, s.progress[id], patch);
    s.lastVisited = id;
    s.user = s.user || { name:'Aluno', started:new Date().toISOString() };
    save(s);
  }
  function touchLastVisited(id){
    const s = load();
    s.lastVisited = id;
    s.user = s.user || { name:'Aluno', started:new Date().toISOString() };
    save(s);
  }
  function stats(){
    const p = getProgress();
    const total = ALL_MODULES.length;
    const done = ALL_MODULES.filter(m => p[m.id] && p[m.id].completed).length;
    return { total, done, pct: total? Math.round(done/total*100) : 0 };
  }
  function trilhaStats(trilhaId){
    const p = getProgress();
    const mods = trilhaById(trilhaId).modules;
    const done = mods.filter(m => p[m.id] && p[m.id].completed).length;
    return { total:mods.length, done, pct: mods.length? Math.round(done/mods.length*100) : 0 };
  }

  // ----- Topbar (shared) -----
  function buildTopbar(rootPrefix){
    const html = `
      <div class="topbar">
        <div class="container topbar-inner">
          <a href="${rootPrefix}index.html" class="brand">
            <span class="brand-mark">D</span><span>Dev Academy</span>
          </a>
          <button class="menu-toggle" id="da-menu-toggle" aria-label="Abrir menu">☰</button>
          <nav class="nav-links" id="da-nav">
            <a href="${rootPrefix}index.html">Início</a>
            <a href="${rootPrefix}dashboard.html">Dashboard</a>
            <a href="${rootPrefix}trilhas/fundamentos.html">Trilhas</a>
            <a href="https://github.com" target="_blank" rel="noopener">GitHub</a>
          </nav>
        </div>
      </div>`;
    document.body.insertAdjacentHTML('afterbegin', html);
    const tog = document.getElementById('da-menu-toggle');
    const nav = document.getElementById('da-nav');
    tog && tog.addEventListener('click', () => nav.classList.toggle('open'));
    // mark active
    const here = location.pathname.split('/').pop();
    nav.querySelectorAll('a').forEach(a => {
      if(a.getAttribute('href').endsWith(here)) a.classList.add('active');
    });
  }

  // ----- Sidebar (lesson) -----
  function buildSidebar(currentId){
    const prog = getProgress();
    const tHtml = TRILHAS.map(t => {
      const open = t.modules.some(m => m.id === currentId) ? '' : 'collapsed';
      const lessons = t.modules.map(m => {
        const done = prog[m.id] && prog[m.id].completed;
        const cur = m.id === currentId ? 'current' : '';
        return `<li><a href="${modulePathFromLesson(m)}" class="${cur} ${done?'done':''}" data-search="${m.title.toLowerCase()}">
          <span class="check">${done?'✓':''}</span><span>${m.title}</span>
        </a></li>`;
      }).join('');
      return `<div class="trilha-group ${open}" data-trilha="${t.id}">
        <div class="trilha-title"><span>${t.icon}</span><span>${t.title}</span><span class="chev">▼</span></div>
        <ul class="lessons">${lessons}</ul>
      </div>`;
    }).join('');
    return `<aside class="sidebar" id="da-sidebar">
      <div class="search"><input type="search" placeholder="Buscar módulo..." id="da-search" aria-label="Buscar módulo"></div>
      <h4>Trilhas</h4>
      ${tHtml}
    </aside>`;
  }

  // ----- Lesson init -----
  function initLesson(opts){
    // opts: { moduleId, toc:[{id,label}], quiz:[{q,opts,answer,explain}] }
    const mod = moduleById(opts.moduleId);
    if(!mod){ console.error('Unknown module', opts.moduleId); return; }
    touchLastVisited(mod.id);

    buildTopbar('../../');

    const main = document.querySelector('.lesson-main');
    const shell = document.createElement('div');
    shell.className = 'lesson-shell';
    shell.innerHTML = buildSidebar(mod.id);
    // move main into shell
    main.parentNode.insertBefore(shell, main);
    shell.appendChild(main);

    // breadcrumb + progress + tools
    const trilha = trilhaById(mod.trilhaId);
    const idx = trilha.modules.findIndex(m=>m.id===mod.id);
    const prev = idx>0 ? trilha.modules[idx-1] : null;
    const next = idx<trilha.modules.length-1 ? trilha.modules[idx+1] : null;
    const tStats = trilhaStats(trilha.id);

    const header = document.createElement('div');
    header.className = 'lesson-body';
    header.innerHTML = `
      <nav class="breadcrumb">
        <a href="../../index.html">Início</a> ›
        <a href="${trilhaPathFromLesson(trilha)}">${trilha.title}</a> ›
        <span>${mod.title}</span>
      </nav>
      <div class="lesson-progress">
        <div style="display:flex;justify-content:space-between;align-items:baseline">
          <small style="color:var(--text-muted)">Progresso da trilha</small>
          <small style="color:var(--text-muted)">${tStats.done}/${tStats.total} • ${tStats.pct}%</small>
        </div>
        <div class="progress thin"><span style="width:${tStats.pct}%"></span></div>
      </div>
      <div class="tools-row">
        <span class="badge ${mod.level}">${mod.level}</span>
        <span class="badge">⏱ ${mod.dur}</span>
        <button class="btn ghost" id="da-toggle-reading" type="button">📖 Modo leitura</button>
      </div>
      <h1>${mod.title}</h1>`;
    main.insertBefore(header, main.firstChild);

    // TOC
    if(opts.toc && opts.toc.length){
      const toc = document.createElement('div');
      toc.className = 'lesson-toc';
      toc.innerHTML = `<h4>Nesta aula</h4><ol>${opts.toc.map(i=>`<li><a href="#${i.id}">${i.label}</a></li>`).join('')}</ol>`;
      header.appendChild(toc);
    }

    // Wrap content into .lesson-body
    const content = document.getElementById('da-content');
    if(content){
      content.classList.add('lesson-body');
    }

    // Quiz
    let quizPassed = false;
    if(opts.quiz && opts.quiz.length){
      const quizEl = renderQuiz(opts.quiz, mod.id, (passed,score)=>{
        quizPassed = passed;
        setModuleProgress(mod.id, { score });
        updateCompleteRow(passed);
      });
      content ? content.appendChild(quizEl) : main.appendChild(quizEl);
    } else {
      quizPassed = true; // no quiz = always allow
    }

    // Complete row
    const completeRow = document.createElement('div');
    completeRow.className = 'complete-row';
    completeRow.id = 'da-complete';
    const isDone = (getProgress()[mod.id]||{}).completed;
    completeRow.innerHTML = `
      <input type="checkbox" id="da-done-cb" ${isDone?'checked':''} style="width:20px;height:20px;accent-color:var(--success)">
      <label for="da-done-cb" style="flex:1;font-weight:600">Marcar aula como concluída</label>
      <small id="da-done-help" style="color:var(--text-muted)"></small>`;
    (content||main).appendChild(completeRow);

    function updateCompleteRow(passed){
      const cb = document.getElementById('da-done-cb');
      const help = document.getElementById('da-done-help');
      if(opts.quiz && opts.quiz.length && !passed && !(getProgress()[mod.id]||{}).completed){
        cb.disabled = true;
        help.textContent = 'Atinja ≥ 60% no quiz para liberar.';
      } else {
        cb.disabled = false;
        help.textContent = '';
      }
    }
    updateCompleteRow(quizPassed || isDone);

    document.getElementById('da-done-cb').addEventListener('change', e=>{
      const completed = e.target.checked;
      setModuleProgress(mod.id, { completed, date:new Date().toISOString() });
      completeRow.classList.toggle('done', completed);
      // update sidebar check
      const link = document.querySelector(`.sidebar .lessons a.current`);
      if(link){
        link.classList.toggle('done', completed);
        link.querySelector('.check').textContent = completed?'✓':'';
      }
    });
    completeRow.classList.toggle('done', isDone);

    // Lesson nav
    const navRow = document.createElement('div');
    navRow.className = 'lesson-nav';
    navRow.innerHTML = `
      ${prev ? `<a class="btn secondary" href="${modulePathFromLesson(prev)}">← ${prev.title}</a>` : `<a class="btn secondary" href="${trilhaPathFromLesson(trilha)}">← Voltar à trilha</a>`}
      ${next ? `<a class="btn" href="${modulePathFromLesson(next)}">${next.title} →</a>` : `<a class="btn" href="../../dashboard.html">Concluir trilha →</a>`}`;
    (content||main).appendChild(navRow);

    // Sidebar interactions
    document.querySelectorAll('.trilha-title').forEach(el => {
      el.addEventListener('click', () => el.parentElement.classList.toggle('collapsed'));
    });
    document.getElementById('da-search').addEventListener('input', e => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.sidebar .lessons a').forEach(a => {
        const match = !q || a.dataset.search.includes(q);
        a.style.display = match ? 'flex' : 'none';
      });
    });
    document.getElementById('da-toggle-reading').addEventListener('click', ()=>{
      document.body.classList.toggle('reading-mode');
    });

    // Mobile sidebar
    const tog = document.getElementById('da-menu-toggle');
    if(tog){
      const sb = document.getElementById('da-sidebar');
      const mob = document.createElement('button');
      mob.className='btn ghost';
      mob.style.cssText='position:fixed;bottom:20px;left:20px;z-index:60;background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow);display:none';
      mob.textContent='☰ Índice';
      mob.addEventListener('click', ()=>sb.classList.toggle('open'));
      document.body.appendChild(mob);
      const mq = window.matchMedia('(max-width:820px)');
      const apply = ()=>{ mob.style.display = mq.matches?'inline-flex':'none'; };
      apply(); mq.addEventListener('change', apply);
    }

    enhanceCodeBlocks();
  }

  // ----- Quiz -----
  function renderQuiz(questions, moduleId, onResult){
    const el = document.createElement('section');
    el.className = 'quiz';
    el.id = 'quiz';
    el.innerHTML = `<h3>🎯 Quiz — verifique seu aprendizado</h3>
      <p style="color:var(--text-muted);margin-top:-6px">Responda todas as perguntas. Score mínimo: 60%.</p>
      ${questions.map((q,i)=>`
        <div class="q" data-i="${i}" data-answer="${q.answer}">
          <div class="qtext">${i+1}. ${q.q}</div>
          ${q.opts.map((o,j)=>`<label class="opt"><input type="radio" name="q${i}" value="${j}"><span>${o}</span></label>`).join('')}
          <div class="feedback"></div>
        </div>`).join('')}
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
        <button class="btn" type="button" id="quiz-submit">Verificar respostas</button>
        <button class="btn ghost" type="button" id="quiz-reset">Refazer</button>
        <div class="quiz-result" id="quiz-result"></div>
      </div>`;

    el.addEventListener('click', e=>{
      if(e.target.id==='quiz-submit') grade();
      if(e.target.id==='quiz-reset') reset();
    });

    function grade(){
      let correct = 0;
      questions.forEach((q,i)=>{
        const qEl = el.querySelector(`.q[data-i="${i}"]`);
        const chosen = qEl.querySelector('input[type=radio]:checked');
        qEl.classList.add('answered');
        const fb = qEl.querySelector('.feedback');
        qEl.querySelectorAll('.opt').forEach(o=>o.classList.remove('correct','wrong'));
        if(!chosen){
          fb.innerHTML = '<strong>⚠ Sem resposta.</strong> '+q.explain;
          return;
        }
        const idx = +chosen.value;
        const opts = qEl.querySelectorAll('.opt');
        opts[q.answer].classList.add('correct');
        if(idx === q.answer){
          correct++;
          fb.innerHTML = '<strong style="color:#86efac">✅ Correto!</strong> '+q.explain;
        } else {
          opts[idx].classList.add('wrong');
          fb.innerHTML = '<strong style="color:#fca5a5">❌ Incorreto.</strong> '+q.explain;
        }
      });
      const score = Math.round(correct/questions.length*100);
      const passed = score >= 60;
      const r = document.getElementById('quiz-result');
      r.className = 'quiz-result show '+(passed?'pass':'fail');
      r.textContent = `Você acertou ${correct} de ${questions.length} (${score}%). ${passed?'Aprovado! Pode marcar como concluído.':'Revise o conteúdo e tente novamente.'}`;
      onResult && onResult(passed, score);
    }
    function reset(){
      el.querySelectorAll('.q').forEach(q=>q.classList.remove('answered'));
      el.querySelectorAll('input[type=radio]').forEach(i=>i.checked=false);
      el.querySelectorAll('.opt').forEach(o=>o.classList.remove('correct','wrong'));
      const r = document.getElementById('quiz-result'); r.classList.remove('show');
    }
    return el;
  }

  // ----- Code blocks: copy button -----
  function enhanceCodeBlocks(){
    document.querySelectorAll('pre[class*="language-"]').forEach(pre => {
      if(pre.parentElement.classList.contains('code-wrap')) return;
      const wrap = document.createElement('div');
      wrap.className = 'code-wrap';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);
      const btn = document.createElement('button');
      btn.className='copy-btn'; btn.type='button'; btn.textContent='Copiar';
      btn.addEventListener('click', ()=>{
        const code = pre.querySelector('code').innerText;
        navigator.clipboard.writeText(code).then(()=>{
          btn.textContent='Copiado!'; btn.classList.add('copied');
          setTimeout(()=>{btn.textContent='Copiar';btn.classList.remove('copied')},1500);
        });
      });
      wrap.appendChild(btn);
    });
    if(window.Prism) Prism.highlightAll();
  }

  // ----- Landing page builder -----
  function initLanding(){
    buildTopbar('');
    const grid = document.getElementById('da-trilhas-grid');
    if(grid){
      grid.innerHTML = TRILHAS.map(t=>{
        const s = trilhaStats(t.id);
        return `<a class="card" href="${trilhaPathFromRoot(t)}">
          <div class="icon" style="background:linear-gradient(135deg,${t.accent},#6366F1)">${t.icon}</div>
          <h3>${t.title}</h3>
          <p>${t.desc}</p>
          <div class="meta">
            <span class="badge">${t.modules.length} módulos</span>
            <span class="badge ${t.level.toLowerCase().replace('ç','c').replace('á','a').replace('í','i')}">${t.level}</span>
          </div>
          <div class="progress-row"><div class="progress"><span style="width:${s.pct}%"></span></div><span>${s.pct}%</span></div>
        </a>`;
      }).join('');
    }
    enhanceCodeBlocks();
  }

  // ----- Dashboard builder -----
  function initDashboard(){
    buildTopbar('');
    const st = stats();
    document.getElementById('da-stat-total').textContent = st.total;
    document.getElementById('da-stat-done').textContent = st.done;
    document.getElementById('da-stat-pct').textContent = st.pct + '%';
    const trilhasDone = TRILHAS.filter(t=>trilhaStats(t.id).pct===100).length;
    document.getElementById('da-stat-trilhas').textContent = trilhasDone + '/' + TRILHAS.length;

    document.getElementById('da-global-progress').style.width = st.pct + '%';

    const last = (load().lastVisited);
    const lastEl = document.getElementById('da-last');
    if(last){
      const m = moduleById(last);
      if(m){
        lastEl.innerHTML = `<a class="btn" href="${modulePathFromRoot(m)}">Continuar: ${m.title} →</a>`;
      }
    } else {
      lastEl.innerHTML = `<a class="btn" href="aulas/trilha-1/modulo-1.html">Começar pelo início →</a>`;
    }

    const grid = document.getElementById('da-trilhas-progress');
    grid.innerHTML = TRILHAS.map(t=>{
      const s = trilhaStats(t.id);
      const lessons = t.modules.map(m=>{
        const done = (getProgress()[m.id]||{}).completed;
        return `<li style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:13px;color:var(--text-muted)">
          <span style="width:16px;height:16px;border-radius:50%;border:1.5px solid var(--border);display:inline-grid;place-items:center;font-size:10px;${done?'background:var(--success);border-color:var(--success);color:#fff':''}">${done?'✓':''}</span>
          <a href="${modulePathFromRoot(m)}" style="color:inherit">${m.title}</a>
          <span style="margin-left:auto"><span class="badge ${m.level}">${m.level}</span></span>
        </li>`;
      }).join('');
      return `<div class="card" style="cursor:default;transform:none">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
          <div class="icon" style="background:linear-gradient(135deg,${t.accent},#6366F1);margin:0">${t.icon}</div>
          <div style="flex:1"><h3 style="margin:0">${t.title}</h3><small style="color:var(--text-muted)">${s.done}/${s.total} módulos • ${s.pct}%</small></div>
          <a class="btn secondary" href="${trilhaPathFromRoot(t)}">Abrir</a>
        </div>
        <div class="progress thin"><span style="width:${s.pct}%"></span></div>
        <ul style="list-style:none;padding:14px 0 0;margin:0">${lessons}</ul>
      </div>`;
    }).join('');
  }

  // ----- Trilha page builder -----
  function initTrilha(slug){
    buildTopbar('../');
    const t = trilhaBySlug(slug);
    if(!t) return;
    document.title = `${t.title} • Dev Academy`;
    const head = document.getElementById('da-trilha-head');
    const s = trilhaStats(t.id);
    head.innerHTML = `
      <nav class="breadcrumb"><a href="../index.html">Início</a> › <span>${t.title}</span></nav>
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:8px">
        <div class="icon" style="background:linear-gradient(135deg,${t.accent},#6366F1);width:56px;height:56px;font-size:28px">${t.icon}</div>
        <div>
          <h1 style="margin:0">${t.title}</h1>
          <p style="margin:4px 0 0;color:var(--text-muted)">${t.desc}</p>
        </div>
      </div>
      <div class="progress-row"><div class="progress"><span style="width:${s.pct}%"></span></div><span>${s.done}/${s.total} • ${s.pct}%</span></div>`;

    const grid = document.getElementById('da-modules-grid');
    grid.innerHTML = t.modules.map((m,i)=>{
      const p = (getProgress()[m.id]||{});
      const pct = p.completed?100:(p.score||0);
      return `<a class="card" href="../aulas/trilha-${t.id.slice(1)}/modulo-${m.id.split('-m')[1]}.html">
        <div class="icon" style="background:linear-gradient(135deg,${t.accent},#6366F1)">${i+1}</div>
        <h3>${m.title}</h3>
        <p>Módulo ${i+1} da trilha ${t.title}.</p>
        <div class="meta">
          <span class="badge ${m.level}">${m.level}</span>
          <span class="badge">⏱ ${m.dur}</span>
          ${p.completed?'<span class="badge" style="background:rgba(34,197,94,.15);color:#86efac;border-color:rgba(34,197,94,.3)">✓ Concluído</span>':''}
        </div>
        <div class="progress-row"><div class="progress"><span style="width:${pct}%"></span></div><span>${pct}%</span></div>
      </a>`;
    }).join('');
  }

  // ----- Expose -----
  window.DevAcademy = {
    TRILHAS, initLesson, initLanding, initDashboard, initTrilha,
    stats, trilhaStats, getProgress
  };
})();
