/* ================================================
   eGov Landing Page — script.js
   Scroll animations, tab interactions, counters
   ================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---- Intersection Observer for Scroll Animations ---- */
  const animatedEls = document.querySelectorAll("[data-animate]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseFloat(getComputedStyle(el).getPropertyValue("--delay")) || 0;
          setTimeout(() => el.classList.add("is-visible"), delay * 1000);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12 }
  );

  animatedEls.forEach((el) => observer.observe(el));


  /* ---- Problem Pill Tabs ---- */
  const pills = document.querySelectorAll(".pill-btn");
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
    });
  });


  /* ---- Latest Content Tabs ---- */
  const ltabs = document.querySelectorAll(".ltab");
  ltabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      ltabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });


  /* ---- Smooth Navbar Shadow on Scroll ---- */
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = "0 2px 20px rgba(26,86,160,0.12)";
    } else {
      header.style.boxShadow = "none";
    }
  });


  /* ---- Newsletter Form Feedback ---- */
  const nlForms = document.querySelectorAll(".nl-form, .footer-subscribe");
  nlForms.forEach((form) => {
    const btn = form.querySelector("button");
    const input = form.querySelector("input[type='email']");
    if (!btn || !input) return;

    btn.addEventListener("click", () => {
      if (!input.value || !input.value.includes("@")) {
        input.classList.add("is-invalid");
        input.style.border = "2px solid #f87171";
        setTimeout(() => {
          input.classList.remove("is-invalid");
          input.style.border = "";
        }, 2000);
        return;
      }
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="bi bi-check-lg me-1"></i> Subscribed!';
      btn.style.background = "#16a34a";
      btn.disabled = true;
      input.value = "";
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = "";
        btn.disabled = false;
      }, 3000);
    });
  });


  /* ---- Back to Top on Logo Click ---- */
  const logoLink = document.querySelector(".navbar-brand");
  if (logoLink) {
    logoLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }


  /* ---- Animate Stat Numbers ---- */
  const bigNumber = document.querySelector(".big-number");
  if (bigNumber) {
    const numObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounter(bigNumber, "1,000,000,100+");
          numObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    numObserver.observe(bigNumber);
  }

  function animateCounter(el, finalText) {
    // Simple reveal animation
    el.style.opacity = "0";
    el.style.transform = "scale(0.9)";
    setTimeout(() => {
      el.style.transition = "all 0.6s ease";
      el.style.opacity = "1";
      el.style.transform = "scale(1)";
      el.textContent = finalText;
    }, 200);
  }

});
