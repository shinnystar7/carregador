import { auth, db } from './firebaseConfig.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

function showModal(id) {
  new bootstrap.Modal(document.getElementById(id)).show();
}

function exibirModalMensagem(msg, titulo = "Aviso") {
  document.getElementById("modalAlertaLabel").innerText = titulo;
  document.getElementById("mensagemAlerta").innerText = msg;
  showModal("modalAlerta");
}

// Login
document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;
  signInWithEmailAndPassword(auth, email, senha)
    .then(() => exibirModalMensagem("Login realizado com sucesso!", "Login"))
    .catch(err => exibirModalMensagem("Erro no login: " + err.message, "Erro"));
});

// Cadastro
document.getElementById("registerForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("registerEmail").value;
  const senha = document.getElementById("registerSenha").value;
  createUserWithEmailAndPassword(auth, email, senha)
    .then(() => exibirModalMensagem("Cadastro realizado com sucesso!", "Cadastro"))
    .catch(err => exibirModalMensagem("Erro no cadastro: " + err.message, "Erro"));
});

// Google Login
document.getElementById("googleLoginBtn").addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(() => exibirModalMensagem("Login com Google realizado com sucesso!", "Login com Google"))
    .catch(err => exibirModalMensagem("Erro no login com Google: " + err.message, "Erro"));
});

// Recuperar senha
document.getElementById("recuperarSenhaForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("recuperarEmail").value;
  sendPasswordResetEmail(auth, email)
    .then(() => exibirModalMensagem("E-mail de recuperação enviado!", "Recuperar Senha"))
    .catch(err => exibirModalMensagem("Erro ao enviar e-mail: " + err.message, "Erro"));
});

// Completar perfil ao logar
onAuthStateChanged(auth, async user => {
  if (user) {
    const docRef = doc(db, "usuarios", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      showModal("modalCompletarPerfil");
    }
  }
});

document.getElementById("completarPerfilForm").addEventListener("submit", async e => {
  e.preventDefault();
  const user = auth.currentUser;
  const data = {
    nome: document.getElementById("nome").value,
    telefone: document.getElementById("telefone").value,
    endereco: document.getElementById("endereco").value
  };
  await setDoc(doc(db, "usuarios", user.uid), data);
  exibirModalMensagem("Perfil salvo com sucesso!", "Perfil");
});