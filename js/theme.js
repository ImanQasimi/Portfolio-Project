// theme.js
// Handles light/dark theme toggling and persists the choice in localStorage

function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return; // header hasn't loaded yet, or button is missing

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    toggleBtn.textContent = theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

    // Save the selected theme so it persists across pages/reloads
    localStorage.setItem("theme", theme);
  }

  function loadSavedTheme() {
    // Default theme is "dark" to match this site's default design
    const savedTheme = localStorage.getItem("theme");
    applyTheme(savedTheme ? savedTheme : "dark");
  }

  toggleBtn.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
  });

  loadSavedTheme(); // Run once, right after the button becomes available
}

// Expose globally so components.js can call this after injecting the header
window.initThemeToggle = initThemeToggle;

// Fallback: if a page ever has the toggle button already in its HTML
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("theme-toggle")) {
    initThemeToggle();
  }
});
