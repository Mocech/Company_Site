// WhatsApp interaction functions
function openWhatsAppChat() {
  const phone = "+254712345678"
  const cleanPhone = phone.replace(/\D/g, "")
  window.open(`https://wa.me/${cleanPhone}`, "_blank")
}

function sendFollowupMessage() {
  const phone = "+254712345678"
  const message =
    "Hi John! I hope you are doing well. I wanted to follow up on your videography order. Do you have any updates or additional requirements for your project? Looking forward to hearing from you!"
  const encodedMessage = encodeURIComponent(message)
  const cleanPhone = phone.replace(/\D/g, "")
  window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage}`, "_blank")
}

function sendEmailMessage() {
  const email = "sarah@email.com"
  const subject = "Update on Your Creative Project"
  const body =
    "Hi Sarah,\n\nThank you for reaching out! I wanted to provide you with an update on your videography project.\n\nPlease let me know if you have any questions or need any additional information.\n\nBest regards"
  const encodedSubject = encodeURIComponent(subject)
  const encodedBody = encodeURIComponent(body)
  window.location.href = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`
}

function archiveOrder() {
  const statusSelect = document.querySelector(".form-select")
  if (statusSelect) {
    statusSelect.value = "Cancelled"
    alert("Order has been archived!")
  }
}

function markOrderDone() {
  const statusSelect = document.getElementById("statusSelect")
  if (statusSelect) {
    statusSelect.value = "Completed"
    alert("Order marked as completed!")
  }
}

// UI interactions
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scroll behavior to page
  document.documentElement.style.scrollBehavior = "smooth"

  // Handle form interactions
  const formSelects = document.querySelectorAll(".form-select")
  formSelects.forEach((select) => {
    select.addEventListener("change", function () {
      console.log("Status updated to:", this.value)
    })
  })

  // Handle button clicks
  const actionButtons = document.querySelectorAll(".btn")
  actionButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add ripple effect
      const rect = this.getBoundingClientRect()
      const ripple = document.createElement("span")
      ripple.style.position = "absolute"
      ripple.style.borderRadius = "50%"
      ripple.style.background = "rgba(255, 255, 255, 0.5)"
      ripple.style.width = ripple.style.height = "20px"
      ripple.style.left = e.clientX - rect.left - 10 + "px"
      ripple.style.top = e.clientY - rect.top - 10 + "px"
      ripple.style.pointerEvents = "none"
      ripple.style.animation = "ripple 0.6s ease-out"
      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)
    })
  })
})

// Ripple animation
const style = document.createElement("style")
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)
