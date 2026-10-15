// ============================================
// 1. MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("open");
    menuToggle.classList.toggle("open");

    const isOpen = menuToggle.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close the mobile menu when a link is clicked
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// ============================================
// 2. HIGHLIGHT ACTIVE NAV LINK WHILE SCROLLING
// ============================================
const sections = document.querySelectorAll("section[id]");

function highlightActiveLink() {
    let currentSection = "";

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(function (link) {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", highlightActiveLink);

// ============================================
// 3. BACK TO TOP BUTTON
// ============================================
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ============================================
// 4. FOOTER: AUTOMATIC CURRENT YEAR
// ============================================
const yearSpan = document.getElementById("current-year");
yearSpan.textContent = new Date().getFullYear();

// ============================================
// 5. SCROLL REVEAL ANIMATION (subtle fade-in)
// ============================================
const revealElements = document.querySelectorAll(
    ".skill-card, .project-card, .about-content, .contact-content"
);

revealElements.forEach(function (el) {
    el.classList.add("reveal");
});

// Add the reveal CSS dynamically so the content stays visible
// if JavaScript is turned off
const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(function (el) {
    revealObserver.observe(el);
});