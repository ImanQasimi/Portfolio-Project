
// Live search filter, shared by both projects.html (.project-card)


document.addEventListener("DOMContentLoaded", function () {
  const filterInput = document.getElementById("filter-input");
  const noResults = document.getElementById("no-results");

  if (!filterInput) return; // this page has no filter box (e.g. contact.html)

  filterInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();
    const cards = document.querySelectorAll(".project-card, .post-card");
    let visibleCount = 0;

    cards.forEach(function (card) {
      const titleEl = card.querySelector(".card-title");
      const title = titleEl ? titleEl.textContent.toLowerCase() : "";

      // Secondary field #1: tags (projects) or category (blog posts)
      let secondaryText = "";
      card.querySelectorAll(".tag, .category").forEach(function (el) {
        secondaryText += " " + el.textContent.toLowerCase();
      });

      // Secondary field #2: description text.
      const summaryEl = card.querySelector(".post-summary");
      const descEl = summaryEl || card.querySelector("p");
      if (descEl) secondaryText += " " + descEl.textContent.toLowerCase();

      const matches = title.includes(query) || secondaryText.includes(query);
      card.style.display = matches ? "" : "none";
      if (matches) visibleCount++;
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? "block" : "none";
    }
  });
});
