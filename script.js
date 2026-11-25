const whatsappUrl = "https://wa.me/5493541568331?text=Hola%2C%20llegu%C3%A9%20desde%20la%20web%20de%20ART%20IA%20Solutions%20Agency%20y%20quiero%20conocer%20m%C3%A1s%20sobre%20sus%20servicios.";
const whatsappCta = document.getElementById("whatsapp-cta");
if (whatsappCta) whatsappCta.href = whatsappUrl;

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
  }));
}
