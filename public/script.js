/* ART IA Solutions Agency — interacciones */
(function () {
  "use strict";

  var WHATSAPP_URL = "https://wa.me/5493541568331";
  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Asegura que todo enlace de contacto apunte al número oficial */
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function (a) {
    a.href = WHATSAPP_URL;
  });

  /* Año del footer */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* Entrada del hero */
  requestAnimationFrame(function () { root.classList.add("is-ready"); });

  /* Header con borde al hacer scroll */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Menú móvil */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  function setMenu(open) {
    if (!toggle || !nav) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* Pestañas accesibles (sectores y demos) */
  function setupTabs(tabSelector) {
    var tabs = Array.prototype.slice.call(document.querySelectorAll(tabSelector));
    if (!tabs.length) return;

    function activate(tab, focus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        t.tabIndex = selected ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
      if (focus) tab.focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { activate(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") next = tabs[0];
        if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); activate(next, true); }
      });
    });
  }
  setupTabs(".sector-tab");
  setupTabs(".demo-tab");

  /* Luz que sigue al cursor en las tarjetas de servicios */
  document.querySelectorAll(".svc").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  /* Consola del hero: conversación simulada de pedido */
  var chat = document.getElementById("hero-chat");
  var events = document.querySelectorAll("#hero-events li");
  var status = document.getElementById("console-status");

  var script = [
    { who: "in", text: "Hola, ¿me mandás dos muzzarellas y una fugazzeta para las 21?" },
    { who: "out", text: "¡Hola! Anotado: 2 muzzarellas y 1 fugazzeta para las 21 h. ¿Retirás o te lo enviamos?" },
    { who: "in", text: "Envío a Playas de Oro, por favor." },
    { who: "out", text: "Perfecto. Total con envío: $33.500. Llega entre 21:00 y 21:20. ¡Gracias!", event: true }
  ];

  function bubble(who, text) {
    var li = document.createElement("li");
    li.className = who;
    li.textContent = text;
    chat.appendChild(li);
    return li;
  }

  function typing() {
    var li = document.createElement("li");
    li.className = "typing";
    li.setAttribute("aria-label", "El asistente está escribiendo");
    li.innerHTML = "<i></i><i></i><i></i>";
    chat.appendChild(li);
    return li;
  }

  function resetEvents() {
    events.forEach(function (ev) { ev.classList.remove("is-done"); });
  }

  function showStatic() {
    script.forEach(function (m) { bubble(m.who, m.text); });
    events.forEach(function (ev) { ev.classList.add("is-done"); });
  }

  var timers = [];
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  function play() {
    chat.innerHTML = "";
    resetEvents();
    var t = 600;
    script.forEach(function (m) {
      if (m.who === "out") {
        later(function () {
          if (status) status.textContent = "Escribiendo…";
          var dots = typing();
          later(function () {
            dots.remove();
            if (status) status.textContent = "Asistente en línea";
            bubble(m.who, m.text);
            if (m.event) {
              events.forEach(function (ev, k) {
                later(function () { ev.classList.add("is-done"); }, 450 + k * 650);
              });
            }
          }, 1300);
        }, t);
        t += 1300 + 900;
      } else {
        later(function () { bubble(m.who, m.text); }, t);
        t += 1400;
      }
    });
    later(play, t + 5200);
  }

  if (chat) {
    if (reduceMotion) {
      showStatic();
    } else if ("IntersectionObserver" in window) {
      var running = false;
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !running) {
            running = true;
            play();
          } else if (!entry.isIntersecting && running) {
            running = false;
            timers.forEach(clearTimeout);
            timers = [];
          }
        });
      }, { threshold: 0.25 }).observe(chat);
    } else {
      play();
    }
  }
})();
