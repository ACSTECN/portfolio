/* =========================================================
   CONTROLE DE SEÇÕES (SPA POR CLIQUE)
========================================================= */

const sectionsOrder = [
  "inicio",
  "sobre",
  "experiencia",
  "habilidades",
  "projetos",
  "contato"
];

let currentSectionIndex = 0;

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
    sec.scrollTop = 0; // reseta scroll interno
  });

  document.querySelectorAll("nav button").forEach(btn => {
    btn.classList.remove("active");
  });

  const section = document.getElementById(id);
  if (section) section.classList.add("active");

  const btn = document.querySelector(`nav button[onclick*="${id}"]`);
  if (btn) btn.classList.add("active");

  currentSectionIndex = sectionsOrder.indexOf(id);
}

/* =========================================================
   TYPEWRITER
========================================================= */

const words = [
  "Especialista em Automação",
  "Analista de Dados",
  "Desenvolvedor Python"
];

const typingTarget = document.getElementById("typing-text");
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typingTarget) return;

  const word = words[wordIndex];

  if (!deleting) {
    typingTarget.textContent = word.slice(0, charIndex++);
    if (charIndex > word.length) {
      setTimeout(() => deleting = true, 1200);
    }
  } else {
    typingTarget.textContent = word.slice(0, charIndex--);
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 40 : 80);
}
typeEffect();

/* =========================================================
   FILTRO DE HABILIDADES
========================================================= */

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.filter;

    document.querySelectorAll(".skill-card").forEach(card => {
      card.style.display =
        card.dataset.category === category ? "block" : "none";
    });
  });
});

/* =========================================================
   CARROSSEL
========================================================= */

function nextSlide(btn) {
  const carousel = btn.closest(".carousel");
  const track = carousel.querySelector(".carousel-track");
  const total = track.children.length;
  let index = parseInt(carousel.dataset.index || 0);

  index = (index + 1) % total;
  carousel.dataset.index = index;

  track.style.transform = `translateX(-${index * 100}%)`;
}

function prevSlide(btn) {
  const carousel = btn.closest(".carousel");
  const track = carousel.querySelector(".carousel-track");
  const total = track.children.length;
  let index = parseInt(carousel.dataset.index || 0);

  index = (index - 1 + total) % total;
  carousel.dataset.index = index;

  track.style.transform = `translateX(-${index * 100}%)`;
}

/* =========================================================
   MODAL DE IMAGEM
========================================================= */

function openImage(img) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  modal.style.display = "flex";
  modalImg.src = img.src;
}

/* fechar no X */
document.querySelector(".image-modal .close-modal")?.addEventListener("click", (e) => {
  e.stopPropagation();
  closeImageModal();
});

/* fechar clicando fora */
document.getElementById("imageModal")?.addEventListener("click", () => {
  closeImageModal();
});

/* impedir fechar clicando na imagem */
document.getElementById("modalImage")?.addEventListener("click", (e) => {
  e.stopPropagation();
});

function closeImageModal() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  modal.style.display = "none";
  modalImg.src = "";
}


/* ===============================
   MODAL DE DETALHES DE PROJETO
================================ */

const projectDetails = {
  speech: `
    <h2>Speech Analytics</h2>

    <p>
      O Speech Analytics passou por sua maior evolução tecnológica e visual.
      A plataforma foi totalmente reestruturada para oferecer análises profundas,
      rápidas e inteligentes de conversas.
    </p>

    <ul>
      <li>Transcrição simultânea de até 3 áudios</li>
      <li>Análise de sentimentos por fala</li>
      <li>Busca avançada por palavras e frases</li>
      <li>Ranking de usuários por volume de análises</li>
      <li>Atalhos inteligentes e palavras salvas</li>
      <li>Controle de sessão, login exclusivo e timeout automático</li>
      <li>Frontend futurista, fluido e responsivo</li>
    </ul>

    <p>
      O sistema transforma grandes volumes de áudio em informação estratégica,
      reduzindo tempo de análise e elevando a tomada de decisão.
    </p>
  `,

  acs: `
    <h2>ACS Ponto</h2>

    <p>
      O ACS Ponto é a primeira fase de um sistema completo de gestão de ponto,
      desenvolvido para empresas que precisam de controle, simplicidade
      e escalabilidade.
    </p>

    <ul>
      <li>Login segmentado por perfil (Admin, RH, Funcionário)</li>
      <li>Registro de ponto rápido e intuitivo</li>
      <li>Correções e validações pela liderança</li>
      <li>Painel do RH com escalas e ranking de frequência</li>
      <li>Interface leve, moderna e responsiva</li>
    </ul>

    <p>
      Projeto em constante evolução, com novas funcionalidades previstas
      para automações, relatórios e integrações.
    </p>
  `,

  forecast: `
    <h2>Relatório Tempo Real + Forecast — VIVO</h2>

    <p>
      Automação completa desenvolvida em Python, Selenium e Excel VBA,
      responsável por gerar relatórios e forecast em tempo real,
      sem qualquer intervenção manual.
    </p>

    <ul>
      <li>Login automático na plataforma do cliente</li>
      <li>Navegação dinâmica via JavaScript injetado</li>
      <li>Download automático dos insumos operacionais</li>
      <li>Arredondamento inteligente de horário (meia em meia hora)</li>
      <li>Atualização automática de dados no Excel</li>
      <li>Geração de imagem do painel</li>
      <li>Envio automático por e-mail</li>
    </ul>

    <p>
      Do sistema do cliente ao relatório final em minutos,
      garantindo precisão e agilidade operacional.
    </p>
  `,

  bot: `
    <h2>Bot Discord + FiveM</h2>

    <p>
      Bot desenvolvido em Node.js para monitoramento em tempo real
      de servidores FiveM, integrado diretamente ao Discord.
    </p>

    <ul>
      <li>Monitoramento de status do servidor</li>
      <li>Quantidade de jogadores online</li>
      <li>Atualização em tempo real</li>
      <li>Integração direta com Discord</li>
      <li>Opção de conexão direta ao servidor</li>
    </ul>

    <p>
      Solução voltada à automação de comunidades e operações em tempo real.
    </p>
  `,

  pausas: `
    <h2>Relatório Operacional de Pausas — VIVO</h2>

    <p>
      Relatório totalmente automatizado para análise de pausas operacionais
      em equipes Inbound, com foco em produtividade e eficiência.
    </p>

    <ul>
      <li>Cruzamento de múltiplas tabelas operacionais</li>
      <li>Identificação de colaboradores com maior impacto negativo</li>
      <li>Top 5 pausas por equipe e gerência</li>
      <li>Top 20 operadores por percentual de pausa</li>
      <li>Consolidado geral da operação</li>
    </ul>

    <p>
      Processo rápido, preciso e confiável,
      entregando dados claros para atuação imediata da gestão.
    </p>
  `,

  gerencial: `
    <h2>Relatório Gerencial D-7 — KONECTA</h2>

    <p>
      Relatório estratégico semanal (D-7), desenvolvido para apoiar
      a gestão Inbound na tomada de decisão baseada em dados.
    </p>

    <ul>
      <li>Análise individual e consolidada por equipe e gerência</li>
      <li>Cruzamento avançado de múltiplas bases operacionais</li>
      <li>Consolidação automática de dados</li>
      <li>Automação completa em Excel com macros inteligentes</li>
      <li>Extração automática via robô interno</li>
      <li>Envio automático dos relatórios</li>
    </ul>

    <p>
      Resultado final: padronização das análises,
      redução de tempo operacional e visão clara dos pontos críticos
      para ações corretivas rápidas.
    </p>
  `,
  vendas: `
  <h2>Relatório Gerencial D-7 — Vendas</h2>

  <p>
    Relatório estratégico semanal (D-7), desenvolvido para apoiar
    a gerência na análise de desempenho comercial, rentabilidade
    e comportamento das vendas com base em dados consolidados.
  </p>

  <ul>
    <li>Análise de vendas individual e consolidada</li>
    <li>Faturamento total por período</li>
    <li>Cálculo automático de lucro e margem</li>
    <li>Análise de ticket médio</li>
    <li>Comparativo D-7 para identificação de crescimento ou queda</li>
    <li>Consolidação automática dos dados comerciais</li>
    <li>Estrutura preparada para automação e expansão de métricas</li>
  </ul>

  <p>
    Resultado final: visão clara da performance de vendas,
    identificação rápida de desvios, apoio direto à tomada
    de decisão estratégica e fortalecimento do controle gerencial.
  </p>
`,
desmatamento: `
  <h2>Análise de Desmatamento — Projeção 2025</h2>

  <p>
    Projeto desenvolvido como parte do meu processo contínuo
    de aprimoramento em <strong>Power BI</strong>, com foco em
    análise histórica e projeção de dados ambientais.
  </p>

  <ul>
    <li>Análise de dados históricos de desmatamento (2019 a 2023)</li>
    <li>Cálculo da variação anual de desmatamento ano a ano</li>
    <li>Apuração da média de crescimento anual</li>
    <li>Aplicação de projeção linear para estimativa de 2025</li>
    <li>Visualizações analíticas e comparativas no Power BI</li>
  </ul>

  <p>
    A projeção foi construída a partir da média de aumento anual
    observada no período analisado, somando os incrementos estimados
    aos dados de 2023 para estimar os valores de 2024 e 2025.
  </p>

  <p>
    Importante destacar que se trata de uma <strong>estimativa baseada
    exclusivamente em dados históricos</strong>. Fatores externos,
    políticas públicas, ações ambientais e mudanças econômicas podem
    impactar diretamente os resultados reais, tornando a projeção
    sujeita a variações.
  </p>

  <p>
    Resultado final: um estudo analítico e visual que demonstra
    domínio de modelagem de dados, raciocínio estatístico básico
    e capacidade de transformar dados históricos em insights
    preditivos de forma clara e didática.
  </p>
`,
Spotfy: `
  <h2>Aplicativo de Música estilo Spotify — FiveM</h2>

  <p>
    Desenvolvimento de um sistema completo de música para servidor
    <strong>FiveM</strong>, inspirado na experiência do Spotify,
    com foco em imersão, performance e controle operacional.
  </p>

  <ul>
    <li>Integração direta com a <strong>API do YouTube</strong> para reprodução de músicas</li>
    <li>Validação de compra e controle de licenciamento por usuário</li>
    <li>Verificação automática de saldo disponível</li>
    <li>Gestão de prazo ativo e expiração de acesso</li>
    <li>Controle de onde o áudio pode ser reproduzido (veículo ou caixa de som)</li>
    <li>Sistema de playlists personalizadas</li>
    <li>Áudio espacial otimizado com variação por distância (curta e longa proximidade)</li>
  </ul>

  <p>
    O sistema foi projetado para garantir controle total sobre o uso
    do serviço dentro do servidor, evitando abusos, garantindo
    monetização correta e mantendo a performance estável mesmo
    em ambientes com múltiplos jogadores.
  </p>

  `,
  loja: `
  <h2>Script de Loja Virtual — FiveM QBOX</h2>

  <p>
    Desenvolvimento de um sistema completo de <strong>loja virtual integrada
    diretamente ao servidor FiveM (base QBOX)</strong>, focado em monetização,
    controle de vendas e automação de entrega de itens dentro do jogo.
  </p>

  <ul>
    <li>Loja acessível diretamente dentro do servidor</li>
    <li>Integração com <strong>Mercado Pago</strong> (PIX e Cartão)</li>
    <li>Validação automática de pagamento</li>
    <li>Monitoramento de vendas em tempo real via <strong>Webhook</strong></li>
    <li>Distribuição automática dos itens adquiridos para o jogador</li>
    <li>Controle de status de pagamento (aprovado, pendente, recusado)</li>
    <li>Registro completo das transações</li>
  </ul>

  <p>
    Toda a lógica de pagamento foi estruturada para garantir segurança,
    confiabilidade e rastreabilidade, evitando fraudes e inconsistências
    na entrega dos itens.
  </p>

  <p>
    O uso de Webhooks permite que o servidor receba eventos de pagamento
    em tempo real, acionando automaticamente a liberação dos itens assim
    que o pagamento é confirmado, sem necessidade de intervenção manual.
  </p>

  <p>
    Resultado final: um sistema de vendas robusto, automatizado e escalável,
    que profissionaliza a monetização do servidor, melhora a experiência
    do jogador e reduz totalmente o esforço operacional da equipe.
  </p>
`,
caixa: `
  <h2>Sistema de Caixa Automatizado — VBA + Banco de Dados</h2>

  <p>
    Desenvolvimento de um <strong>sistema de caixa completo em VBA</strong>,
    projetado para controlar vendas, produtos e histórico financeiro de forma
    estruturada, segura e integrada ao banco de dados.
  </p>

  <ul>
    <li>Cadastro e gerenciamento de produtos</li>
    <li>Carrinho de compras com cálculo automático de valores</li>
    <li>Finalização de vendas com registro detalhado</li>
    <li>Histórico completo armazenado em banco de dados</li>
    <li>Rastreabilidade total das vendas realizadas</li>
    <li>Integração com controle de débito em folha</li>
    <li>Relatórios para conferência e acompanhamento financeiro</li>
  </ul>

  <p>
    O sistema foi desenvolvido para eliminar controles manuais,
    reduzir erros operacionais e garantir confiabilidade nos registros
    financeiros, permitindo análises claras e auditoria completa das vendas.
  </p>

  <p>
    A centralização das informações em banco de dados possibilita
    acompanhamento histórico, cruzamento de informações e suporte
    direto ao processo de fechamento financeiro e acertos de folha.
  </p>

  <p>
    Resultado final: um sistema de caixa robusto, simples de operar,
    totalmente automatizado e alinhado às necessidades operacionais
    e financeiras da empresa.
  </p>
`,
joao: `
    <h2>Landing Page para Atleta — Captação & Parcerias</h2>

    <p>
      Projeto de Landing Page desenvolvido com foco total em conversão,
      captação de novos atletas e fechamento de parcerias estratégicas.
    </p>

    <ul>
      <li>Desenvolvimento 100% em HTML, CSS e JavaScript puro</li>
      <li>Layout responsivo e otimizado para mobile e desktop</li>
      <li>Estrutura focada em conversão (CTA estratégico)</li>
      <li>Direcionamento para links externos</li>
      <li>Integração com páginas de venda (Hotmart)</li>
      <li>Hospedagem em ambiente cloud (Vercel)</li>
      <li>Carregamento rápido e otimizado (performance)</li>
    </ul>

    <p>
      A landing page foi pensada para apresentar o atleta de forma profissional,
      fortalecer a autoridade, divulgar parcerias e direcionar o público
      diretamente para links externos e páginas de monetização.
    </p>

    <p>
      Resultado: uma solução simples, rápida e eficiente para gerar leads,
      ampliar visibilidade e facilitar conversões.
    </p>
  `



};

/* ===============================
   ABRIR MODAL DE DETALHES
================================ */

function openProjectDetails(key) {
  const modal = document.createElement("div");
  modal.className = "project-modal";

  modal.innerHTML = `
    <div class="project-modal-content">
      <button class="close-modal" onclick="closeProjectModal()">×</button>
      <div class="project-modal-body">
        ${projectDetails[key]}
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";
}

/* ===============================
   FECHAR MODAL
================================ */

function closeProjectModal() {
  const modal = document.querySelector(".project-modal");
  if (modal) modal.remove();
  document.body.style.overflow = "";
}

/* FECHAR CLICANDO FORA */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("project-modal")) {
    closeProjectModal();
  }
});
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('hidden');
}
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const body = document.body;

  sidebar.classList.toggle('hidden');
  body.classList.toggle('sidebar-hidden');
}
