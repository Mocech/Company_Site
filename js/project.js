document.addEventListener("DOMContentLoaded", () => {
  setupGallerySlider()
  setupLikeButton()
  setupCommentForm()
  setupMobileMenu()
  setupShareButtons()
})

// Gallery slider functionality
function setupGallerySlider() {
  const images = document.querySelectorAll(".gallery-image")
  const thumbnails = document.querySelectorAll(".thumbnail")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")

  let currentIndex = 0

  function showImage(index) {
    images.forEach((img) => img.classList.remove("active"))
    thumbnails.forEach((thumb) => thumb.classList.remove("active"))

    images[index].classList.add("active")
    thumbnails[index].classList.add("active")
    currentIndex = index
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length
    showImage(currentIndex)
  })

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length
    showImage(currentIndex)
  })

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => showImage(index))
  })
}

// Like button functionality
function setupLikeButton() {
  const likeBtn = document.getElementById("likeBtn")
  const likeCount = document.getElementById("likeCount")
  let isLiked = false
  let currentLikes = Number.parseInt(likeCount.textContent)

  likeBtn.addEventListener("click", () => {
    isLiked = !isLiked
    currentLikes += isLiked ? 1 : -1
    likeCount.textContent = currentLikes
    likeBtn.classList.toggle("liked")
  })
}

// Comment form functionality
function setupCommentForm() {
  const form = document.getElementById("commentForm")
  const commentsList = document.getElementById("commentsList")

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const inputs = form.querySelectorAll("input, textarea")
    const name = inputs[0].value
    const email = inputs[1].value
    const comment = inputs[2].value

    if (name && comment) {
      const newComment = document.createElement("div")
      newComment.className = "comment-item"
      const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })

      newComment.innerHTML = `
        <p class="comment-author"><strong>${name}</strong> • ${date}</p>
        <p class="comment-text">${comment}</p>
      `

      commentsList.insertBefore(newComment, commentsList.firstChild)

      // Show success message
      const successMsg = document.createElement("div")
      successMsg.style.cssText =
        "background: #4caf50; color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center;"
      successMsg.textContent = "Thank you! Your comment has been posted."
      form.parentElement.insertBefore(successMsg, form.nextSibling)

      setTimeout(() => successMsg.remove(), 3000)

      form.reset()
    }
  })
}

// Mobile menu functionality
function setupMobileMenu() {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
      })
    })
  }
}

// Share buttons functionality
function setupShareButtons() {
  const shareUrl = window.location.href
  const projectTitle = document.getElementById("projectTitle").textContent

  document.querySelector(".social-twitter").addEventListener("click", (e) => {
    e.preventDefault()
    window.open(`https://twitter.com/intent/tweet?text=${projectTitle}&url=${shareUrl}`, "_blank")
  })

  document.querySelector(".social-instagram").addEventListener("click", (e) => {
    e.preventDefault()
    alert("Share on Instagram: Copy the link and share it manually!")
  })

  document.querySelector(".social-linkedin").addEventListener("click", (e) => {
    e.preventDefault()
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, "_blank")
  })

  document.getElementById("copyLink").addEventListener("click", () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      const btn = document.getElementById("copyLink")
      const originalText = btn.textContent
      btn.textContent = "✓ Copied!"
      setTimeout(() => {
        btn.textContent = originalText
      }, 2000)
    })
  })
}
