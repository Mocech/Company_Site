document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners()
  initializeLikes()
  setupLoadMore()
})

// Setup all event listeners
function setupEventListeners() {
  const searchInput = document.getElementById("searchInput")
  const filterBtns = document.querySelectorAll(".filter-btn")

  if (searchInput) {
    searchInput.addEventListener("input", handleSearch)
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", handleFilter)
  })

  // Mobile hamburger menu
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }
}

// Initialize like buttons
function initializeLikes() {
  const likeButtons = document.querySelectorAll(".like-btn-overlay")

  likeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()

      const card = btn.closest(".project-card")
      const counter = card.querySelector(".like-counter")
      let likes = Number.parseInt(counter.textContent)

      // Toggle like state
      if (btn.classList.contains("liked")) {
        btn.classList.remove("liked")
        likes = Math.max(0, likes - 1)
      } else {
        btn.classList.add("liked")
        likes += 1
      }

      counter.textContent = likes
    })
  })
}

// Handle search functionality
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase()
  const activeFilter = document.querySelector(".filter-btn.active").dataset.filter
  const cards = document.querySelectorAll(".project-card")

  let visibleCount = 0

  cards.forEach((card) => {
    const title = card.querySelector(".card-title").textContent.toLowerCase()
    const category = card.dataset.category
    const keywords = card.dataset.keywords.toLowerCase()
    const tags = Array.from(card.querySelectorAll(".tag")).map((tag) => tag.textContent.toLowerCase())

    // Check if matches search term
    const matchesSearch =
      !searchTerm ||
      title.includes(searchTerm) ||
      keywords.includes(searchTerm) ||
      tags.some((tag) => tag.includes(searchTerm))

    // Check if matches active filter
    const matchesFilter = activeFilter === "all" || category === activeFilter

    const shouldShow = matchesSearch && matchesFilter

    card.style.display = shouldShow ? "flex" : "none"
    card.style.flexDirection = "column"

    if (shouldShow) {
      visibleCount++
    }
  })

  updateLoadMoreVisibility()
  showNoResults(visibleCount === 0)
}

// Handle filter functionality
function handleFilter(e) {
  const filterValue = e.target.dataset.filter

  // Update active filter button
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  e.target.classList.add("active")

  // Re-run search with new filter
  handleSearch({ target: { value: document.getElementById("searchInput").value } })
}

// Setup load more functionality
function setupLoadMore() {
  const grid = document.getElementById("projectsGrid")
  const loadMoreBtn = document.getElementById("loadMoreBtn")
  const container = document.getElementById("loadMoreContainer")
  let itemsToShow = 9

  // Hide items beyond initial display
  const allCards = grid.querySelectorAll(".project-card")
  allCards.forEach((card, index) => {
    if (index >= itemsToShow) {
      card.style.display = "none"
    }
  })

  // Check if load more button is needed
  updateLoadMoreVisibility()

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      itemsToShow += 6
      allCards.forEach((card, index) => {
        if (index < itemsToShow && card.style.display !== "none") {
          card.style.display = "flex"
          card.style.flexDirection = "column"
        } else if (index >= itemsToShow) {
          card.style.display = "none"
        }
      })

      updateLoadMoreVisibility()
    })
  }
}

// Update load more button visibility
function updateLoadMoreVisibility() {
  const grid = document.getElementById("projectsGrid")
  const loadMoreBtn = document.getElementById("loadMoreBtn")
  const container = document.getElementById("loadMoreContainer")

  if (!container || !loadMoreBtn) return

  // Count visible cards
  const visibleCards = grid.querySelectorAll(".project-card[style*='display: flex']")
  const totalVisibleCards = Array.from(grid.querySelectorAll(".project-card")).filter(
    (card) => card.style.display !== "none",
  ).length

  // Show button if there are more cards to load
  const shouldShow = visibleCards.length < totalVisibleCards
  container.style.display = shouldShow ? "block" : "none"
}

// Show no results message
function showNoResults(isEmpty) {
  const grid = document.getElementById("projectsGrid")
  let noResultsMsg = grid.querySelector(".no-results")

  if (isEmpty && !noResultsMsg) {
    noResultsMsg = document.createElement("div")
    noResultsMsg.className = "no-results"
    noResultsMsg.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-light);">
        <p style="font-size: 1.1rem; margin-bottom: 1rem;">No projects found matching your search.</p>
        <p style="font-size: 0.9rem;">Try different keywords or adjust your filters.</p>
      </div>
    `
    grid.appendChild(noResultsMsg)
  } else if (!isEmpty && noResultsMsg) {
    noResultsMsg.remove()
  }
}
