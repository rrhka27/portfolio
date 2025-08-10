// Hamburger Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const icon = menuToggle.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.classList.replace("fa-bars", "fa-times");
  } else {
    icon.classList.replace("fa-times", "fa-bars");
  }
});

// Close menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const icon = menuToggle.querySelector("i");
    icon.classList.replace("fa-times", "fa-bars");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 100) {
    nav.style.background = "rgba(10, 10, 10, 0.95)";
  } else {
    nav.style.background = "rgba(10, 10, 10, 0.8)";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards
document.querySelectorAll(".glass-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// Contact form submission
document
  .querySelector(".contact-form form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!name || !email || !subject || !message) {
      alert("Mohon lengkapi semua field!");
      return;
    }

    alert(
      "Terima kasih! Pesan Anda telah terkirim. Saya akan merespon segera."
    );
    this.reset();
  });

// Add typing effect to hero title
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = "";
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-text h1");
  const originalText = heroTitle.textContent;
  typeWriter(heroTitle, originalText, 80);
});

// Add particle effect on mouse move
document.addEventListener("mousemove", (e) => {
  const cursor = document.createElement("div");
  cursor.style.cssText = `
          position: fixed;
          top: ${e.clientY}px;
          left: ${e.clientX}px;
          width: 4px;
          height: 4px;
          background: var(--primary-color);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.8;
          animation: cursorFade 1s ease-out forwards;
        `;
  document.body.appendChild(cursor);
  setTimeout(() => {
    cursor.remove();
  }, 1000);
});

// Add cursor fade animation
const style = document.createElement("style");
style.textContent = `
        @keyframes cursorFade {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }
      `;
document.head.appendChild(style);

// Skills animation on scroll
const skillItems = document.querySelectorAll(".skill-item");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0) scale(1)";
        }, index * 100);
      }
    });
  },
  { threshold: 0.3 }
);

skillItems.forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(20px) scale(0.8)";
  item.style.transition = "all 0.5s ease";
  skillObserver.observe(item);
});
