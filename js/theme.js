// theme.js
// Handles light/dark theme toggling and persists the choice in localStorage
// so the theme survives page reloads and navigation between pages.
//
// Note: because the toggle button now lives inside components/header.html
// (loaded dynamically by components.js), this button doesn't exist yet when
// the page first loads. So instead of wiring everything up automatically on
// DOMContentLoaded, this file exposes initThemeToggle() globally, and
// components.js calls it once the header has actually been injected.

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
// (no dynamic header), initialize immediately on load.
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("theme-toggle")) {
    initThemeToggle();
  }
});
