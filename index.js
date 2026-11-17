// ====== Contact form ======
// Formspree endpoint: formspree.io se mili hui URL yahan paste karein
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_ID";

const form = document.getElementById("contact-form");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");
const thankYou = document.getElementById("thank-you");

function isValidPhone(value) {
  // + aur digits, spaces, brackets, dashes allowed. 7 se 15 digits.
  const digits = value.replace(/\D/g, "");
  return /^\+?[0-9\s().-]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailValid = emailInput.checkValidity();
    const phoneValid = isValidPhone(phoneInput.value.trim());

    emailError.textContent = emailValid ? "" : "Please enter a valid email.";
    phoneError.textContent = phoneValid
      ? ""
      : "Enter a valid number with country code, e.g. +1 555 123 4567.";

    if (!emailValid || !phoneValid) return;

    const submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput.value.trim(),
          phone: phoneInput.value.trim(),
          _subject: "New client request from AM Web Development website",
        }),
      });

      if (!response.ok) throw new Error("Request failed");

      form.hidden = true;
      thankYou.hidden = false;
    } catch (error) {
      phoneError.textContent = "Something went wrong. Please try again.";
      submitButton.disabled = false;
      submitButton.textContent = "Submit";
    }
  });
}

// ====== Scroll reveal ======
const revealItems = document.querySelectorAll(".reveal-on-scroll");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => {
    item.classList.add("reveal-ready");
    observer.observe(item);
  });
}

// ====== Click to change color ======
document.addEventListener("click", (event) => {
  const line = event.target.closest("[data-click-color]");

  if (line) {
    line.classList.toggle("clicked-line");
  }
});