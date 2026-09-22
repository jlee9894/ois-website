document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  var yearEls = document.querySelectorAll("[data-year]");
  yearEls.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  document.querySelectorAll("[data-slider]").forEach(function (slider) {
    var wrap = slider.closest(".gallery-slider-wrap");
    if (!wrap) return;
    var prev = wrap.querySelector(".slider-btn.prev");
    var next = wrap.querySelector(".slider-btn.next");
    var step = function () {
      var item = slider.querySelector(".gallery-item");
      var gap = parseFloat(getComputedStyle(slider).columnGap) || 16;
      return item ? item.offsetWidth + gap : 280;
    };
    if (prev) {
      prev.addEventListener("click", function () {
        slider.scrollBy({ left: -step(), behavior: "smooth" });
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        slider.scrollBy({ left: step(), behavior: "smooth" });
      });
    }
  });

  document.querySelectorAll("form[data-quote-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var success = form.parentElement.querySelector(".form-success");
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn ? submitBtn.textContent : "";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          form.style.display = "none";
          if (success) success.classList.add("visible");
        })
        .catch(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
          alert(
            "Sorry, something went wrong sending your message. Please call us at (502) 418-1205 or email cody-ois@outlook.com directly."
          );
        });
    });
  });
});
