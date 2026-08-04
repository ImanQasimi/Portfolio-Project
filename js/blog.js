// blog.js
// Fetches posts from data/posts.json and renders them into #blog-list,
// newest first, with a "Latest" badge on the most recent post.

document.addEventListener("DOMContentLoaded", function () {
  const blogList = document.getElementById("blog-list");

  fetch("data/posts.json")
    .then(response => {
      if (!response.ok) throw new Error("Could not load data/posts.json");
      return response.json();
    })
    .then(posts => {
      // Sort newest -> oldest by date before rendering
      posts.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });

      // Clear out the static Phase 1 placeholder card before rendering real posts
      blogList.innerHTML = "";

      posts.forEach(function (post, index) {
        const postElement = document.createElement("article");
        postElement.classList.add("card", "post-card");

        const readableDate = formatDate(post.date);
        const isLatest = index === 0; 

        postElement.innerHTML = `
          <p class="post-meta">
            <span class="category">${post.category}</span> · ${readableDate}
          </p>
          <h3 class="card-title">
            ${post.title}
            ${isLatest ? '<span class="badge-latest">Latest</span>' : ""}
          </h3>
          <p class="post-summary">${post.summary}</p>
          <p class="post-full-content" hidden>${post.content}</p>
          <button type="button" class="read-more-btn">Read More</button>
        `;

        blogList.appendChild(postElement);
      });

      // Wire up each "Read More" button to toggle its post's full content
      document.querySelectorAll(".read-more-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const card = btn.closest(".post-card");
          const summary = card.querySelector(".post-summary");
          const fullContent = card.querySelector(".post-full-content");
          const expanded = !fullContent.hidden;

          fullContent.hidden = expanded;
          summary.hidden = !expanded;
          btn.textContent = expanded ? "Read More" : "Show Less";
        });
      });

      document.dispatchEvent(new CustomEvent("postsRendered"));
    })
    .catch(error => console.error("Error loading posts:", error));
});

// Formats "2026-07-17" into something reader-friendly, e.g. "July 17, 2026"
function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00"); // avoid timezone rollback
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
