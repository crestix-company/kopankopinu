(function() {
  var slides = Array.prototype.slice.call(document.querySelectorAll(".hero_slide"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".slider_dot"));
  var prevButton = document.querySelector(".slider_arrow.prev");
  var nextButton = document.querySelector(".slider_arrow.next");
  var currentLabel = document.querySelector(".slider_current");
  var totalLabel = document.querySelector(".slider_total");
  var currentIndex = 0;

  function renderSlide(index) {
    slides.forEach(function(slide, slideIndex) {
      slide.classList.toggle("active", slideIndex === index);
    });

    dots.forEach(function(dot, dotIndex) {
      dot.classList.toggle("active", dotIndex === index);
    });

    currentIndex = index;
    if (currentLabel) {
      currentLabel.textContent = String(index + 1).padStart(2, "0");
    }
  }

  if (slides.length) {
    if (totalLabel) {
      totalLabel.textContent = String(slides.length).padStart(2, "0");
    }
    renderSlide(0);
  }

  function showNext(step) {
    var nextIndex = (currentIndex + step + slides.length) % slides.length;
    renderSlide(nextIndex);
  }

  if (prevButton) {
    prevButton.addEventListener("click", function() {
      showNext(-1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function() {
      showNext(1);
    });
  }

  dots.forEach(function(dot) {
    dot.addEventListener("click", function() {
      renderSlide(Number(dot.getAttribute("data-slide")));
    });
  });
})();

(function() {
  var menuButton = document.querySelector(".menu_toggle");
  var closeButton = document.querySelector(".overlay_close");
  var menu = document.querySelector(".overlay_nav");
  var menuLinks = Array.prototype.slice.call(document.querySelectorAll(".overlay_nav a"));

  function setMenuState(isOpen) {
    if (!menu || !menuButton) {
      return;
    }

    menu.classList.toggle("open", isOpen);
    menu.setAttribute("aria-hidden", String(!isOpen));
    menuButton.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu_open", isOpen);
  }

  if (menuButton) {
    menuButton.addEventListener("click", function() {
      setMenuState(true);
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", function() {
      setMenuState(false);
    });
  }

  menuLinks.forEach(function(link) {
    link.addEventListener("click", function() {
      setMenuState(false);
    });
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });
})();
