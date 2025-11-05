const modal = document.getElementById("reviewModal")
const submitReviewBtn = document.getElementById("submitReviewBtn")
const closeModal = document.getElementById("closeModal")
const cancelBtn = document.getElementById("cancelBtn")
const reviewForm = document.getElementById("reviewForm")
const loadMoreBtn = document.getElementById("loadMoreBtn")

// Set placeholders on form inputs
window.addEventListener("load", () => {
  document.getElementById("name").placeholder = "John Doe"
  document.getElementById("email").placeholder = "john@example.com"
  document.getElementById("title").placeholder = "e.g., CEO, Manager, Designer"
  document.getElementById("company").placeholder = "Your Company Name"
  document.getElementById("review").placeholder =
    "Share your experience working with @uxdam_. Tell us what made our service stand out!"
})

// Open modal
submitReviewBtn.addEventListener("click", () => {
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
})

// Close modal
function closeReviewModal() {
  modal.classList.remove("active")
  document.body.style.overflow = "auto"
  reviewForm.reset()
}

closeModal.addEventListener("click", closeReviewModal)
cancelBtn.addEventListener("click", closeReviewModal)

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeReviewModal()
  }
})

// Form submission
reviewForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    title: document.getElementById("title").value,
    company: document.getElementById("company").value,
    rating: document.querySelector('input[name="rating"]:checked').value,
    review: document.getElementById("review").value,
    date: new Date().toLocaleDateString(),
  }

  console.log("Review submitted:", formData)
  alert("Thank you for your review! We appreciate your feedback.")
  closeReviewModal()
})

loadMoreBtn.addEventListener("click", () => {
  loadMoreBtn.textContent = "Loading..."
  loadMoreBtn.disabled = true

  // Simulate loading delay
  setTimeout(() => {
    const reviewsGrid = document.querySelector(".reviews-grid")

    // Additional reviews to load
    const additionalReviews = [
      {
        stars: 5,
        text: "Incredible experience! @uxdam_ took our vision and made it better than we imagined. Professional, creative, and detail-oriented. We couldn't ask for more!",
        initials: "JP",
        name: "Jennifer Park",
        title: "Founder, InnovateTech",
      },
      {
        stars: 5,
        text: "Outstanding service from start to finish. The team was responsive, collaborative, and delivered results that exceeded expectations. Highly recommended for any creative project!",
        initials: "TS",
        name: "Thomas Smith",
        title: "Director, Marketing Solutions",
      },
      {
        stars: 5,
        text: "Best decision we made for our brand. @uxdam_ provided comprehensive design solutions that transformed how our clients perceive us. Results speak for themselves!",
        initials: "MB",
        name: "Maria Baez",
        title: "Founder, Fashion Forward Co",
      },
    ]

    // Create and add new review cards
    additionalReviews.forEach((review) => {
      const reviewCard = document.createElement("div")
      reviewCard.className = "review-card"
      reviewCard.style.opacity = "0"
      reviewCard.style.animation = "fadeInUp 0.6s ease forwards"

      let starsHTML = ""
      for (let i = 0; i < review.stars; i++) {
        starsHTML += '<span class="star">★</span>'
      }

      reviewCard.innerHTML = `
        <div class="review-stars">
          ${starsHTML}
        </div>
        <p class="review-text">"${review.text}"</p>
        <div class="review-author">
          <div class="author-avatar">${review.initials}</div>
          <div class="author-info">
            <h4>${review.name}</h4>
            <span class="author-title">${review.title}</span>
          </div>
        </div>
      `

      reviewsGrid.appendChild(reviewCard)
    })

    // Reset button
    loadMoreBtn.textContent = "Load More Reviews"
    loadMoreBtn.disabled = false

    // Show success feedback
    console.log("Loaded 3 more reviews")
  }, 800)
})

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
