// components.js
// Loads the shared nav and footer markup from the components/ folder and
// injects them into their placeholder elements, so header/footer markup
// only has to be maintained in one place instead of copy-pasted on every page.

function loadComponent(selector, filePath, callback) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error("Could not load " + filePath);
      return response.text();
    })
    .then(html => {
      document.querySelector(selector).innerHTML = html;

      // Run any page setup that depends on this component's markup existing
      // (e.g. the theme toggle button only exists after the header loads)
      if (callback) callback();
    })
    .catch(error => console.error(error));
}

// Since the same header.html is reused on every page, it can't hardcode
// which nav tab is "active." Instead, after the nav is injected, compare
// each link's href against the current page's filename and mark the match.
function highlightActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-tabs a").forEach(function (link) {
    if (link.getAttribute("href") === currentPage) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadComponent("#nav-placeholder", "components/header.html", function () {
    highlightActiveNavLink();

    // The theme toggle button just got added to the DOM via the header
    // injection above, so (re)run its setup now that it actually exists.
    if (window.initThemeToggle) {
      window.initThemeToggle();
    }
  });

  loadComponent("#footer-placeholder", "components/footer.html");
});
