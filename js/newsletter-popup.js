// Newsletter Popup Modal Script
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("newsletterModal")
  const closeBtn = document.getElementById("closeModal")
  const form = document.getElementById("newsletterForm")
  const POPUP_DELAY = 300 // 3 seconds delay - adjust as needed
  const POPUP_SHOWN_KEY = "newsletter_popup_shown"

  // Show popup after delay if not shown before
  function showPopup() {
    // Check if popup was already shown in this session
    if (!sessionStorage.getItem(POPUP_SHOWN_KEY)) {
      setTimeout(() => {
        modal.classList.add("active")
        sessionStorage.setItem(POPUP_SHOWN_KEY, "true")
      }, POPUP_DELAY)
    }
  }

  // Close popup
  function closePopup() {
    modal.classList.remove("active")
  }

  // Close popup when clicking close button
  closeBtn.addEventListener("click", closePopup)

  // Close popup when clicking outside modal content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closePopup()
    }
  })

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault()
    const email = this.querySelector('input[type="email"]').value

    // Here you can send the email to your backend
    console.log("Newsletter signup:", email)

    // Show success and close
    alert("Thanks for signing up! We'll reach out to you soon.")
    closePopup()
    form.reset()
  })

  // Initialize popup on page load
  showPopup()
})
