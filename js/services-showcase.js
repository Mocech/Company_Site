// Service Data with details
const servicesData = [
  {
    name: "Logo Design",
    icon: "🎨",
    description: "Create a memorable brand identity with a custom logo that stands out.",
    features: ["Unlimited Revisions", "Vector Format", "Brand Guidelines"],
  },
  {
    name: "Video Editing",
    icon: "🎬",
    description: "Professional video editing that brings your stories to life.",
    features: ["Color Grading", "Motion Graphics", "Sound Design"],
  },
  {
    name: "Event Coverage",
    icon: "📸",
    description: "Capture every moment of your special event with professional photography.",
    features: ["HD Footage", "Fast Delivery", "Photo Gallery"],
  },
  {
    name: "Flyers & Posters",
    icon: "📄",
    description: "Eye-catching print designs that grab attention and deliver your message.",
    features: ["Print-Ready", "Unlimited Concepts", "Free Revisions"],
  },
  {
    name: "Branding",
    icon: "✨",
    description: "Build a complete brand identity from logo to brand guidelines.",
    features: ["Complete Package", "Consistency", "Professional"],
  },
  {
    name: "UI/UX Design",
    icon: "🖥️",
    description: "Design beautiful, user-friendly interfaces that users love.",
    features: ["User Research", "Prototypes", "Design System"],
  },
  {
    name: "Web Design",
    icon: "🌐",
    description: "Modern, responsive websites that convert visitors into customers.",
    features: ["Mobile-Friendly", "SEO Ready", "Fast Loading"],
  },
  {
    name: "Graphic Design",
    icon: "🎭",
    description: "Creative graphic designs for all your visual communication needs.",
    features: ["Custom Artwork", "Brand Aligned", "Multiple Formats"],
  },
  {
    name: "Animations & Effects",
    icon: "⚡",
    description: "Stunning animations and visual effects that captivate your audience.",
    features: ["Custom Animation", "High Quality", "Fast Render"],
  },
  {
    name: "Social Media Content",
    icon: "📱",
    description: "Engaging content designed to boost your social media presence.",
    features: ["Platform Optimized", "Trending Designs", "Consistent Branding"],
  },
  {
    name: "Photography",
    icon: "📷",
    description: "Professional photography that captures the essence of your brand.",
    features: ["High Resolution", "Edited Shots", "Digital Copies"],
  },
  {
    name: "Other Services",
    icon: "🚀",
    description: "Have a unique project? Let's talk about custom solutions.",
    features: ["Flexible", "Creative", "Tailored Solutions"],
  },
]

// Render service cards
function renderServiceCards() {
  const servicesGrid = document.getElementById("servicesGrid")

  servicesData.forEach((service, index) => {
    const serviceCard = document.createElement("div")
    serviceCard.className = "service-card"
    serviceCard.innerHTML = `
      <div class="service-card-header">
        <div class="service-icon">${service.icon}</div>
        <h3 class="service-name">${service.name}</h3>
      </div>
      <p class="service-description">${service.description}</p>
      <div class="service-features">
        ${service.features
          .map(
            (feature) => `
          <div class="service-feature">
            <div class="feature-check">✓</div>
            <span>${feature}</span>
          </div>
        `,
          )
          .join("")}
      </div>
      <button class="service-cta" data-service="${service.name}">Get Started</button>
    `

    servicesGrid.appendChild(serviceCard)
  })

  // Add click handlers to CTA buttons
  document.querySelectorAll(".service-cta").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const serviceName = this.dataset.service

      // Scroll to form
      document.getElementById("inquiryForm").scrollIntoView({ behavior: "smooth" })

      // Set the service type
      const selectElement = document.getElementById("serviceType")
      selectElement.value = serviceName

      // Trigger change event for Choices.js
      selectElement.dispatchEvent(new Event("change", { bubbles: true }))

      // Highlight the form
      setTimeout(() => {
        document.querySelector(".project-details-section").style.animation = "pulse-highlight 0.6s ease"
      }, 500)
    })
  })
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", renderServiceCards)

// Add pulse animation to highlight the form section
const style = document.createElement("style")
style.textContent = `
  @keyframes pulse-highlight {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(255, 160, 0, 0.4);
    }
    50% {
      box-shadow: 0 0 0 15px rgba(255, 160, 0, 0);
    }
  }
`
document.head.appendChild(style)
