// ============================
// NAVIGATION & SECTION SWITCHING
// ============================

document.addEventListener("DOMContentLoaded", () => {
  // Initialize navigation
  initializeNavigation()
  initializeModals()
  initializeColorPicker()
  initializeMobileMenu()

  console.log("[Dashboard] Initialized successfully")

  // Initialize palette on load
  const savedPalette = getUserPreference("selectedPalette", "oceanic")
  const savedCustom = getUserPreference("customPalette", null)

  if (savedCustom) {
    generatePaletteFromColor(savedCustom.primary)
  }
})

function initializeNavigation() {
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const section = this.dataset.section
      switchSection(section)
    })
  })
}

function switchSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active")
  })

  // Remove active class from all nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
  })

  // Show selected section
  const targetSection = document.getElementById(sectionId)
  if (targetSection) {
    targetSection.classList.add("active")
  }

  // Add active class to clicked link
  const activeLink = document.querySelector(`[data-section="${sectionId}"]`)
  if (activeLink) {
    activeLink.classList.add("active")
  }

  // Update page title
  updatePageTitle(sectionId)

  // Close mobile sidebar
  closeMobileSidebar()

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function updatePageTitle(sectionId) {
  const titles = {
    home: "Dashboard Home",
    profile: "Profile & Company Management",
    projects: "Projects & Portfolio",
    orders: "Orders & Reviews",
    customization: "Website Customization",
    account: "Account Settings",
  }

  const pageTitle = document.getElementById("pageTitle")
  if (pageTitle) {
    pageTitle.textContent = titles[sectionId] || "Dashboard"
  }
}

// ============================
// MODAL FUNCTIONS
// ============================

function initializeModals() {
  const modals = document.querySelectorAll(".modal")

  modals.forEach((modal) => {
    // Close modal when clicking outside content
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal(modal.id)
      }
    })

    // Close modal on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal(modal.id)
      }
    })
  })
}

function showModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
}

// ============================
// MOBILE SIDEBAR - IMPROVED
// ============================

function initializeMobileMenu() {
  const hamburger = document.querySelector(".hamburger-toggle")
  const sidebar = document.getElementById("sidebar")

  if (hamburger) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation()
      toggleMobileSidebar()
    })
  }

  // Close sidebar when clicking a link
  if (sidebar) {
    const navLinks = sidebar.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          setTimeout(() => closeMobileSidebar(), 100)
        }
      })
    })
  }

  // Close sidebar when clicking outside
  document.addEventListener("click", (e) => {
    if (sidebar && window.innerWidth <= 768) {
      const isClickInSidebar = sidebar.contains(e.target)
      const isClickOnHamburger = hamburger && hamburger.contains(e.target)

      if (!isClickInSidebar && !isClickOnHamburger && sidebar.classList.contains("mobile-open")) {
        closeMobileSidebar()
      }
    }
  })
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById("sidebar")
  if (sidebar) {
    sidebar.classList.toggle("mobile-open")
  }
}

function closeMobileSidebar() {
  const sidebar = document.getElementById("sidebar")
  if (sidebar) {
    sidebar.classList.remove("mobile-open")
  }
}

// ============================
// RESPONSIVE BEHAVIOR
// ============================

window.addEventListener("resize", () => {
  const sidebar = document.getElementById("sidebar")

  if (window.innerWidth > 768) {
    if (sidebar && sidebar.classList.contains("mobile-open")) {
      sidebar.classList.remove("mobile-open")
    }
  }
})

// ============================
// COLOR PICKER
// ============================

function initializeColorPicker() {
  const colorOptions = document.querySelectorAll(".color-option")

  colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Find parent group
      const group = this.closest(".color-picker-group")
      if (group) {
        // Remove selected from siblings
        group.querySelectorAll(".color-option").forEach((opt) => {
          opt.classList.remove("selected")
        })
        // Add selected to clicked
        this.classList.add("selected")
      }

      // Generate palette from selected color
      const hexColor = this.style.backgroundColor
      generatePaletteFromColor(hexColor)
    })
  })
}

// ============================
// TABLE ACTIONS
// ============================

document.querySelectorAll(".action-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault()

    const action = this.className.match(/edit|delete|view/)[0]
    const row = this.closest("tr")
    const projectName = row ? row.querySelector("strong")?.textContent : "Item"

    handleTableAction(action, projectName)
  })
})

function handleTableAction(action, itemName) {
  const messages = {
    edit: `Editing: ${itemName}`,
    delete: `Delete: ${itemName}? This action cannot be undone.`,
    view: `Viewing: ${itemName}`,
  }

  if (action === "delete") {
    if (confirm(messages[action])) {
      console.log("[Action] Deleted:", itemName)
    }
  } else {
    console.log("[Action]", messages[action])
  }
}

// ============================
// FORM HANDLING
// ============================

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const email = formData.get("email")
    const phone = formData.get("phone")

    if (email && !validateEmail(email)) {
      showNotification("Please enter a valid email address.", "error")
      return
    }

    if (phone && !validatePhoneNumber(phone)) {
      showNotification("Please enter a valid phone number.", "error")
      return
    }

    console.log("[Form] Submitted:", Object.fromEntries(formData.entries()))
  })
})

// ============================
// INPUT VALIDATION
// ============================

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validatePhoneNumber(phone) {
  const re = /^[\d\s\-+()]+$/
  return re.test(phone)
}

// ============================
// UTILITY FUNCTIONS
// ============================

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// ============================
// SCROLL TO TOP ON SECTION CHANGE
// ============================

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// ============================
// LOCAL STORAGE FOR PREFERENCES
// ============================

function saveUserPreference(key, value) {
  try {
    localStorage.setItem(`dashboard_${key}`, JSON.stringify(value))
  } catch (e) {
    console.log("[LocalStorage] Error saving preference:", e)
  }
}

function getUserPreference(key, defaultValue) {
  try {
    const value = localStorage.getItem(`dashboard_${key}`)
    return value ? JSON.parse(value) : defaultValue
  } catch (e) {
    console.log("[LocalStorage] Error getting preference:", e)
    return defaultValue
  }
}

// ============================
// NOTIFICATION SYSTEM
// ============================

function showNotification(message, type = "info", duration = 3000) {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: var(--${type === "success" ? "success" : type === "error" ? "danger" : "info"});
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out"
    setTimeout(() => notification.remove(), 300)
  }, duration)
}

// ============================
// PERFORMANCE MONITORING
// ============================

document.addEventListener("DOMContentLoaded", () => {
  const loadTime = performance.now()
  console.log(`[Dashboard] Load time: ${loadTime.toFixed(2)}ms`)
})

// ============================
// WHATSAPP AND PALETTE FUNCTIONS
// ============================

function openWhatsApp(phoneNumber) {
  const message = "Hi! I'm interested in your services."
  const encodedMessage = encodeURIComponent(message)
  const cleanPhone = phoneNumber.replace(/\D/g, "")
  window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage}`, "_blank")
}

function selectPalette(element, paletteName) {
  document.querySelectorAll(".palette-card").forEach((card) => {
    card.classList.remove("selected")
  })
  element.classList.add("selected")
  saveUserPreference("selectedPalette", paletteName)
}

function generatePaletteFromColor(hexColor) {
  const colorInput = document.getElementById("colorValue")
  colorInput.textContent = hexColor

  // Simple color generation logic (store in localStorage, send to backend in production)
  const primary = hexColor
  const secondary = adjustBrightness(hexColor, -20)
  const light = adjustBrightness(hexColor, 40)
  const dark = adjustBrightness(hexColor, -40)

  document.getElementById("gen-primary").style.backgroundColor = primary
  document.getElementById("gen-secondary").style.backgroundColor = secondary
  document.getElementById("gen-light").style.backgroundColor = light
  document.getElementById("gen-dark").style.backgroundColor = dark

  saveUserPreference("customPalette", { primary, secondary, light, dark })
}

function adjustBrightness(hex, percent) {
  const num = Number.parseInt(hex.replace("#", ""), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = ((num >> 8) & 0x00ff) + amt
  const B = (num & 0x0000ff) + amt
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  )
}

// ============================
// WHATSAPP ORDER FILTERING AND SUBMISSION
// ============================

document.addEventListener("DOMContentLoaded", () => {
  const filterTabs = document.querySelectorAll(".filter-tab")

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", function (event) {
      const type = this.dataset.filter
      filterOrders(type)
    })
  })

  document.getElementById("whatsappOrderModal").addEventListener("submit", (event) => {
    event.preventDefault()
    submitWhatsAppOrder()
  })
})

function filterOrders(type) {
  const emailSection = document.querySelector(".email-orders-section")
  const whatsappSection = document.querySelector(".whatsapp-orders-section")
  const filterTabs = document.querySelectorAll(".filter-tab")

  filterTabs.forEach((tab) => tab.classList.remove("active"))
  event.target.classList.add("active")

  if (type === "all") {
    emailSection.classList.remove("hidden")
    whatsappSection.classList.remove("hidden")
  } else if (type === "email") {
    emailSection.classList.remove("hidden")
    whatsappSection.classList.add("hidden")
  } else if (type === "whatsapp") {
    emailSection.classList.add("hidden")
    whatsappSection.classList.remove("hidden")
  }
}

function submitWhatsAppOrder() {
  const form = document.querySelector("#whatsappOrderModal form")
  const name = form.querySelector('input[type="text"]').value
  const phone = form.querySelector('input[type="tel"]').value
  const service = form.querySelector("select").value
  const description = form.querySelector("textarea").value

  if (name && phone && service) {
    const message = `Hi! I'd like to place an order for ${service}. My name is ${name}.${description ? " Details: " + description : ""}`
    const encodedMessage = encodeURIComponent(message)
    const cleanPhone = phone.replace(/\D/g, "")

    window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage}`, "_blank")
    closeModal("whatsappOrderModal")
    form.reset()
  } else {
    alert("Please fill in all required fields.")
  }
}
