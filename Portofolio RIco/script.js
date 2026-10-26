
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

// Buka dan tutup menu di HP
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Tutup menu setelah memilih navigasi
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Tahun footer otomatis
document.getElementById("year").textContent =
  new Date().getFullYear();

// Animasi masuk ketika bagian website terlihat
const sections = document.querySelectorAll(
  ".about-grid, .skill-card, .project-card"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  sections.forEach((section) => observer.observe(section));
}

/* LOADING SCREEN - FIX */
(() => {
  const loader = document.getElementById("loader");

  if (!loader) return;

  let sudahSelesai = false;

  function hideLoader() {
    if (sudahSelesai) return;
    sudahSelesai = true;

    setTimeout(() => {
      loader.classList.add("loaded");

      setTimeout(() => {
        loader.remove();
      }, 600);
    }, 4000);
  }

  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader, {
      once: true
    });
  }

  setTimeout(hideLoader, 10000);
})();

/* SKILL PROGRESS ANIMATION */
const skillBars = document.querySelectorAll(".skill-progress");

if ("IntersectionObserver" in window) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const container = entry.target;
      const fill = container.querySelector(".progress-fill");
      const value = container.querySelector(".progress-value");
      const progress = Math.max(
        0,
        Math.min(100, Number(container.dataset.progress) || 0)
      );

      fill.style.width = progress + "%";
      value.textContent = progress + "%";
      skillObserver.unobserve(container);
    });
  }, { threshold: 0.3 });

  skillBars.forEach((bar) => skillObserver.observe(bar));
} else {
  skillBars.forEach((container) => {
    const progress = Math.max(
      0,
      Math.min(100, Number(container.dataset.progress) || 0)
    );
    container.querySelector(".progress-fill").style.width = progress + "%";
    container.querySelector(".progress-value").textContent = progress + "%";
  });
}

/* ===== TYPING EFFECT ===== */
(() => {
  const typingElement = document.getElementById("typing-text");

  if (!typingElement) return;

  const words = [
    "Web Developer",
    "Frontend Developer",
    "Digital Creator"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (!deleting) {
      charIndex++;
      typingElement.textContent = currentWord.slice(0, charIndex);

      if (charIndex === currentWord.length) {
        deleting = true;
        setTimeout(typeEffect, 1300);
        return;
      }
    } else {
      charIndex--;
      typingElement.textContent = currentWord.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeEffect, deleting ? 45 : 90);
  }

  typeEffect();
})();

/* ===== ACTIVE NAVBAR ON SCROLL ===== */
(() => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(
    "section[id]"
  );

  if (!navLinks.length || !sections.length) return;

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 150;

    let currentSection = sections[0].id;

    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const target = link.getAttribute("href");
      const isActive = target === `#${currentSection}`;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav, {
    passive: true
  });

  window.addEventListener("resize", updateActiveNav);

  updateActiveNav();
})();

/* ===== PURPLE CURSOR GLOW ===== */
(() => {
  const glow = document.getElementById("cursorGlow");

  if (!glow) return;

  // Aktif hanya pada perangkat dengan kursor
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
    return;
  }

  document.addEventListener("mousemove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
    glow.classList.add("visible");
  });

  document.addEventListener("mouseleave", () => {
    glow.classList.remove("visible");
  });

  document.addEventListener("mouseenter", () => {
    glow.classList.add("visible");
  });
})();
