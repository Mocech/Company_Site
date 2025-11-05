document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")
  const formMessage = document.getElementById("formMessage")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const fullName = document.getElementById("fullName").value.trim()
      const email = document.getElementById("email").value.trim()
      const message = document.getElementById("message").value.trim()

      // Basic validation
      if (!fullName || !email || !message) {
        showMessage("Please fill in all fields.", "error")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        showMessage("Please enter a valid email address.", "error")
        return
      }

      // Simulate form submission
      console.log("Form submitted:", { fullName, email, message })

      // Show success message
      showMessage("Thanks for reaching out! You'll get a response soon via WhatsApp or email.", "success")

      // Reset form
      contactForm.reset()

      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = "none"
      }, 5000)
    })
  }

  function showMessage(text, type) {
    formMessage.textContent = text
    formMessage.className = `form-message ${type}`
  }
})
