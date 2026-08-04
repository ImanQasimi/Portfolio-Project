// validate.js
// Validates the contact form client-side: shows inline errors, clears them
// as the user corrects input, and shows a success state on valid submission.

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("form-success");

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    let errorEl = field.nextElementSibling;

    // Reuse the existing error span if it's there; otherwise create one
    if (!errorEl || !errorEl.classList.contains("error-msg")) {
      errorEl = document.createElement("span");
      errorEl.classList.add("error-msg");
      field.insertAdjacentElement("afterend", errorEl);
    }

    errorEl.textContent = message;
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorEl = field.nextElementSibling;

    if (errorEl && errorEl.classList.contains("error-msg")) {
      errorEl.textContent = "";
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "") {
      showError("name", "Please enter your name.");
      isValid = false;
    } else {
      clearError("name");
    }

    if (email === "") {
      showError("email", "Please enter your email.");
      isValid = false;
    } else if (!validateEmail(email)) {
      showError("email", "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError("email");
    }

    if (message.length < 20) {
      showError("message", "Message must be at least 20 characters (" + message.length + "/20).");
      isValid = false;
    } else {
      clearError("message");
    }

    if (isValid) {
      form.hidden = true;
      successMessage.hidden = false;
    }
  });

  // Clear errors as the user types
  ["name", "email", "message"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () {
      clearError(id);
    });
  });
});
