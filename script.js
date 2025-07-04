// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

// Initialize Application with Enhanced Features
function initializeApp() {
  setupSmoothScrolling()
  setupLoadMoreButton()
  setupNewsletterSubscription()
  setupScrollAnimations()
  setupCardAnimations()
  setupParticleSystem()
  setupScrollProgressBar()
  setupNavbarScrollEffect()
  setupImageLazyLoading()
  setupAdvancedInteractions()
  setupThemeDetection()
  setupPerformanceOptimizations()
  setupReadMoreButtons() // Add this new function
}

// Enhanced Smooth Scrolling with Easing
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const headerOffset = 80
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })

        // Add ripple effect to clicked link
        createRippleEffect(this, e)
      }
    })
  })
}

// Create Ripple Effect for Buttons and Links
function createRippleEffect(element, event) {
  const ripple = document.createElement("span")
  const rect = element.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
    `

  element.style.position = "relative"
  element.style.overflow = "hidden"
  element.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)
}

// Add CSS for ripple animation
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`
const style = document.createElement("style")
style.textContent = rippleCSS
document.head.appendChild(style)

// Enhanced Load More Button with Animation
function setupLoadMoreButton() {
  const loadMoreBtn = document.getElementById("loadMoreBtn")
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function (e) {
      createRippleEffect(this, e)
      handleLoadMore(this)
    })
  }
}

function handleLoadMore(button) {
  // Show loading state with enhanced animation
  button.innerHTML = `
        <div class="d-flex align-items-center">
            <div class="spinner-grow spinner-grow-sm me-2" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <span>Loading amazing content...</span>
        </div>
    `
  button.classList.add("loading")

  // Simulate API call with realistic delay
  setTimeout(() => {
    button.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>All Posts Loaded!'
    button.classList.remove("btn-outline-primary", "loading")
    button.classList.add("btn-success")
    button.disabled = true

    // Add success animation
    button.style.transform = "scale(1.05)"
    setTimeout(() => {
      button.style.transform = "scale(1)"
    }, 200)

    showAdvancedNotification("All posts have been loaded successfully!", "success")
  }, 2500)
}

// Enhanced Newsletter Subscription
function setupNewsletterSubscription() {
  const subscribeBtn = document.querySelector("#subscribe button")
  const emailInput = document.querySelector('#subscribe input[type="email"]')

  if (subscribeBtn && emailInput) {
    subscribeBtn.addEventListener("click", function (e) {
      createRippleEffect(this, e)
      handleNewsletterSubscription(this)
    })

    // Enhanced Enter key handling
    emailInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        createRippleEffect(subscribeBtn, e)
        handleNewsletterSubscription(subscribeBtn)
      }
    })

    // Real-time email validation
    emailInput.addEventListener("input", function () {
      validateEmailRealTime(this)
    })
  }
}

function validateEmailRealTime(input) {
  const email = input.value.trim()
  const isValid = validateEmail(email)

  if (email.length > 0) {
    if (isValid) {
      input.classList.remove("is-invalid")
      input.classList.add("is-valid")
    } else {
      input.classList.remove("is-valid")
      input.classList.add("is-invalid")
    }
  } else {
    input.classList.remove("is-valid", "is-invalid")
  }
}

function handleNewsletterSubscription(button) {
  const emailInput = document.querySelector('#subscribe input[type="email"]')
  const email = emailInput.value.trim()

  if (validateEmail(email)) {
    // Show loading state
    button.innerHTML = `
            <div class="spinner-border spinner-border-sm me-2" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            Subscribing...
        `
    button.disabled = true

    // Simulate subscription process
    setTimeout(() => {
      button.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Subscribed!'
      button.classList.remove("btn-primary")
      button.classList.add("btn-success")
      emailInput.value = ""
      emailInput.classList.remove("is-invalid", "is-valid")

      showAdvancedNotification("🎉 Welcome to our newsletter! Check your email for confirmation.", "success")

      // Reset button after delay
      setTimeout(() => {
        button.innerHTML = '<i class="bi bi-envelope me-2"></i>Subscribe'
        button.classList.remove("btn-success")
        button.classList.add("btn-primary")
        button.disabled = false
      }, 4000)
    }, 1500)
  } else {
    emailInput.focus()
    emailInput.classList.add("is-invalid")
    showAdvancedNotification("Please enter a valid email address.", "error")

    // Shake animation for invalid input
    emailInput.style.animation = "shake 0.5s ease-in-out"
    setTimeout(() => {
      emailInput.style.animation = ""
    }, 500)
  }
}

// Enhanced Email Validation
function validateEmail(email) {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return email && emailRegex.test(email) && email.length <= 254
}

// Scroll Progress Bar
function setupScrollProgressBar() {
  const progressBar = document.createElement("div")
  progressBar.className = "scroll-progress"
  document.body.appendChild(progressBar)

  window.addEventListener("scroll", updateScrollProgress)
}

function updateScrollProgress() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrolled = (winScroll / height) * 100

  const progressBar = document.querySelector(".scroll-progress")
  if (progressBar) {
    progressBar.style.width = scrolled + "%"
  }
}

// Enhanced Navbar Scroll Effect
function setupNavbarScrollEffect() {
  const navbar = document.querySelector(".navbar")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = "translateY(-100%)"
    } else {
      navbar.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
    updateActiveNavLink()
  })
}

// Enhanced Active Navigation Link Updates
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

// Advanced Scroll Animations with Intersection Observer
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible")
        }, index * 100) // Stagger animation
      }
    })
  }, observerOptions)

  // Observe all animatable elements
  document.querySelectorAll(".card, .hero-section h1, .hero-section .lead, .hero-section .btn").forEach((element) => {
    element.classList.add("fade-in")
    observer.observe(element)
  })
}

// Enhanced Card Animations
function setupCardAnimations() {
  const cards = document.querySelectorAll(".card")

  cards.forEach((card) => {
    // Add hover effect class
    card.classList.add("card-hover-effect")

    // Enhanced mouse enter/leave effects
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) rotateX(5deg) scale(1.02)"
      this.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"

      // Add glow effect
      this.style.boxShadow = "0 25px 80px rgba(102, 126, 234, 0.3)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) rotateX(0) scale(1)"
      this.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.1)"
    })

    // Add click animation
    card.addEventListener("click", function (e) {
      if (!e.target.closest(".btn")) {
        this.style.transform = "scale(0.98)"
        setTimeout(() => {
          this.style.transform = "translateY(-15px) rotateX(5deg) scale(1.02)"
        }, 100)
      }
    })
  })
}

// Particle System for Background
function setupParticleSystem() {
  const particleContainer = document.createElement("div")
  particleContainer.className = "particles"
  document.querySelector(".hero-section").appendChild(particleContainer)

  function createParticle() {
    const particle = document.createElement("div")
    particle.className = "particle"

    const size = Math.random() * 4 + 2
    const startPosition = Math.random() * window.innerWidth
    const duration = Math.random() * 15 + 10

    particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${startPosition}px;
            animation-duration: ${duration}s;
            animation-delay: ${Math.random() * 5}s;
        `

    particleContainer.appendChild(particle)

    setTimeout(() => {
      particle.remove()
    }, duration * 1000)
  }

  // Create particles periodically
  setInterval(createParticle, 500)

  // Create initial particles
  for (let i = 0; i < 10; i++) {
    setTimeout(createParticle, i * 200)
  }
}

// Image Lazy Loading
function setupImageLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        img.classList.add("loaded")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => {
    img.classList.add("lazy")
    imageObserver.observe(img)
  })
}

// Advanced Notification System
function showAdvancedNotification(message, type = "info", duration = 5000) {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`

  const icons = {
    success: "bi-check-circle-fill",
    error: "bi-exclamation-triangle-fill",
    warning: "bi-exclamation-triangle-fill",
    info: "bi-info-circle-fill",
  }

  notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi ${icons[type]} me-3 fs-4"></i>
            <div class="flex-grow-1">
                <div class="fw-semibold">${getNotificationTitle(type)}</div>
                <div class="small">${message}</div>
            </div>
            <button type="button" class="btn-close ms-3" aria-label="Close"></button>
        </div>
        <div class="progress mt-2" style="height: 2px;">
            <div class="progress-bar" role="progressbar" style="width: 100%; transition: width ${duration}ms linear;"></div>
        </div>
    `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => notification.classList.add("show"), 100)

  // Auto remove
  const progressBar = notification.querySelector(".progress-bar")
  setTimeout(() => (progressBar.style.width = "0%"), 100)

  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => notification.remove(), 300)
  }, duration)

  // Manual close
  notification.querySelector(".btn-close").addEventListener("click", () => {
    notification.classList.remove("show")
    setTimeout(() => notification.remove(), 300)
  })
}

function getNotificationTitle(type) {
  const titles = {
    success: "Success!",
    error: "Error!",
    warning: "Warning!",
    info: "Info",
  }
  return titles[type] || "Notification"
}

// Advanced Interactions
function setupAdvancedInteractions() {
  // Add floating action button
  const fab = document.createElement("button")
  fab.className = "fab"
  fab.innerHTML = '<i class="bi bi-arrow-up"></i>'
  fab.setAttribute("aria-label", "Scroll to top")
  document.body.appendChild(fab)

  fab.addEventListener("click", function (e) {
    createRippleEffect(this, e)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Show/hide FAB based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      fab.style.opacity = "1"
      fab.style.visibility = "visible"
    } else {
      fab.style.opacity = "0"
      fab.style.visibility = "hidden"
    }
  })

  // Add button hover effects
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.05)"
    })

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })

    btn.addEventListener("click", function (e) {
      createRippleEffect(this, e)
    })
  })
}

// Handle Read More Button Clicks - FIXED VERSION
function setupReadMoreButtons() {
  // Wait for DOM to be fully loaded
  setTimeout(() => {
    const readMoreButtons = document.querySelectorAll(".card .btn-primary.btn-sm")

    console.log("Found", readMoreButtons.length, "read more buttons")

    // Blog post data
    const blogPosts = {
      "The Future of Web Development": {
        content: `
          <h4>The Future of Web Development</h4>
          <p>Web development is evolving at an unprecedented pace. Here are the key trends shaping the future:</p>
          <ul>
            <li><strong>AI Integration:</strong> AI-powered code generation and debugging tools</li>
            <li><strong>Progressive Web Apps:</strong> Native app-like experiences in browsers</li>
            <li><strong>WebAssembly:</strong> Near-native performance for web applications</li>
            <li><strong>Serverless Architecture:</strong> Scalable, cost-effective backend solutions</li>
            <li><strong>Voice Interfaces:</strong> Voice-controlled web interactions</li>
          </ul>
          <p>The future promises more intelligent, accessible, and performant web experiences.</p>
        `,
        author: "Tech Team",
        readTime: "8 min read",
        tags: ["Technology", "Web Development", "AI", "Future Tech"],
      },
      "Digital Marketing Strategies That Work": {
        content: `
          <h4>Digital Marketing Strategies That Work</h4>
          <p>Successful digital marketing requires a multi-channel approach. Here's what works:</p>
          <ul>
            <li><strong>Content Marketing:</strong> Create valuable, relevant content consistently</li>
            <li><strong>SEO Optimization:</strong> Improve search engine visibility</li>
            <li><strong>Social Media Engagement:</strong> Build communities around your brand</li>
            <li><strong>Email Marketing:</strong> Personalized communication with your audience</li>
            <li><strong>Data Analytics:</strong> Make decisions based on real user data</li>
          </ul>
          <p>The key is to focus on providing value to your audience while measuring and optimizing your efforts.</p>
        `,
        author: "Marketing Team",
        readTime: "6 min read",
        tags: ["Marketing", "Digital Strategy", "SEO", "Social Media"],
      },
      "AI Revolution in Business": {
        content: `
          <h4>AI Revolution in Business</h4>
          <p>Artificial Intelligence is transforming how businesses operate across all industries:</p>
          <ul>
            <li><strong>Automation:</strong> Streamlining repetitive tasks and processes</li>
            <li><strong>Predictive Analytics:</strong> Forecasting trends and customer behavior</li>
            <li><strong>Customer Service:</strong> AI chatbots and virtual assistants</li>
            <li><strong>Decision Making:</strong> Data-driven insights for better choices</li>
            <li><strong>Personalization:</strong> Tailored experiences for each customer</li>
          </ul>
          <p>Companies that embrace AI early will have a significant competitive advantage in the digital economy.</p>
        `,
        author: "AI Research Team",
        readTime: "10 min read",
        tags: ["AI", "Business", "Automation", "Innovation"],
      },
      "Sustainable Living Guide": {
        content: `
          <h4>Sustainable Living Guide</h4>
          <p>Living sustainably doesn't mean sacrificing comfort. Here are practical steps:</p>
          <ul>
            <li><strong>Energy Efficiency:</strong> Use LED bulbs and smart thermostats</li>
            <li><strong>Reduce Waste:</strong> Embrace the 3 R's - Reduce, Reuse, Recycle</li>
            <li><strong>Sustainable Transportation:</strong> Walk, bike, or use public transport</li>
            <li><strong>Conscious Consumption:</strong> Buy local and choose eco-friendly products</li>
            <li><strong>Water Conservation:</strong> Fix leaks and use water-efficient appliances</li>
          </ul>
          <p>Small changes in daily habits can make a significant environmental impact over time.</p>
        `,
        author: "Sustainability Team",
        readTime: "7 min read",
        tags: ["Lifestyle", "Environment", "Sustainability", "Green Living"],
      },
      "Remote Work Best Practices": {
        content: `
          <h4>Remote Work Best Practices</h4>
          <p>Master remote work with these proven strategies for success:</p>
          <ul>
            <li><strong>Create a Dedicated Workspace:</strong> Separate work and personal areas</li>
            <li><strong>Establish Routines:</strong> Maintain consistent work schedules</li>
            <li><strong>Communication Tools:</strong> Use video calls and collaboration platforms</li>
            <li><strong>Time Management:</strong> Use techniques like Pomodoro for focus</li>
            <li><strong>Work-Life Balance:</strong> Set clear boundaries and take breaks</li>
          </ul>
          <p>Remote work success comes from discipline, communication, and the right tools.</p>
        `,
        author: "Productivity Team",
        readTime: "9 min read",
        tags: ["Productivity", "Remote Work", "Work-Life Balance", "Career"],
      },
      "Understanding Cryptocurrency": {
        content: `
          <h4>Understanding Cryptocurrency</h4>
          <p>Cryptocurrency basics for beginners - everything you need to know:</p>
          <ul>
            <li><strong>Blockchain Technology:</strong> The foundation of all cryptocurrencies</li>
            <li><strong>Bitcoin vs Altcoins:</strong> Understanding different types of crypto</li>
            <li><strong>Wallets & Security:</strong> How to safely store your digital assets</li>
            <li><strong>Investment Strategies:</strong> Dollar-cost averaging and risk management</li>
            <li><strong>Market Analysis:</strong> Reading charts and understanding trends</li>
          </ul>
          <p>Cryptocurrency represents a new frontier in finance, but education and caution are essential.</p>
        `,
        author: "Finance Team",
        readTime: "12 min read",
        tags: ["Finance", "Cryptocurrency", "Investment", "Blockchain"],
      },
    }

    readMoreButtons.forEach((button, index) => {
      // Remove any existing event listeners
      button.removeEventListener("click", handleReadMoreClick)

      // Add new event listener
      button.addEventListener("click", handleReadMoreClick)

      function handleReadMoreClick(e) {
        e.preventDefault()
        e.stopPropagation()

        console.log("Read More button clicked")

        // Find the blog post title
        const card = button.closest(".card")
        const titleElement = card.querySelector(".card-title")
        const title = titleElement ? titleElement.textContent.trim() : ""

        console.log("Blog post title:", title)

        const postData = blogPosts[title]

        if (postData) {
          showBlogPostModal(title, postData)
        } else {
          // Show a nice info message instead of error
          showAdvancedNotification(`📖 "${title}" - Full article coming soon! Stay tuned for more details.`, "info")
        }
      }
    })
  }, 1000) // Wait 1 second for DOM to be ready
}

// Show Blog Post Modal - IMPROVED VERSION
function showBlogPostModal(title, postData) {
  // Remove existing modal if any
  const existingModal = document.getElementById("blogModal")
  if (existingModal) {
    existingModal.remove()
  }

  // Create modal HTML
  const modalHTML = `
    <div class="modal fade" id="blogModal" tabindex="-1" aria-labelledby="blogModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
            <h5 class="modal-title" id="blogModalLabel">${title}</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <small class="text-muted">By ${postData.author}</small>
                  <span class="mx-2">•</span>
                  <small class="text-muted">${postData.readTime}</small>
                </div>
              </div>
              <div class="mb-3">
                ${postData.tags.map((tag) => `<span class="badge" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); margin-right: 5px;">${tag}</span>`).join("")}
              </div>
            </div>
            <div class="blog-content" style="line-height: 1.6;">
              ${postData.content}
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="sharePost('${title}')" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none;">
              <i class="bi bi-share me-2"></i>Share
            </button>
          </div>
        </div>
      </div>
    </div>
  `

  // Add modal to body
  document.body.insertAdjacentHTML("beforeend", modalHTML)

  // Initialize and show modal using Bootstrap's JavaScript API
  const modalElement = document.getElementById("blogModal")
  const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement)
  modal.show()

  // Clean up when modal is hidden
  modalElement.addEventListener("hidden.bs.modal", function () {
    this.remove()
  })
}

// Share Post Function
function sharePost(title) {
  if (navigator.share) {
    navigator
      .share({
        title: title,
        text: `Check out this article: ${title}`,
        url: window.location.href,
      })
      .catch((err) => {
        console.log("Error sharing:", err)
        fallbackShare(title)
      })
  } else {
    fallbackShare(title)
  }
}

function fallbackShare(title) {
  const url = `${title} - ${window.location.href}`
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        showAdvancedNotification("📋 Link copied to clipboard!", "success")
      })
      .catch(() => {
        showAdvancedNotification("📱 Share this article with your friends!", "info")
      })
  } else {
    showAdvancedNotification("📱 Share this article with your friends!", "info")
  }
}

// REMOVE THE PROBLEMATIC ERROR HANDLER
// Comment out or remove the window error event listener that's causing issues
/*
window.addEventListener('error', (e) => {
  // Only show error notifications for actual JavaScript errors, not navigation
  if (e.error && e.error.stack) {
    console.error('JavaScript error:', e.error)
    showAdvancedNotification('A technical error occurred. Please try again.', 'error')
  }
})
*/

// Replace with a more specific error handler
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason)
  // Only show error for actual promise rejections, not user interactions
})

// Theme Detection and System
function setupThemeDetection() {
  // Detect system theme preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)")

  function handleThemeChange(e) {
    if (e.matches) {
      document.body.classList.add("dark-theme")
    } else {
      document.body.classList.remove("dark-theme")
    }
  }

  prefersDark.addListener(handleThemeChange)
  handleThemeChange(prefersDark)
}

// Performance Optimizations
function setupPerformanceOptimizations() {
  // Debounce scroll events
  let scrollTimeout
  const originalScrollHandler = window.onscroll

  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
    scrollTimeout = setTimeout(() => {
      updateScrollProgress()
      updateActiveNavLink()
    }, 10)
  })

  // Preload critical resources
  const preloadLinks = [
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap",
    "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap",
  ]

  preloadLinks.forEach((href) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "style"
    link.href = href
    document.head.appendChild(link)
  })
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Touch and Mobile Enhancements
if ("ontouchstart" in window) {
  document.body.classList.add("touch-device")

  // Add touch feedback
  document.addEventListener("touchstart", (e) => {
    if (e.target.classList.contains("btn") || e.target.classList.contains("card")) {
      e.target.style.transform = "scale(0.98)"
    }
  })

  document.addEventListener("touchend", (e) => {
    if (e.target.classList.contains("btn") || e.target.classList.contains("card")) {
      setTimeout(() => {
        e.target.style.transform = ""
      }, 100)
    }
  })
}

// Add shake animation CSS
const shakeCSS = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`
const shakeStyle = document.createElement("style")
shakeStyle.textContent = shakeCSS
document.head.appendChild(shakeStyle)

// Initialize everything when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp)
} else {
  initializeApp()
}

// Service Worker Registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful")
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed")
      })
  })
}

console.log("🚀 ModernBlog JavaScript loaded successfully!")
