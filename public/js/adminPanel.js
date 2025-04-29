// js/firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDl--hYj-_2C6rCGZ-YCrzZHAL7YRmvUjI",
  authDomain: "solar-3a236.firebaseapp.com",
  projectId: "solar-3a236",
  storageBucket: "solar-3a236.appspot.com",
  messagingSenderId: "455982612562",
  appId: "1:455982612562:web:171f109e99673c5cb85f8b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { app, auth, db, provider }; // ✅ Agora exportando corretamente


// Carrega usuários
async function carregarUsuarios() {
  const usuariosCol = collection(db, "usuarios");
  const usuariosSnap = await getDocs(usuariosCol);

  const listaUsuarios = document.getElementById("listaUsuarios");
  listaUsuarios.innerHTML = "";

  usuariosSnap.forEach(doc => {
    const data = doc.data();
    const item = document.createElement("li");
    item.textContent = `${data.nome || "(Sem nome)"} | ${data.email}`;
    listaUsuarios.appendChild(item);
  });
}

// Carrega carrinhos
async function carregarCarrinhos() {
  const carrinhosCol = collection(db, "carrinhos");
  const carrinhosSnap = await getDocs(carrinhosCol);

  const listaCarrinhos = document.getElementById("listaCarrinhos");
  listaCarrinhos.innerHTML = "";

  carrinhosSnap.forEach(doc => {
    const dados = doc.data();
    const item = document.createElement("li");
    item.textContent = `Carrinho de ${doc.id}: ${JSON.stringify(dados.itens)}`;
    listaCarrinhos.appendChild(item);
  });
}

// Verificar login
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "/index.html";
  } else {
    carregarUsuarios();
    carregarCarrinhos();
  }
});

// Botão logout
document.getElementById("btnLogout").addEventListener("click", () => {
  signOut(auth).then(() => window.location.href = "/index.html");
});
