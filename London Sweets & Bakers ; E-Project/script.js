
const hamburgerMenu = document.querySelector(".hamburger-menu");
const mobileMenu = document.querySelector(".mobile-menu");

hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("active");
  mobileMenu.classList.toggle("active");

  if (mobileMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});

const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburgerMenu.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel-slide");
  const indicators = document.querySelectorAll(".indicator");
  let currentSlide = 0;

  const slideInterval = setInterval(nextSlide, 5000);

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function goToSlide(n) {
    slides[currentSlide].classList.remove("active");
    indicators[currentSlide].classList.remove("active");
    currentSlide = n;
    slides[currentSlide].classList.add("active");
    indicators[currentSlide].classList.add("active");
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      clearInterval(slideInterval);
      goToSlide(index);
    });
  });

  const modalButtons = document.querySelectorAll(".view-details");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close-modal");

  modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product");
      const modal = document.getElementById(`${productId}-modal`);
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });

  window.addEventListener("click", (event) => {
    modals.forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modals.forEach((modal) => {
        if (modal.style.display === "block") {
          modal.style.display = "none";
          document.body.style.overflow = "auto";
        }
      });
    }
  });

  
  document.querySelectorAll(".btn-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal");
      const productName = modal.querySelector("h3").textContent;
      const ingredients = Array.from(
        modal.querySelectorAll(".modal-details li")
      )
        .map((li) => li.textContent)
        .join("\n");

      
      const blob = new Blob(
        [`Product: ${productName}\n\nIngredients:\n${ingredients}`],
        { type: "text/plain" }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${productName.replace(/\s+/g, "_")}_ingredients.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-check"></i> Ingredients Downloaded!';
      setTimeout(() => {
        this.innerHTML = originalText;
      }, 2000);
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
