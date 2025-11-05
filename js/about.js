// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  })
})

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe all service cards and stat cards for animation
document.querySelectorAll(".service-card, .stat-card, .testimonial-card").forEach((el) => {
  observer.observe(el)
})

// Update active nav link based on scroll position
window.addEventListener("scroll", () => {
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.classList.remove("active")
  })

  // Set the current page link as active
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const activeLink = document.querySelector(`.nav-link[href*="${currentPage}"]`)
  if (activeLink) {
    activeLink.classList.add("active")
  }
})

// Add animation styles dynamically
const style = document.createElement("style")
style.textContent = `
    .service-card, .stat-card, .testimonial-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`
document.head.appendChild(style)
