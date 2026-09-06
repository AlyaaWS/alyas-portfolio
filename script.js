document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".project-slider");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (slider && prevBtn && nextBtn) {
    const getScrollAmount = () => {
      const card = slider.querySelector(".project-card");
      return card ? card.offsetWidth + 24 : 320;
    };

    let autoScrollInterval;
    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        // If we are near the end of the scroll, scroll back to the beginning
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          slider.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
        }
      }, 1500); // Scroll every 1.5 seconds
    };

    const stopAutoScroll = () => {
      clearInterval(autoScrollInterval);
    };

    // Start auto scroll on load
    startAutoScroll();

    // Pause auto scroll when mouse enters the slider
    slider.addEventListener("mouseenter", stopAutoScroll);
    slider.addEventListener("mouseleave", startAutoScroll);

    nextBtn.addEventListener("click", () => {
      slider.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
      stopAutoScroll();
      startAutoScroll(); // Reset interval
    });

    prevBtn.addEventListener("click", () => {
      slider.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth",
      });
      stopAutoScroll();
      startAutoScroll(); // Reset interval
    });
  }

  const profileBtn = document.getElementById("profileBtn");
  const imgModal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  const modalClose = document.querySelector(".img-modal-close");

  if (profileBtn && imgModal) {
    const openModal = () => {
      imgModal.classList.add("open");
      imgModal.setAttribute("aria-hidden", "false");
      if (modalClose) modalClose.focus();
    };

    const closeModal = () => {
      imgModal.classList.remove("open");
      imgModal.setAttribute("aria-hidden", "true");
      profileBtn.focus();
    };

    profileBtn.addEventListener("click", () => {
      if (modalImg && profileBtn.querySelector("img")) {
        modalImg.src = profileBtn.querySelector("img").src;
      }
      openModal();
    });

    modalClose && modalClose.addEventListener("click", closeModal);

    imgModal.addEventListener("click", (e) => {
      if (e.target === imgModal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
