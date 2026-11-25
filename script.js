// CONFIGURACIÓN: reemplazá el número por el WhatsApp de ART IA en formato internacional, sin + ni espacios.
const WHATSAPP_NUMBER = "5493541568331";
const WHATSAPP_MESSAGE = "Hola, quiero consultar por los servicios de ART IA Solutions Agency.";
const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const cta = document.getElementById("whatsapp-cta");
if (cta) {
  cta.href = whatsappLink;
  cta.addEventListener("click", (event) => {
    if (WHATSAPP_NUMBER.includes("X")) {
      event.preventDefault();
      alert("Estamos preparando el contacto. En breve configuraremos el número de WhatsApp de ART IA.");
    }
  });
}
document.getElementById("year").textContent = new Date().getFullYear();
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle?.setAttribute("aria-expanded", "false");
}));
