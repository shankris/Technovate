// // ripple.js
// document.addEventListener("DOMContentLoaded", () => {
//   const rippleElements = document.querySelectorAll(".ripple");

//   rippleElements.forEach((el) => {
//     el.addEventListener("click", function (e) {
//       const ripple = document.createElement("span");
//       const rect = el.getBoundingClientRect();

//       const size = Math.max(rect.width, rect.height);
//       const x = e.clientX - rect.left - size / 2;
//       const y = e.clientY - rect.top - size / 2;

//       ripple.style.width = ripple.style.height = `${size}px`;
//       ripple.style.left = `${x}px`;
//       ripple.style.top = `${y}px`;
//       ripple.style.position = "absolute";
//       ripple.style.background = "rgba(255, 255, 255, 0.4)";
//       ripple.className = "ripple-effect";

//       el.appendChild(ripple);

//       setTimeout(() => {
//         ripple.remove();
//       }, 600);
//     });
//   });
// });

// With dealy

document.addEventListener("DOMContentLoaded", () => {
  const rippleElements = document.querySelectorAll(".ripple");

  rippleElements.forEach((el) => {
    el.addEventListener("click", function (e) {
      // Prevent immediate action
      e.preventDefault();

      const ripple = document.createElement("span");
      const rect = el.getBoundingClientRect();

      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.position = "absolute";
      ripple.style.background = "rgba(255, 255, 255, 0.4)";
      ripple.className = "ripple-effect";

      el.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);

      // Delay button action until after animation
      setTimeout(() => {
        // Check if it's a link
        if (el.tagName === "A" && el.href) {
          window.location.href = el.href;
        }

        // If it's a button with data-action callback
        if (el.dataset && el.dataset.action) {
          const callback = window[el.dataset.action];
          if (typeof callback === "function") {
            callback(e);
          }
        }

        // For submit buttons in forms
        if (el.type === "submit") {
          const form = el.closest("form");
          if (form) form.submit();
        }
      }, 800); // 800ms delay
    });
  });
});
