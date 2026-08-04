
// Loads the shared nav and footer markup from the components/ folder and
function loadComponent(selector, filePath, callback) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error("Could not load " + filePath);
      return response.text();
    })
    .then(html => {
      document.querySelector(selector).innerHTML = html;

      // Run any page setup that depends on this component's markup existing
      if (callback) callback();
    })
    .catch(error => console.error(error));
}

// Since the same header.html is reused on every page, it can't hardcode

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
    if (window.initThemeToggle) {
      window.initThemeToggle();
    }
  });

  loadComponent("#footer-placeholder", "components/footer.html");
});
