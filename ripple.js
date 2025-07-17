document.addEventListener("DOMContentLoaded", () => {
  const rippleElements = document.querySelectorAll(".ripple");

  rippleElements.forEach((el) => {
    el.addEventListener("click", function (e) {
      e.preventDefault();

      const ripple = document.createElement("span");
      const rect = el.getBoundingClientRect();

      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      // Use custom color from data-ripple OR fallback to white
      const color = el.getAttribute("data-ripple") || "rgba(255, 255, 255, 0.4)";
      ripple.style.backgroundColor = color;

      ripple.className = "ripple-effect";

      el.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);

      setTimeout(() => {
        if (el.tagName === "A" && el.href) {
          window.location.href = el.href;
        }

        if (el.dataset && el.dataset.action) {
          const callback = window[el.dataset.action];
          if (typeof callback === "function") {
            callback(e);
          }
        }

        if (el.type === "submit") {
          const form = el.closest("form");
          if (form) form.submit();
        }
      }, 800);
    });
  });
});
