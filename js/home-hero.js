
document.addEventListener("DOMContentLoaded", () => {
  const deck = document.getElementById("b10HeroPhones");
  if (!deck) return;

  const phones = [...deck.querySelectorAll(".b10-phone")];

  const activate = phone => {
    phones.forEach(p => p.classList.toggle("is-active", p === phone));
  };

  phones.forEach(phone => {
    phone.addEventListener("click", () => activate(phone));
    phone.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate(phone);
      }
    });
  });

  if (!matchMedia("(pointer: fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  deck.addEventListener("pointermove", e => {
    const r = deck.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;

    deck.style.setProperty("--mx1", `${x * 9}px`);
    deck.style.setProperty("--my1", `${y * 7}px`);
    deck.style.setProperty("--mx2", `${x * -7}px`);
    deck.style.setProperty("--my2", `${y * -8}px`);
    deck.style.setProperty("--mx3", `${x * 9}px`);
    deck.style.setProperty("--my3", `${y * 7}px`);
  });

  deck.addEventListener("pointerleave", () => {
    ["--mx1","--my1","--mx2","--my2","--mx3","--my3"].forEach(v => deck.style.removeProperty(v));
  });
});
