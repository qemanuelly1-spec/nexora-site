/* ============================================================
   NEXORA Digital - script.js
   >>> TROQUE O NÚMERO ABAIXO PELO SEU WHATSAPP <<<
   Formato: 55 + DDD + número, sem espaços ou símbolos.
   Exemplo: 5562999999999
   ============================================================ */
const WHATSAPP_NUMBER = "5562992161234";

document.documentElement.classList.add("js");

/* Ano no rodapé */
const anoEl = document.getElementById("ano");
if (anoEl) anoEl.textContent = new Date().getFullYear();

/* Menu no celular */
const toggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");

function setMenu(open) {
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  menu.classList.toggle("is-open", open);
}

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
}

/* Animação ao rolar a página */
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

/* Link do WhatsApp */
function buildWhatsAppUrl(message) {
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

/* Formulário de orçamento: abre o WhatsApp com a mensagem pronta */
const form = document.getElementById("form-orcamento");

function setError(fieldId, text) {
  const input = document.getElementById(fieldId);
  const msg = form.querySelector('[data-error-for="' + fieldId + '"]');
  const wrapper = input.closest(".field");
  wrapper.classList.toggle("has-error", Boolean(text));
  input.setAttribute("aria-invalid", text ? "true" : "false");
  if (msg) msg.textContent = text || "";
}

if (form) {
  ["nome", "mensagem"].forEach((id) => {
    document.getElementById(id).addEventListener("input", () => setError(id, ""));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const servico = form.servico.value;
    const mensagem = form.mensagem.value.trim();

    let valido = true;
    if (nome.length < 2) {
      setError("nome", "Digite seu nome.");
      valido = false;
    }
    if (mensagem.length < 5) {
      setError("mensagem", "Conte um pouco sobre o que você precisa.");
      valido = false;
    }
    if (!valido) {
      const primeiro = form.querySelector(".has-error input, .has-error textarea");
      if (primeiro) primeiro.focus();
      return;
    }

    const texto =
      "Olá! Meu nome é " + nome + ".\n" +
      "Quero um orçamento de: " + servico + ".\n\n" +
      mensagem;

    window.open(buildWhatsAppUrl(texto), "_blank", "noopener");
  });
}

/* Botão flutuante: abre o WhatsApp com mensagem padrão */
const whatsFloat = document.getElementById("whats-float");
if (whatsFloat) {
  whatsFloat.href = buildWhatsAppUrl("Olá! Vim pelo site da NEXORA Digital e quero fazer um orçamento.");
  whatsFloat.target = "_blank";
  whatsFloat.rel = "noopener";
}

/* Links "Ver projeto": ainda sem endereço das demos.
   Quando cada demo estiver no ar, troque o href="#" no index.html
   pelo endereço real e apague este bloco. */
document.querySelectorAll("[data-demo]").forEach((link) => {
  if (link.getAttribute("href") === "#") {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      alert("A demonstração " + link.dataset.demo + " estará disponível em breve.");
    });
  }
});
