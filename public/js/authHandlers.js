import { app } from './firebaseConfig.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

async function salvarPerfil(user) {
  const docRef = doc(db, "usuarios", user.uid);
  const snap = await getDoc(docRef);
  if (!snap.exists()) {
    await setDoc(docRef, {
      nome: user.displayName || "",
      email: user.email
    });
  }
}

window.loginEmailSenha = async function (e) {
  e.preventDefault();
  const email = loginEmail.value;
  const senha = loginSenha.value;

  try {
    const cred = await signInWithEmailAndPassword(auth, email, senha);
    await salvarPerfil(cred.user);
    alert("Login realizado!");
    location.reload();
  } catch (err) {
    alert("Erro: " + err.message);
  }
};

window.cadastrarEmailSenha = async function (e) {
  e.preventDefault();
  const email = registerEmail.value;
  const senha = registerSenha.value;

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, senha);
    await salvarPerfil(cred.user);
    alert("Cadastro feito!");
    location.reload();
  } catch (err) {
    alert("Erro: " + err.message);
  }
};

document.getElementById("googleLoginBtn").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    await salvarPerfil(result.user);
    alert("Login com Google feito!");
    location.reload();
  } catch (err) {
    alert("Erro Google: " + err.message);
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuário logado:", user.email);
  }
});
