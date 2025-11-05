// Form validation and submission handling
const inquiryForm = document.getElementById("inquiryForm")
const successModal = document.getElementById("successModal")

// Form field validation rules
const validationRules = {
  fullName: {
    required: true,
    pattern: /^[a-zA-Z\s]{2,}$/,
    message: "Please enter a valid name (minimum 2 characters)",
  },
  contact: {
    required: true,
    pattern: /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|^\+?[1-9]\d{1,14})$/,
    message: "Please enter a valid email or phone number",
  },
  serviceType: {
    required: true,
    message: "Please select a service",
  },
  preferredContact: {
    required: true,
    message: "Please select your preferred contact method",
  },
  message: {
    required: true,
    minLength: 10,
    message: "Please provide at least 10 characters describing your project",
  },
}

function validateField(fieldName, value) {
  const rules = validationRules[fieldName]
  if (!rules) return true

  if (rules.required && !value.trim()) {
    showError(fieldName, `${fieldName === "contact" ? "Email or phone" : fieldName} is required`)
    return false
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    showError(fieldName, rules.message)
    return false
  }

  if (rules.minLength && value.trim().length < rules.minLength) {
    showError(fieldName, rules.message)
    return false
  }

  clearError(fieldName)
  return true
}

// Show error message
function showError(fieldName, message) {
  const errorEl = document.getElementById(`${fieldName}Error`)
  if (errorEl) {
    errorEl.textContent = message
    errorEl.classList.add("show")
  }
}

// Clear error message
function clearError(fieldName) {
  const errorEl = document.getElementById(`${fieldName}Error`)
  if (errorEl) {
    errorEl.textContent = ""
    errorEl.classList.remove("show")
  }
}

inquiryForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Validate all fields
  const fullName = document.getElementById("fullName").value
  const contact = document.getElementById("contact").value
  const serviceType = document.getElementById("serviceType").value
  const preferredContact = document.getElementById("preferredContact").value
  const message = document.getElementById("message").value

  const isFullNameValid = validateField("fullName", fullName)
  const isContactValid = validateField("contact", contact)
  const isServiceTypeValid = validateField("serviceType", serviceType)
  const isPreferredContactValid = validateField("preferredContact", preferredContact)
  const isMessageValid = validateField("message", message)

  // If all fields are valid, show success modal
  if (isFullNameValid && isContactValid && isServiceTypeValid && isPreferredContactValid && isMessageValid) {
    console.log("[v0] Form submitted successfully with data:", {
      fullName,
      contact,
      serviceType,
      preferredContact,
      message,
    })

    showSuccessModal(fullName, message, preferredContact)

    // Reset form
    inquiryForm.reset()

    // Clear all errors
    Object.keys(validationRules).forEach((field) => clearError(field))
  }
})

document.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("blur", function () {
    validateField(this.name, this.value)
  })
})

// Show success modal
function showSuccessModal(fullName, message, preferredContact) {
  // Set user name in modal
  document.getElementById("modalUserName").textContent = fullName.split(" ")[0]

  const whatsappMessage = `Hi @uxdam_, I just submitted an inquiry. My name is ${fullName}. Here's what I need: ${message.substring(0, 100)}...`
  const whatsappLink = `https://wa.me/254712345678?text=${encodeURIComponent(whatsappMessage)}`

  // Set WhatsApp link
  document.getElementById("whatsappLink").href = whatsappLink

  successModal.classList.add("active")
  document.body.style.overflow = "hidden"
}

// Close modal
function closeModal() {
  successModal.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Close modal on backdrop click (handled in HTML via onclick)
document.getElementById("successModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal()
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && successModal.classList.contains("active")) {
    closeModal()
  }
})
