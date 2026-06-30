(function() {
  var slides = Array.prototype.slice.call(document.querySelectorAll(".hero_slide"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".slider_dot"));
  var prevButton = document.querySelector(".slider_arrow.prev");
  var nextButton = document.querySelector(".slider_arrow.next");
  var currentIndex = 0;
  var autoplayId = null;
  var autoplayDelay = 5000;

  function renderSlide(index) {
    slides.forEach(function(slide, slideIndex) {
      slide.classList.toggle("active", slideIndex === index);
    });

    dots.forEach(function(dot, dotIndex) {
      dot.classList.toggle("active", dotIndex === index);
    });

    currentIndex = index;
  }

  if (slides.length) {
    renderSlide(0);
  }

  function showNext(step) {
    var nextIndex = (currentIndex + step + slides.length) % slides.length;
    renderSlide(nextIndex);
  }

  function stopAutoplay() {
    if (autoplayId !== null) {
      window.clearInterval(autoplayId);
      autoplayId = null;
    }
  }

  function startAutoplay() {
    if (slides.length < 2) {
      return;
    }

    stopAutoplay();
    autoplayId = window.setInterval(function() {
      showNext(1);
    }, autoplayDelay);
  }

  function resetAutoplay() {
    startAutoplay();
  }

  if (prevButton) {
    prevButton.addEventListener("click", function() {
      showNext(-1);
      resetAutoplay();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function() {
      showNext(1);
      resetAutoplay();
    });
  }

  dots.forEach(function(dot) {
    dot.addEventListener("click", function() {
      renderSlide(Number(dot.getAttribute("data-slide")));
      resetAutoplay();
    });
  });

  document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
      stopAutoplay();
      return;
    }

    startAutoplay();
  });

  startAutoplay();
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
