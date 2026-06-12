// ==========================================================================
// Himani Sachdeva - Portfolio Script (Interactive & Animated)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const navbar = document.querySelector(".navbar");
  const navLinksContainer = document.querySelector(".navbar ul");
  const navLinks = document.querySelectorAll(".navbar ul li a");
  const menuToggle = document.getElementById("mobile-menu");
  const menuIcon = menuToggle ? menuToggle.querySelector("i") : null;
  const sections = document.querySelectorAll("section, #skills, #projects, .services-section");
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  const filterItems = document.querySelectorAll(".filter-item");

  // ==========================================================================
  // 1. MOBILE NAVBAR HAMBURGER TOGGLE
  // ==========================================================================
  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener("click", () => {
      navLinksContainer.classList.toggle("active");
      
      // Toggle menu icon between burger and close (X)
      if (menuIcon) {
        if (navLinksContainer.classList.contains("active")) {
          menuIcon.className = "bx bx-x";
        } else {
          menuIcon.className = "bx bx-menu";
        }
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navLinksContainer.classList.remove("active");
        if (menuIcon) {
          menuIcon.className = "bx bx-menu";
        }
      });
    });
  }

  // ==========================================================================
  // 2. GLASSMORPHISM NAVBAR ON SCROLL
  // ==========================================================================
  const handleNavbarScroll = () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  };
  
  // Initial check and scroll event listener
  handleNavbarScroll();
  window.addEventListener("scroll", handleNavbarScroll);

  // ==========================================================================
  // 3. SMOOTH SCROLL & SCROLL SPY (ACTIVE LINK HIGHLIGHTING)
  // ==========================================================================
  // Smooth scroll logic
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      // Safety check: targetId must be a valid selector (e.g. starts with #)
      if (targetId && targetId.startsWith("#")) {
        try {
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            // Calculate offset (e.g. height of fixed navbar)
            const offset = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth"
            });
          }
        } catch (err) {
          console.error("Invalid selector or scroll target:", targetId, err);
        }
      }
    });
  });

  // Scroll Spy: Update active class based on scroll position
  const scrollSpy = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", scrollSpy);

  // ==========================================================================
  // 4. PROJECTS FILTERING SYSTEM WITH SMOOTH TRANSITIONS
  // ==========================================================================
  if (filterButtons.length > 0 && filterItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Active button highlight
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filterValue = button.getAttribute("data-filter");

        filterItems.forEach(item => {
          const itemCategory = item.getAttribute("data-category");

          if (filterValue === "all" || itemCategory === filterValue) {
            // Cancel transition delay on filter to keep action snappy
            item.style.transitionDelay = "0s";
            item.style.display = ""; // Reset to default display style
            
            // Force a reflow to trigger opacity fade-in
            item.offsetHeight;
            item.classList.remove("hide-item");
          } else {
            item.style.transitionDelay = "0s";
            item.classList.add("hide-item");

            // Hide from document layout after fade-out transition completes
            setTimeout(() => {
              if (item.classList.contains("hide-item")) {
                item.style.display = "none";
              }
            }, 400); // Matches CSS transition duration
          }
        });
      });
    });
  }

  // ==========================================================================
  // 5. DYNAMIC SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // ==========================================================================
  const initScrollReveal = () => {
    // 1. Apply reveal classes to various sections to keep HTML clean
    
    // Home
    document.querySelector(".home-info")?.classList.add("reveal-el", "reveal-left");
    document.querySelector(".img-box")?.classList.add("reveal-el", "reveal-right");

    // About
    document.querySelector(".about-img")?.classList.add("reveal-el", "reveal-left");
    document.querySelector(".about-content")?.classList.add("reveal-el", "reveal-right");

    // Skills
    document.querySelector(".skills-title h1")?.classList.add("reveal-el", "reveal-up");
    document.querySelectorAll(".skill-card").forEach((card, idx) => {
      card.classList.add("reveal-el", "reveal-scale");
      card.style.transitionDelay = `${(idx % 4) * 0.15}s`;
    });

    // Projects Grid / Heading / Descriptions

    document.querySelectorAll(".project-title h1, .project-title p, .filter-buttons").forEach(el => {
      el.classList.add("reveal-el", "reveal-up");
    });
    
    document.querySelectorAll(".project-card").forEach((card, idx) => {
      card.classList.add("reveal-el", "reveal-up");
      card.style.transitionDelay = `${(idx % 4) * 0.15}s`;
    });











    // Services
    document.querySelector(".services-section h1")?.classList.add("reveal-el", "reveal-up");
    document.querySelectorAll(".services-card").forEach((card, idx) => {
      card.classList.add("reveal-el", "reveal-up");
      card.style.transitionDelay = `${idx * 0.15}s`;
    });

    // Contact
    document.querySelector(".left-box")?.classList.add("reveal-el", "reveal-left");
    document.querySelector(".right-box")?.classList.add("reveal-el", "reveal-right");

    // 2. Set up Intersection Observer to activate elements on scroll
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        threshold: 0.15, // trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
      };

      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            // Optional: unobserve once revealed to keep animation permanent
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // Observe all elements marked for reveal
      const revealElements = document.querySelectorAll(".reveal-el");
      revealElements.forEach(el => revealObserver.observe(el));
    } else {
      // Fallback: if IntersectionObserver is not supported, reveal all elements immediately
      const revealElements = document.querySelectorAll(".reveal-el");
      revealElements.forEach(el => el.classList.add("reveal-active"));
    }
  };

  // Run dynamic reveal setup
  initScrollReveal();

  // ==========================================================================
  // 6. LIGHTBOX MODAL FOR PROJECT IMAGES (WITH SLIDER FUNCTIONALITY)
  // ==========================================================================
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.querySelector(".lightbox-close");
  const prevBtn = lightbox ? lightbox.querySelector(".lightbox-prev") : null;
  const nextBtn = lightbox ? lightbox.querySelector(".lightbox-next") : null;

  if (lightbox && lightboxImg && lightboxCaption) {
    let currentSlideIndex = 0;
    let activeSlidesList = [];

    // Function to dynamically gather all currently visible slides based on active filter
    const getActiveSlides = () => {
      const activeSlides = [];
      
      // 1. Branding (project-grid) cards
      const brandingGrid = document.querySelector(".project-grid");
      if (brandingGrid && window.getComputedStyle(brandingGrid).display !== "none") {
        const cards = brandingGrid.querySelectorAll(".project-card");
        cards.forEach(card => {
          const img = card.querySelector("img");
          const heading = card.querySelector("h2") || card.querySelector("h1");
          if (img) {
            activeSlides.push({
              src: img.getAttribute("src"),
              alt: img.getAttribute("alt") || "Project Image",
              caption: heading ? heading.textContent.trim() : ""
            });
          }
        });
      }

      // 2. UI/UX section
      const uiuxSection = document.querySelector(".uiux");
      if (uiuxSection && window.getComputedStyle(uiuxSection).display !== "none") {
        const img = uiuxSection.querySelector(".uiux-img img");
        const titleEl = uiuxSection.querySelector(".content-uiux h2");
        if (img) {
          activeSlides.push({
            src: img.getAttribute("src"),
            alt: img.getAttribute("alt") || "UI/UX Design",
            caption: titleEl ? titleEl.textContent.trim() : "UI/UX Design"
          });
        }
      }

      // 3. Web Design section
      const webGrid = document.querySelector(".web-grid");
      if (webGrid && window.getComputedStyle(webGrid).display !== "none") {
        const img = webGrid.querySelector(".web-card img");
        const titleEl = webGrid.querySelector(".web-content h2");
        if (img) {
          activeSlides.push({
            src: img.getAttribute("src"),
            alt: img.getAttribute("alt") || "Web Design",
            caption: titleEl ? titleEl.textContent.trim() : "Web Design"
          });
        }
      }

      return activeSlides;
    };

    // Function to update the DOM elements inside lightbox
    const updateLightboxContent = (animate = true) => {
      if (activeSlidesList.length === 0) return;
      const currentSlide = activeSlidesList[currentSlideIndex];
      const contentEl = lightbox.querySelector(".lightbox-content");

      if (animate && contentEl) {
        contentEl.classList.add("fade-out");
        
        setTimeout(() => {
          lightboxImg.src = currentSlide.src;
          lightboxImg.alt = currentSlide.alt;
          lightboxCaption.textContent = currentSlide.caption;
          
          const counterEl = document.getElementById("lightbox-counter");
          if (counterEl) {
            counterEl.textContent = `${currentSlideIndex + 1} / ${activeSlidesList.length}`;
          }

          contentEl.classList.remove("fade-out");
        }, 250); // Matches the CSS fade-out duration
      } else {
        lightboxImg.src = currentSlide.src;
        lightboxImg.alt = currentSlide.alt;
        lightboxCaption.textContent = currentSlide.caption;
        
        const counterEl = document.getElementById("lightbox-counter");
        if (counterEl) {
          counterEl.textContent = `${currentSlideIndex + 1} / ${activeSlidesList.length}`;
        }
      }

      // Adjust visibility of next/prev buttons based on slider length
      if (prevBtn && nextBtn) {
        if (activeSlidesList.length <= 1) {
          prevBtn.style.display = "none";
          nextBtn.style.display = "none";
        } else {
          prevBtn.style.display = "flex";
          nextBtn.style.display = "flex";
        }
      }
    };

    // Slide navigation functions
    const nextSlide = () => {
      if (activeSlidesList.length <= 1) return;
      currentSlideIndex = (currentSlideIndex + 1) % activeSlidesList.length;
      updateLightboxContent(true);
    };

    const prevSlide = () => {
      if (activeSlidesList.length <= 1) return;
      currentSlideIndex = (currentSlideIndex - 1 + activeSlidesList.length) % activeSlidesList.length;
      updateLightboxContent(true);
    };

    // Function to open lightbox
    const openLightbox = (imgSrc, imgAlt, captionText) => {
      activeSlidesList = getActiveSlides();
      currentSlideIndex = activeSlidesList.findIndex(slide => slide.src === imgSrc);
      
      // Fallback in case clicked item wasn't in the lists
      if (currentSlideIndex === -1) {
        activeSlidesList = [{ src: imgSrc, alt: imgAlt, caption: captionText }];
        currentSlideIndex = 0;
      }

      updateLightboxContent(false); // Open immediately without transition for first load
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent page scroll when open
    };

    // Close function
    const closeLightbox = () => {
      lightbox.classList.remove("active");
      document.body.style.overflow = ""; // Restore page scroll
    };

    // Add click events to project cards
    const cards = document.querySelectorAll(".project-card");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const img = card.querySelector("img");
        const heading = card.querySelector("h2") || card.querySelector("h1");
        if (img) {
          const imgSrc = img.getAttribute("src");
          const imgAlt = img.getAttribute("alt");
          const captionText = heading ? heading.textContent : "";
          openLightbox(imgSrc, imgAlt, captionText);
        }
      });
    });

    // Also add click events to UI/UX and Web images/cards for complete experience
    const uiuxImg = document.querySelector(".uiux-img img");
    if (uiuxImg) {
      uiuxImg.addEventListener("click", () => {
        const titleEl = document.querySelector(".content-uiux h2");
        openLightbox(uiuxImg.getAttribute("src"), uiuxImg.getAttribute("alt"), titleEl ? titleEl.textContent : "UI/UX Design");
      });
    }

    const webCardImg = document.querySelector(".web-card img");
    if (webCardImg) {
      webCardImg.addEventListener("click", () => {
        const titleEl = document.querySelector(".web-content h2");
        openLightbox(webCardImg.getAttribute("src"), webCardImg.getAttribute("alt"), titleEl ? titleEl.textContent : "Web Design");
      });
    }

    // Close button click
    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    // Slider navigation clicks
    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent closing the lightbox
        prevSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent closing the lightbox
        nextSlide();
      });
    }

    // Close on click outside the content image
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.classList.contains("lightbox-content")) {
        closeLightbox();
      }
    });

    // Keyboard navigation (Esc, ArrowRight, ArrowLeft)
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight" || e.key === "Right") {
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "Left") {
        prevSlide();
      }
    });
  }
});


// CONTACT FORM SUBMIT

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // INPUT VALUES
  const username = document.querySelector('input[type="text"]').value;
  const email = document.querySelector('input[type="email"]').value;
  const phone = document.querySelectorAll('input[type="text"]')[1].value;
  const message = document.querySelector("textarea").value;

  // SIMPLE VALIDATION
  if (
    username === "" ||
    email === "" ||
    phone === "" ||
    message === ""
  ) {
    alert("Please fill all fields");
    return;
  }

  // SUCCESS MESSAGE
  alert("Message Sent Successfully ✅");

  // CLEAR FORM
  form.reset();
});