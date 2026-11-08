// MOBILE NAVIGATION

const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

menu.addEventListener("click", () => {
    nav.classList.toggle("active");
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});


// SCROLL REVEAL

const elements = document.querySelectorAll(
    ".section-heading, .about-content, .expertise-card, .project-item, .social-links, .contact-inner"
);

elements.forEach(element => {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

elements.forEach(element => observer.observe(element));


// MAGNETIC BUTTONS

document.querySelectorAll(".primary-btn, .header-btn").forEach(button => {

    button.addEventListener("mousemove", (e) => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "";
    });

});


// HERO PARALLAX

const visual = document.querySelector(".hero-visual");

window.addEventListener("mousemove", (e) => {

    if (window.innerWidth < 1000) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;

    visual.style.transform = `translate(${x}px, ${y}px)`;

});


// ESCAPE KEY

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        nav.classList.remove("active");
    }
});

// ===== PREMIUM UPGRADE =====

const header = document.querySelector("header");
const progress = document.getElementById("progress");
const toTop = document.getElementById("toTop");
const heroContent = document.querySelector(".hero-content");
const scrollHint = document.querySelector(".scroll-indicator");
const root = document.documentElement;
let ticking = false;

function onScroll() {
    const y = window.scrollY;
    const max = root.scrollHeight - window.innerHeight;

    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    header.classList.toggle("scrolled", y > 40);
    toTop.classList.toggle("show", y > 600);
    scrollHint.classList.toggle("hide", y > 80);

    // parallax: hero text drifts slower, glows drift opposite
    if (y < window.innerHeight) {
        heroContent.style.setProperty("--hy", `${y * 0.18}px`);
        root.style.setProperty("--gy", `${y * -0.15}px`);
    }
    ticking = false;
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
    }
}, { passive: true });
onScroll();

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Staggered reveal (delay is cleared afterwards so hover stays snappy)
document.querySelectorAll(".expertise-grid, .project-list").forEach(group => {
    group.querySelectorAll(".reveal").forEach((el, i) => {
        el.style.transitionDelay = `${(i % 3) * 0.12}s`;
        setTimeout(() => { el.style.transitionDelay = ""; }, 4000);
    });
});

// Cursor spotlight on cards
document.querySelectorAll(".expertise-card, .project-item").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
});

// Highlight the current section in the navbar
const navLinks = [...nav.querySelectorAll("a")];
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(a =>
                a.classList.toggle("current", a.getAttribute("href") === `#${entry.target.id}`)
            );
        }
    });
}, { rootMargin: "-45% 0px -50% 0px" });

navLinks.forEach(a => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) sectionObserver.observe(target);
});
