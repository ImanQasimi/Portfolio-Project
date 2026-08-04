// theme.js
// Handles light/dark theme toggling and persists the choice in localStorage

function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return; // header hasn't loaded yet, or button is missing

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    const sunIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    const moonIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>';

    toggleBtn.innerHTML = theme === "dark" ? sunIcon : moonIcon;
    toggleBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");


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
