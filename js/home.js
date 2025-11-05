const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease forwards"
    }
  })
}, observerOptions)

// Observe service items, project cards, and process cards
document.querySelectorAll(".service-item, .project-card, .process-card").forEach((el) => {
  el.style.opacity = "0"
  observer.observe(el)
})

// Add fade-in animation
const style = document.createElement("style")
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`
document.head.appendChild(style)

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  })
})

// Portfolio download button handler
const cvDownloadBtn = document.querySelector(".btn-download")
if (cvDownloadBtn) {
  cvDownloadBtn.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("Portfolio download initiated - add your PDF file path here")
  })
}

const orderPopupModal = document.getElementById("orderPopupModal")
const closeOrderPopup = document.getElementById("closeOrderPopup")
const placeOrderBtn = document.getElementById("placeOrderBtn")

// Show popup on page load after 2 seconds
window.addEventListener("load", () => {
  setTimeout(() => {
    orderPopupModal.classList.add("active")
  }, 2000)
})

// Close popup when clicking X button
closeOrderPopup.addEventListener("click", () => {
  orderPopupModal.classList.remove("active")
})

// Close popup when clicking outside the modal
orderPopupModal.addEventListener("click", (e) => {
  if (e.target === orderPopupModal) {
    orderPopupModal.classList.remove("active")
  }
})

// Handle place order button
placeOrderBtn.addEventListener("click", () => {
  orderPopupModal.classList.remove("active")
  // Redirect to contact page or order page
  window.location.href = "contact.html"
})
