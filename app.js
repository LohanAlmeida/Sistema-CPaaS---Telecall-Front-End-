function mostrarMsg(msg, tipo = "erro") {
  let el = document.getElementById("msg");
  el.className = "text-center mt-2 " + (tipo === "erro" ? "text-danger" : "text-success");
  el.innerText = msg;
}

// CADASTRO
let form = document.getElementById("formCadastro");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let nomeMae = document.getElementById("nomeMae").value;
    let nascimento = document.getElementById("nascimento").value;
    let sexo = document.getElementById("sexo").value;
    let cpf = document.getElementById("cpf").value;
    let celular = document.getElementById("celular").value;
    let fixo = document.getElementById("fixo").value;
    let endereco = document.getElementById("endereco").value;
    let login = document.getElementById("login").value;
    let senha = document.getElementById("senha").value;
    let confirmar = document.getElementById("confirmar").value;

    if (!nome || nome.length < 15 || nome.length > 60)
      return mostrarMsg("Nome deve ter entre 15 e 60 caracteres");

    if (!nomeMae) return mostrarMsg("Nome da mãe obrigatório");
    if (!nascimento) return mostrarMsg("Data de nascimento obrigatória");
    if (!sexo) return mostrarMsg("Sexo obrigatório");

    if (!cpf.match(/^\d{11}$/))
      return mostrarMsg("CPF deve ter 11 números");

    if (!celular.match(/^\+55\d{2}-\d{9}$/))
      return mostrarMsg("Celular inválido");

    if (!fixo.match(/^\+55\d{2}-\d{8}$/))
      return mostrarMsg("Telefone fixo inválido");

    if (!endereco) return mostrarMsg("Endereço obrigatório");

    if (!login.match(/^[A-Za-z]{6}$/))
      return mostrarMsg("Login deve ter 6 letras");

    if (!senha.match(/^[A-Za-z]{8}$/))
      return mostrarMsg("Senha deve ter 8 letras");

    if (senha !== confirmar)
      return mostrarMsg("Senhas diferentes");

    localStorage.setItem("user", JSON.stringify({ login, senha }));

    mostrarMsg("Cadastro realizado com sucesso!", "ok");

    setTimeout(() => window.location = "index.html", 1500);
  });
}

// LOGIN
function login() {
  let login = document.getElementById("login").value;
  let senha = document.getElementById("senha").value;

  let user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.login !== login || user.senha !== senha)
    return mostrarMsg("Login inválido");

  localStorage.setItem("logado", login);
  window.location = "home.html";
}

// LOGOUT
function logout() {
  localStorage.removeItem("logado");
  window.location.href = "index.html";
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

// INTERNA (SUBMENU)
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

// ACESSIBILIDADE
function toggleDark() {
  document.body.classList.toggle("dark-mode");
}

function aumentarFonte() {
  document.body.classList.add("big-text");
}

function diminuirFonte() {
  document.body.classList.remove("big-text");
}
