import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

window.adicionarAoCarrinho = async function (item) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
  carrinho.push(item);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarInterfaceCarrinho(carrinho);

  const user = auth.currentUser;
  if (user) {
    const docRef = doc(db, "carrinhos", user.uid);
    await setDoc(docRef, { itens: carrinho });
  }
};

window.atualizarInterfaceCarrinho = function (carrinho) {
  const container = document.getElementById("listaCarrinho");
  if (!container) return;
  container.innerHTML = "";
  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco}`;
    container.appendChild(li);
  });
};
 