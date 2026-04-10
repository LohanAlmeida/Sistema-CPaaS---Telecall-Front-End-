// ============================
// ACESSIBILIDADE
// ============================

window.onload = () => {

  // DARK MODE
  if (localStorage.getItem("dark") === "on") {
    document.body.classList.add("dark-mode");
  }

  // FONTE
  let nivel = localStorage.getItem("fonte") || "font-normal";
  document.body.classList.add(nivel);

  verificarLogin();
};

// ============================
// DARK MODE
// ============================
function toggleDark() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("dark",
    document.body.classList.contains("dark-mode") ? "on" : "off"
  );
}

// ============================
// FONTE
// ============================
const niveis = ["font-small", "font-normal", "font-big", "font-bigger", "font-large", "font-xlarge"];

function getNivelAtual() {
  return niveis.findIndex(n => document.body.classList.contains(n));
}

function limparFonte() {
  niveis.forEach(n => document.body.classList.remove(n));
}

function aumentarFonte() {
  let atual = getNivelAtual();
  if (atual < niveis.length - 1) {
    limparFonte();
    document.body.classList.add(niveis[atual + 1]);
    localStorage.setItem("fonte", niveis[atual + 1]);
  }
}

function diminuirFonte() {
  let atual = getNivelAtual();
  if (atual > 0) {
    limparFonte();
    document.body.classList.add(niveis[atual - 1]);
    localStorage.setItem("fonte", niveis[atual - 1]);
  }
}

// ============================
// CADASTRO
// ============================
if (document.getElementById("formCadastro")) {

  document.getElementById("formCadastro").addEventListener("submit", function (e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let login = document.getElementById("login").value;
    let senha = document.getElementById("senha").value;
    let confirmar = document.getElementById("confirmar").value;

    let msg = document.getElementById("msg");

    // ============================
    // REQUISITOS 
    // ============================
    if (nome.length < 15 || nome.length > 60)
      return msg.innerText = "Nome deve ter entre 15 e 60 caracteres";

    if (login.length < 6)
      return msg.innerText = "Login deve ter no mínimo 6 caracteres";

    if (senha.length < 8)
      return msg.innerText = "Senha deve ter no mínimo 8 caracteres";

    if (senha !== confirmar)
      return msg.innerText = "Senhas não coincidem";

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.push({ nome, login, senha });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado!");
    window.location = "index.html";
  });
}

// ============================
// LOGIN
// ============================
function login() {

  let login = document.getElementById("login").value;
  let senha = document.getElementById("senha").value;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  let user = usuarios.find(u => u.login === login && u.senha === senha);

  if (!user) return document.getElementById("msg").innerText = "Login inválido";

  localStorage.setItem("logado", user.login);
  window.location = "home.html";
}

// ============================
// LOGOUT
// ============================
function logout() {
  localStorage.removeItem("logado");
  window.location = "index.html";
}

// ============================
// PROTEÇÃO DE ROTAS
// ============================
function verificarLogin() {

  let paginasProtegidas = ["home.html", "interna.html"];

  let atual = window.location.pathname.split("/").pop();

  if (paginasProtegidas.includes(atual)) {
    let user = localStorage.getItem("logado");

    if (!user) {
      window.location = "index.html";
    } else {
      let el = document.getElementById("usuario");
      if (el) el.innerText = user;
    }
  }
}

// ============================
// NAVEGAÇÃO
// ============================
function ir(servico) {
  window.location = "interna.html?servico=" + servico;
}

// ============================
// PÁGINA INTERNA (SUBMENU)
// ============================
if (window.location.pathname.includes("interna")) {

  let s = new URLSearchParams(window.location.search).get("servico");

  const dados = {
    "2fa": {
      titulo: "Autenticação em Dois Fatores (2FA)",
      descricao: "O serviço de autenticação em dois fatores (2FA) adiciona uma camada extra de segurança ao processo de login, exigindo que o usuário forneça duas formas distintas de verificação: algo que ele sabe (senha) e algo que ele possui (código enviado via SMS, aplicativo ou token). Essa abordagem reduz significativamente o risco de acessos não autorizados, mesmo em casos de vazamento de credenciais.",
      beneficios: [
        "Aumento significativo da segurança de contas",
        "Redução de fraudes e acessos indevidos",
        "Compatível com múltiplos canais (SMS, apps, tokens)",
        "Implementação simples via API"
      ]
    },

    "numero": {
      titulo: "Número Máscara",
      descricao: "O serviço de número máscara permite ocultar o número real dos usuários durante comunicações telefônicas, substituindo-o por um número virtual temporário. Essa solução é ideal para marketplaces, aplicativos de mobilidade e serviços de entrega, garantindo privacidade e segurança tanto para clientes quanto para prestadores de serviço.",
      beneficios: [
        "Proteção da privacidade dos usuários",
        "Evita exposição de dados sensíveis",
        "Controle e rastreabilidade das chamadas",
        "Ideal para apps de entrega e transporte"
      ]
    },

    "google": {
      titulo: "Google Verify",
      descricao: "O serviço Google Verify realiza a verificação automática de usuários por meio de chamadas ou integrações inteligentes com sistemas do Google. Ele elimina a necessidade de inserção manual de códigos, proporcionando uma experiência mais fluida e segura para o usuário final, além de reduzir erros no processo de autenticação.",
      beneficios: [
        "Verificação automática e rápida",
        "Melhora a experiência do usuário (UX)",
        "Redução de falhas humanas na autenticação",
        "Integração com serviços confiáveis"
      ]
    },

    "sms": {
      titulo: "SMS Programável",
      descricao: "O serviço de SMS programável permite o envio automatizado de mensagens de texto para clientes, sendo amplamente utilizado para notificações, autenticações, alertas e campanhas. Através de APIs, é possível integrar o envio de SMS a sistemas empresariais, garantindo comunicação rápida, eficiente e com alta taxa de entrega.",
      beneficios: [
        "Entrega rápida e alta taxa de leitura",
        "Automação de notificações e alertas",
        "Integração com sistemas via API",
        "Amplo alcance, independente de internet"
      ]
    }
  };

  if (dados[s]) {

    document.getElementById("titulo").innerText = dados[s].titulo;
    document.getElementById("conteudo").innerText = dados[s].descricao;

    let lista = document.getElementById("beneficios");
    lista.innerHTML = "";

    dados[s].beneficios.forEach(b => {
      let li = document.createElement("li");
      li.innerText = b;
      lista.appendChild(li);
    });
  }
}
