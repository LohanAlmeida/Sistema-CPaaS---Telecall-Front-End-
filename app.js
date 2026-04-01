window.onload = () => {
  // DARK MODE
  if (localStorage.getItem("dark") === "on") {
    document.body.classList.add("dark-mode");
  }

  // FONTE
  let nivel = localStorage.getItem("fonte") || "font-normal";
  document.body.classList.add(nivel);
};

// DARK MODE
function toggleDark() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("dark", document.body.classList.contains("dark-mode") ? "on" : "off");
}

// FONTE
const niveis = [
  "font-small",
  "font-normal",
  "font-big",
  "font-bigger",
  "font-large",
  "font-xlarge"
];

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

// LOGIN
function login() {
  let login = document.getElementById("login").value;
  let senha = document.getElementById("senha").value;

  let user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.login !== login || user.senha !== senha)
    return alert("Login inválido");

  localStorage.setItem("logado", login);
  window.location = "home.html";
}

// LOGOUT
function logout() {
  localStorage.removeItem("logado");
  window.location = "index.html";
}

// PROTEÇÃO
if (window.location.pathname.includes("home") || window.location.pathname.includes("interna")) {
  let user = localStorage.getItem("logado");
  if (!user) window.location = "index.html";

  let el = document.getElementById("usuario");
  if (el) el.innerText = user;
}

// NAVEGAÇÃO
function ir(s) {
  window.location = "interna.html?servico=" + s;
}

// INTERNA
if (window.location.pathname.includes("interna")) {
  let s = new URLSearchParams(window.location.search).get("servico");

  let t = document.getElementById("titulo");
  let c = document.getElementById("conteudo");

  let dados = {
    "2fa": ["2FA", "Sistema de autenticação em dois fatores com segurança reforçada."],
    "numero": ["Número Máscara", "Proteção de privacidade em chamadas telefônicas."],
    "google": ["Google Verify", "Verificação automatizada via chamada Google."],
    "sms": ["SMS Programável", "Envio de mensagens automatizadas via API."]
  };

  if (dados[s]) {
    t.innerText = dados[s][0];
    c.innerText = dados[s][1];
  }
}
