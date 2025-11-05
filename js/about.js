// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Close menu when a link is clicked
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

// Active navigation link on scroll
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section[id]")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active")
    }
  })
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe cards for fade-in animation on about page
document
  .querySelectorAll(
    ".service-card, .testimonial-card, .value-card, .stat-box, .education-item, .tool-card, .service-highlight, .testimonial-item, .contact-item, .info-card-small, .story-card, .stat-item",
  )
  .forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#") {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }
  })
})

document.querySelectorAll(".tool-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    const tooltip = this.getAttribute("data-tooltip")
    if (tooltip) {
      this.style.setProperty("--tooltip-visible", "1")
    }
  })

  item.addEventListener("mouseleave", function () {
    this.style.setProperty("--tooltip-visible", "0")
  })
})

document.querySelectorAll(".tool-item-image").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    const tooltip = this.getAttribute("data-tooltip")
    if (tooltip) {
      console.log("[v0] Tooltip:", tooltip)
    }
  })
})

// Function to render timeline items from backend data
function renderTimelineItems(data, containerId) {
  const container = document.getElementById(containerId)
  if (!container || !data) return

  container.innerHTML = data
    .map(
      (item) => `
    <div class="timeline-item">
      <div class="timeline-marker">
        <div class="timeline-dot"></div>
      </div>
      <div class="timeline-content-wrapper">
        <div class="timeline-year">${item.year}</div>
        <div class="timeline-content">
          <h3><i class="fas ${item.icon}"></i> ${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </div>
    </div>
  `,
    )
    .join("")
}

// Function to render skills from backend data
function renderSkills(skillsData, containerId) {
  const container = document.getElementById(containerId)
  if (!container || !skillsData) return

  container.innerHTML = skillsData
    .map(
      (skill) => `
    <div class="tool-item-image" data-tooltip="${skill.name}">
      <img src="${skill.image_url}" alt="${skill.name}">
    </div>
  `,
    )
    .join("")

  // Re-attach event listeners after rendering
  container.querySelectorAll(".tool-item-image").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      console.log("[v0] Hovering over:", this.getAttribute("data-tooltip"))
    })
  })
}

// Example usage with mock backend data (replace with actual fetch call)
document.addEventListener("DOMContentLoaded", () => {
  // Uncomment to test with backend data:
  // const journeyData = [...]; // fetch from Django API
  // const experienceData = [...]; // fetch from Django API
  // const skillsData = [...]; // fetch from Django API
  // renderTimelineItems(journeyData, 'journeyTimeline')
  // renderTimelineItems(experienceData, 'experienceTimeline')
  // renderSkills(skillsData, 'skillsShowcase')

  // This ensures any future form on inquiry.html integrates smoothly with Django
  const inquiryForm = document.getElementById("inquiryForm")
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Collect form data
      const formData = new FormData(inquiryForm)

      // Submit to Django backend endpoint
      fetch("/api/inquiry/", {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]")?.value || "",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Inquiry submitted successfully!")
            inquiryForm.reset()
          } else {
            alert("Error submitting inquiry. Please try again.")
          }
        })
        .catch((error) => {
          console.error("[v0] Error:", error)
          alert("Error submitting inquiry.")
        })
    })
  }

  // Track inquiry link clicks for analytics
  document.querySelectorAll('a[href="inquiry.html"]').forEach((link) => {
    link.addEventListener("click", () => {
      console.log("[v0] User navigating to inquiry form")
    })
  })
})
