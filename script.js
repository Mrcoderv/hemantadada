document.addEventListener("DOMContentLoaded", () => {
  // Contact form functionality
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const name = formData.get("name")
      const email = formData.get("email")
      const subject = formData.get("subject")
      const message = formData.get("message")

      // Simple validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Simulate form submission
      alert("Thank you for your message! I will get back to you soon.")
      contactForm.reset()
    })
  }

  // Gallery image modal functionality
  const galleryImages = [
    {
      filename: "Screenshot 2025-09-10 091842.png",
      title: "Research Conference",
      description: "Presenting research findings at academic conference",
    },
  ];

  const galleryGrid = document.getElementById("galleryGrid")
  if (galleryGrid) {
    loadGalleryImages()
  }

  function loadGalleryImages() {
    const galleryGrid = document.getElementById("galleryGrid")
    const imagesFolder = "images/gallery/"

    galleryImages.forEach((imageData, index) => {
      const galleryItem = document.createElement("div")
      galleryItem.className = "gallery-item"

      const img = document.createElement("img")
      img.src = imagesFolder + imageData.filename
      img.alt = imageData.title

      // Fallback to placeholder if image doesn't exist
      img.onerror = function () {
        this.src = `/placeholder.svg?height=250&width=350&text=${encodeURIComponent(imageData.title)}`
      }

      const overlay = document.createElement("div")
      overlay.className = "gallery-overlay"
      overlay.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(0,0,0,0.7);
        color: #fff;
        padding: 10px;
        box-sizing: border-box;
        opacity: 1;
        transition: opacity 0.3s;
      `;
      overlay.innerHTML = `
        <h4 style='margin:0;'>${imageData.title}</h4>
        <p style='margin:0;'>${imageData.description}</p>
      `;

      galleryItem.style.position = "relative";
      galleryItem.appendChild(img);
      galleryItem.appendChild(overlay);
      galleryGrid.appendChild(galleryItem);

      // Add click event for modal (reuse existing modal functionality)
      img.addEventListener("click", function () {
        openImageModal(this)
      })
    })
  }

  function openImageModal(imgElement) {
    const modal = document.createElement("div")
    modal.className = "modal-overlay"
    modal.innerHTML = `
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <img src="${imgElement.src}" alt="${imgElement.alt}">
        <div class="modal-caption">
          <h4>${imgElement.nextElementSibling.querySelector("h4").textContent}</h4>
          <p>${imgElement.nextElementSibling.querySelector("p").textContent}</p>
        </div>
      </div>
    `

    // Add modal styles
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 2rem;
    `

    const modalContent = modal.querySelector(".modal-content")
    modalContent.style.cssText = `
      position: relative;
      max-width: 90%;
      max-height: 90%;
      background: white;
      border-radius: 8px;
      overflow: hidden;
    `

    const modalImg = modal.querySelector("img")
    modalImg.style.cssText = `
      width: 100%;
      height: auto;
      max-height: 70vh;
      object-fit: contain;
    `

    const modalClose = modal.querySelector(".modal-close")
    modalClose.style.cssText = `
      position: absolute;
      top: 10px;
      right: 15px;
      color: #aaa;
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
      z-index: 1001;
    `

    const modalCaption = modal.querySelector(".modal-caption")
    modalCaption.style.cssText = `
      padding: 1rem;
      background: white;
    `

    document.body.appendChild(modal)

    // Close modal functionality
    modalClose.addEventListener("click", () => {
      document.body.removeChild(modal)
    })

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal)
      }
    })
  }

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add loading animation for images
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })

    // Set initial opacity for loading effect
    img.style.opacity = "0"
    img.style.transition = "opacity 0.3s ease"
  })

  // Add some interactive features
  const title = document.querySelector(".profile-info h1")
  if (title) {
    const originalText = title.textContent
    title.textContent = ""
    let i = 0

    function typeWriter() {
      if (i < originalText.length) {
        title.textContent += originalText.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500)
  }

  const profilePic = document.querySelector(".profile-image img")
  if (profilePic) {
    // Check if we're on the About Me page (index.html)
    const isAboutPage =
      window.location.pathname === "/" ||
      window.location.pathname.endsWith("index.html") ||
      window.location.pathname === "" ||
      window.location.pathname === "/index.html"

    if (isAboutPage) {
      // Make profile picture completely static on About Me page
      profilePic.style.opacity = "1"
      profilePic.style.visibility = "visible"
      profilePic.style.transition = "none"
    } else {
      // For other pages, show for exactly 3 seconds then fade out
      profilePic.style.opacity = "1"
      profilePic.style.visibility = "visible"
      profilePic.style.transition = "opacity 0.5s ease"

      setTimeout(() => {
        profilePic.style.opacity = "0"
        setTimeout(() => {
          profilePic.style.visibility = "hidden"
        }, 500)
      }, 3000)
    }
  }

  // Add scroll-to-top functionality
  const scrollToTopBtn = document.createElement("button")
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollToTopBtn.className = "scroll-to-top"
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `

  document.body.appendChild(scrollToTopBtn)

  // Show/hide scroll to top button
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.display = "block"
    } else {
      scrollToTopBtn.style.display = "none"
    }
  })

  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
})
