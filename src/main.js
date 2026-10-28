// HTML supplies the content; JavaScript progressively adds interactions.
const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const mobileLayout = window.matchMedia("(max-width: 700px)");
let preference;

// Some browsers block storage. The page still works for the current visit.
try {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") preference = saved;
} catch {
  // Use the system preference when storage is unavailable.
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute("aria-pressed", String(theme === "dark"));
}

applyTheme(preference ?? (systemTheme.matches ? "dark" : "light"));
themeButton.hidden = false;
themeButton.addEventListener("click", () => {
  preference = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(preference);
  try {
    localStorage.setItem("theme", preference);
  } catch {
    // Theme switching does not depend on persistent storage.
  }
});
systemTheme.addEventListener("change", (event) => {
  if (!preference) applyTheme(event.matches ? "dark" : "light");
});

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  nav.hidden = mobileLayout.matches && !open;
}

function updateLayout() {
  menuButton.hidden = !mobileLayout.matches;
  setMenu(false);
}

updateLayout();
mobileLayout.addEventListener("change", updateLayout);
menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});
nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    setMenu(false);
    menuButton.focus();
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();
