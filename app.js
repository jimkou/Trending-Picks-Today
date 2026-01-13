// ============================================
// Trending Picks Today - Main Application
// ============================================

(function() {
  'use strict';

  // ============================================
  // 1. Dynamic "Last Updated" Date
  // ============================================
  function setLastUpdatedDate() {
    const dateElement = document.getElementById('update-date');
    if (dateElement) {
      const now = new Date();
      // Format: "12 Jan 2026" using en-GB locale
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      dateElement.textContent = now.toLocaleDateString('en-GB', options);
    }
  }

  // ============================================
  // 2. Constants
  // ============================================
  const PLACEHOLDER_IMAGE = 'assets/placeholder.svg';
  const AMAZON_IMAGE_MARKETPLACE = 'US'; // Can be changed to: US, UK, DE, FR, IT, ES, CA, JP, etc.

  // ============================================
  // 3. Star Rating Generator
  // ============================================
  // Constants for half-star rating thresholds
  const HALF_STAR_MIN = 0.3;
  const HALF_STAR_MAX = 0.8;
  
  function generateStars(rating, size = '1rem') {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= HALF_STAR_MIN && rating % 1 < HALF_STAR_MAX;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      starsHTML += `<span class="star" style="font-size: ${size};">★</span>`;
    }
    
    // Half star
    if (hasHalfStar) {
      starsHTML += `<span class="star half" style="font-size: ${size};">★</span>`;
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += `<span class="star empty" style="font-size: ${size};">★</span>`;
    }
    
    return starsHTML;
  }

  // ============================================
  // 4. Badge Label Mapping
  // ============================================
  function getBadgeLabel(badge) {
    const labels = {
      'top-pick': 'Top Pick',
      'best-value': 'Best Value',
      'budget': 'Budget Pick'
    };
    return labels[badge] || '';
  }

  // ============================================
  // 5. Product Image URL Generator
  // ============================================
  /**
   * Gets the appropriate image URL for a product with fallback logic:
   * 1. If product.imageUrl exists -> use it
   * 2. Else if product.asin exists -> generate Amazon image URL
   * 3. Else -> use local placeholder
   */
  function getProductImageUrl(product) {
    // First priority: existing imageUrl
    if (product.imageUrl && product.imageUrl.trim() !== '') {
      return product.imageUrl;
    }
    
    // Second priority: generate from ASIN
    if (product.asin && product.asin.trim() !== '') {
      return `https://ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${product.asin}&Format=_SL500_&ID=AsinImage&MarketPlace=${AMAZON_IMAGE_MARKETPLACE}&ServiceVersion=20070822`;
    }
    
    // Fallback: local placeholder
    return PLACEHOLDER_IMAGE;
  }

  // ============================================
  // 6. Render Product Cards
  // ============================================
  function renderProductCards(products) {
    const container = document.querySelector('.products');
    if (!container) return;

    // Build complete HTML string first for better performance
    let cardsHTML = '';

    products.forEach((product) => {
      const badgeLabel = getBadgeLabel(product.badge);
      const starsHTML = generateStars(product.rating);
      const imageUrl = getProductImageUrl(product);
      
      // Determine if we should show video button
      const hasVideo = product.videoUrl && product.videoUrl.trim() !== '';
      
      cardsHTML += `
        <article class="card" role="listitem" aria-labelledby="${product.id}-title">
          ${badgeLabel ? `<span class="card-badge ${product.badge}">${badgeLabel}</span>` : ''}
          
          <div class="card-image">
            <img 
              src="${imageUrl}" 
              alt="${product.name}" 
              loading="lazy"
              width="120"
              height="120"
              onerror="this.onerror=null; this.src='${PLACEHOLDER_IMAGE}';"
            />
          </div>
          
          <div class="card-content">
            <div id="${product.id}-title" class="card-title">${product.name}</div>
            <div class="card-rating">
              <div class="stars" aria-label="${product.rating} out of 5 stars">
                ${starsHTML}
              </div>
              <span class="rating-text">${product.rating}/5</span>
            </div>
            <div class="card-reason">${product.reason}</div>
          </div>

          <div class="card-cta">
            <a class="primary-btn" href="${product.amazonUrl}" target="_blank" rel="nofollow sponsored noopener" aria-label="Check price for ${product.name} on Amazon">
              Check price
            </a>
            <div class="cta-sub">Opens on Amazon</div>
            ${hasVideo ? `
            <button class="watch-btn" data-video-url="${product.videoUrl}" aria-label="Watch video for ${product.name}">
              ▶ Watch
            </button>
            ` : ''}
          </div>
        </article>
      `;
    });
    
    // Set innerHTML once for better performance
    container.innerHTML = cardsHTML;
  }

  // ============================================
  // 7. Render Comparison Table
  // ============================================
  function renderComparisonTable(products) {
    const tbody = document.querySelector('.comparison-table tbody');
    if (!tbody) return;

    // Build complete HTML string first for better performance
    let rowsHTML = '';

    products.forEach((product) => {
      const starsHTML = generateStars(product.rating, '0.9rem');
      const hasVideo = product.videoUrl && product.videoUrl.trim() !== '';
      const imageUrl = getProductImageUrl(product);
      
      rowsHTML += `
        <tr>
          <td data-label="Product">
            <div class="table-product-with-image">
              <img 
                src="${imageUrl}" 
                alt="${product.name}" 
                class="table-product-thumb"
                loading="lazy"
                width="40"
                height="40"
                onerror="this.onerror=null; this.src='${PLACEHOLDER_IMAGE}';"
              />
              <span class="table-product-name">${product.name}</span>
            </div>
          </td>
          <td data-label="Rating">
            <div class="table-rating">
              <div class="stars">
                ${starsHTML}
              </div>
              <span>${product.rating}</span>
            </div>
          </td>
          <td data-label="Price" class="table-price">${product.priceRange}</td>
          <td data-label="Best For">${product.bestFor}</td>
          <td data-label="Action">
            <div class="table-actions">
              <a href="${product.amazonUrl}" class="table-btn" target="_blank" rel="nofollow sponsored noopener">View</a>
              ${hasVideo ? `
              <button class="table-watch-btn" data-video-url="${product.videoUrl}" aria-label="Watch video for ${product.name}">
                ▶
              </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    });
    
    // Set innerHTML once for better performance
    tbody.innerHTML = rowsHTML;
  }

  // ============================================
  // 8. Video Modal Functionality
  // ============================================
  function initVideoModal() {
    // Create modal if it doesn't exist
    let modal = document.getElementById('video-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'video-modal';
      modal.className = 'video-modal';
      modal.innerHTML = `
        <div class="video-modal-overlay"></div>
        <div class="video-modal-content">
          <button class="video-modal-close" aria-label="Close video">&times;</button>
          <div class="video-modal-iframe-wrapper">
            <iframe 
              id="video-iframe" 
              src="" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const iframe = document.getElementById('video-iframe');
    const overlay = modal.querySelector('.video-modal-overlay');
    const closeBtn = modal.querySelector('.video-modal-close');

    // Open modal function
    function openModal(videoUrl) {
      // Convert regular YouTube URL to embed URL if needed
      // Handle various YouTube URL formats safely
      let embedUrl = videoUrl;
      
      try {
        const url = new URL(videoUrl);
        let videoId = null;
        
        // Handle youtube.com/watch?v=VIDEO_ID format
        // Use exact domain matching for security
        if ((url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') && url.searchParams.has('v')) {
          videoId = url.searchParams.get('v');
        }
        // Handle youtu.be/VIDEO_ID format
        else if (url.hostname === 'youtu.be') {
          videoId = url.pathname.slice(1).split('?')[0];
        }
        
        // If we successfully extracted a video ID, create embed URL
        if (videoId) {
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
      } catch (e) {
        // If URL parsing fails, use the original URL as-is
        console.warn('Could not parse video URL');
      }
      
      iframe.src = embedUrl;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal() {
      modal.classList.remove('active');
      iframe.src = '';
      document.body.style.overflow = '';
    }

    // Event listeners
    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    // Attach to all watch buttons (using event delegation)
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('watch-btn') || e.target.classList.contains('table-watch-btn')) {
        const videoUrl = e.target.getAttribute('data-video-url');
        if (videoUrl) {
          openModal(videoUrl);
        }
      }
    });
  }

  // ============================================
  // 9. Load Products and Initialize
  // ============================================
  async function loadProducts() {
    try {
      const response = await fetch('products.json');
      if (!response.ok) {
        throw new Error('Failed to load products');
      }
      const products = await response.json();
      
      // Render product cards and comparison table
      renderProductCards(products);
      renderComparisonTable(products);
      
      // Initialize video modal
      initVideoModal();
      
    } catch (error) {
      console.error('Error loading products:', error);
      // Keep existing hardcoded content as fallback
    }
  }

  // ============================================
  // 10. Smooth Scrolling & Navigation
  // ============================================
  function initNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.category-nav a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update active state
          document.querySelectorAll('.category-nav a').forEach(link => {
            link.classList.remove('active');
          });
          this.classList.add('active');
        }
      });
    });

    // Update active nav on scroll (with performance optimization)
    let scrollTimeout;
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.category-nav a[href^="#"]');
    
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        let current = '';
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
          }
        });

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
          }
        });
      }, 100);
    });
  }

  // ============================================
  // 11. Initialize Everything on DOM Ready
  // ============================================
  function init() {
    // Set last updated date
    setLastUpdatedDate();
    
    // Load products and render
    loadProducts();
    
    // Initialize navigation
    initNavigation();
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
