// Lightweight renderer and UI for Trending Amazon Picks
(function () {
  // product data (15 items across 5 categories)
  // Replace {{LINK_*}} placeholders with real amzn.to affiliate links.
  const PRODUCTS = [
    // Home & Kitchen (3)
    {
      id: 'home-1',
      category: 'Home & Kitchen',
      title: 'Robot Vacuum — Compact Model',
      reason: 'High placement in public best-seller lists for compact vacuums.',
      tags: ['Top seller','Home'],
      link: '{{LINK_HOME_1}}',
      sortKey: {trending: 1, value: 3, budget: 2},
      imageUrl: 'https://placehold.co/800x600?text=Robot+Vacuum'
    },
    {
      id: 'home-2',
      category: 'Home & Kitchen',
      title: 'Air Fryer — Multi-use',
      reason: 'Consistently visible in high-traffic kitchen appliance charts.',
      tags: ['Popular','Best value'],
      link: '{{LINK_HOME_2}}',
      sortKey: {trending: 2, value: 1, budget: 3},
      imageUrl: 'https://placehold.co/800x600?text=Air+Fryer'
    },
    {
      id: 'home-3',
      category: 'Home & Kitchen',
      title: 'Cordless Hand Vacuum',
      reason: 'Often appears in small-appliance trending lists.',
      tags: ['Portable','Budget'],
      link: '{{LINK_HOME_3}}',
      sortKey: {trending: 3, value: 2, budget: 1},
      imageUrl: 'https://placehold.co/800x600?text=Hand+Vacuum'
    },

    // Tech & Gadgets (3)
    {
      id: 'tech-1',
      category: 'Tech & Gadgets',
      title: 'Wireless Earbuds Pro',
      reason: 'High review volumes and frequent best-seller rank spikes.',
      tags: ['Top seller','Popular'],
      link: '{{LINK_TECH_1}}',
      sortKey: {trending: 1, value: 2, budget: 3},
      imageUrl: 'https://placehold.co/800x600?text=Wireless+Earbuds'
    },
    {
      id: 'tech-2',
      category: 'Tech & Gadgets',
      title: 'Portable SSD 1TB',
      reason: 'Strong demand in storage category and steady sales.',
      tags: ['Best value','Fast'],
      link: '{{LINK_TECH_2}}',
      sortKey: {trending: 3, value: 1, budget: 2},
      imageUrl: 'https://placehold.co/800x600?text=Portable+SSD+1TB'
    },
    {
      id: 'tech-3',
      category: 'Tech & Gadgets',
      title: 'Smart Home Hub',
      reason: 'Increasing interest as more devices become connected.',
      tags: ['Popular','Smart'],
      link: '{{LINK_TECH_3}}',
      sortKey: {trending: 2, value: 3, budget: 1},
      imageUrl: 'https://placehold.co/800x600?text=Smart+Home+Hub'
    },

    // Fitness (3)
    {
      id: 'fit-1',
      category: 'Fitness',
      title: 'Adjustable Dumbbells',
      reason: 'Sustained best-seller standing in home fitness gear.',
      tags: ['Top seller','Home gym'],
      link: '{{LINK_FIT_1}}',
      sortKey: {trending: 2, value: 1, budget: 3},
      imageUrl: 'https://placehold.co/800x600?text=Adjustable+Dumbbells'
    },
    {
      id: 'fit-2',
      category: 'Fitness',
      title: 'Smart Fitness Watch',
      reason: 'High review counts and frequent ranking updates.',
      tags: ['Popular','Wearable'],
      link: '{{LINK_FIT_2}}',
      sortKey: {trending: 1, value: 3, budget: 2},
      imageUrl: 'https://placehold.co/800x600?text=Smart+Fitness+Watch'
    },
    {
      id: 'fit-3',
      category: 'Fitness',
      title: 'Resistance Bands Set',
      reason: 'Often appears in budget fitness lists with strong sales.',
      tags: ['Budget','Portable'],
      link: '{{LINK_FIT_3}}',
      sortKey: {trending: 3, value: 2, budget: 1},
      imageUrl: 'https://placehold.co/800x600?text=Resistance+Bands'
    },

    // Pets (3)
    {
      id: 'pets-1',
      category: 'Pets',
      title: 'Automatic Pet Feeder',
      reason: 'Steady placement in pet-care trending lists.',
      tags: ['Top seller','Convenience'],
      link: '{{LINK_PETS_1}}',
      sortKey: {trending: 1, value: 3, budget: 2},
      imageUrl: 'https://placehold.co/800x600?text=Automatic+Pet+Feeder'
    },
    {
      id: 'pets-2',
      category: 'Pets',
      title: 'Interactive Pet Toy',
      reason: 'High engagement and frequent social mentions.',
      tags: ['Popular','Fun'],
      link: '{{LINK_PETS_2}}',
      sortKey: {trending: 2, value: 1, budget: 3},
      imageUrl: 'https://placehold.co/800x600?text=Interactive+Pet+Toy'
    },
    {
      id: 'pets-3',
      category: 'Pets',
      title: 'Orthopedic Pet Bed',
      reason: 'Strong review volume in comfort-focused items.',
      tags: ['Comfort','Best value'],
      link: '{{LINK_PETS_3}}',
      sortKey: {trending: 3, value: 2, budget: 1},
      imageUrl: 'https://placehold.co/800x600?text=Orthopedic+Pet+Bed'
    },

    // Travel (3)
    {
      id: 'travel-1',
      category: 'Travel',
      title: 'Hardshell Carry-On',
      reason: 'Good placement among travel best-sellers and steady demand.',
      tags: ['Top seller','Durable'],
      link: '{{LINK_TRAVEL_1}}',
      sortKey: {trending: 1, value: 2, budget: 3},
      imageUrl: 'https://placehold.co/800x600?text=Hardshell+Carry-On'
    },
    {
      id: 'travel-2',
      category: 'Travel',
      title: 'Travel Power Adapter',
      reason: 'Frequent purchases by travelers and high review counts.',
      tags: ['Popular','Compact'],
      link: '{{LINK_TRAVEL_2}}',
      sortKey: {trending: 2, value: 1, budget: 3},
      imageUrl: 'https://placehold.co/800x600?text=Power+Adapter'
    },
    {
      id: 'travel-3',
      category: 'Travel',
      title: 'Compression Packing Cubes',
      reason: 'Often appears in packing-accessory lists with positive signals.',
      tags: ['Best value','Organize'],
      link: '{{LINK_TRAVEL_3}}',
      sortKey: {trending: 3, value: 2, budget: 1},
      imageUrl: 'https://placehold.co/800x600?text=Packing+Cubes'
    }
  ];

  // DOM references
  const productsEl = document.getElementById('products');
  const filterCategory = document.getElementById('filterCategory');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const updatedBadge = document.getElementById('updatedBadge');
  const yearEl = document.getElementById('year');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // initialize
  function init() {
    populateCategoryOptions();
    renderProducts(PRODUCTS);
    attachEvents();
    setUpdatedDate();
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function populateCategoryOptions() {
    const categories = Array.from(new Set(PRODUCTS.map(p => p.category)));
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      filterCategory.appendChild(opt);
    });
  }

  function setUpdatedDate() {
    const d = new Date();
    // local date string, e.g., 2026-01-10
    const formatted = d.toLocaleDateString(undefined, {year: 'numeric', month: 'short', day: 'numeric'});
    updatedBadge.textContent = `Updated: ${formatted}`;
  }

  // render products based on filters
  function renderProducts(data) {
    productsEl.innerHTML = '';
    if (!data.length) {
      productsEl.innerHTML = '<p class="muted">No products match your filters.</p>';
      return;
    }
    const frag = document.createDocumentFragment();
    data.forEach(p => {
      const card = document.createElement('article');
      card.className = 'card';
      card.setAttribute('data-id', p.id);
      card.innerHTML = `
        <img src="${escapeHtml(p.imageUrl)}" alt="${escapeHtml(p.title)}">
        <div>
          <h3 class="card-title">${escapeHtml(p.title)}</h3>
          <p class="card-reason">${escapeHtml(p.reason)}</p>
          <div class="pills">${p.tags.map(t => `<span class="pill">${escapeHtml(t)}</span>`).join('')}</div>
        </div>
        <div class="card-foot">
          <div class="price-cta">
            <a class="btn cta" href="${escapeHtml(p.link)}" target="_blank" rel="nofollow sponsored noopener">Check price on Amazon</a>
          </div>
        </div>
      `;
      frag.appendChild(card);
    });
    productsEl.appendChild(frag);
  }

  // filtering + sorting logic
  function getFilteredProducts() {
    const q = (searchInput.value || '').trim().toLowerCase();
    const cat = filterCategory.value;
    const sortBy = sortSelect.value; // 'trending'|'value'|'budget'
    let list = PRODUCTS.slice();

    if (cat && cat !== 'all') {
      list = list.filter(p => p.category === cat);
    }
    if (q) {
      list = list.filter(p => p.title.toLowerCase().includes(q));
    }

    // sort by sortKey value (lower is better)
    list.sort((a,b) => {
      const av = a.sortKey[sortBy] || 99;
      const bv = b.sortKey[sortBy] || 99;
      return av - bv;
    });

    return list;
  }

  // events
  function attachEvents() {
    filterCategory.addEventListener('change', () => {
      renderProducts(getFilteredProducts());
    });

    searchInput.addEventListener('input', () => {
      renderProducts(getFilteredProducts());
    });

    sortSelect.addEventListener('change', () => {
      renderProducts(getFilteredProducts());
    });

    // nav toggle for small screens
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
      });
    }

    // keyboard accessible: Enter on cards -> open first link
    productsEl.addEventListener('keydown', (e) => {
      const el = e.target.closest('.card');
      if (!el) return;
      if (e.key === 'Enter') {
        const link = el.querySelector('a.cta');
        if (link) link.click();
      }
    });

    // initial render ensures sorted/trending default
    renderProducts(getFilteredProducts());
  }

  // small helper to escape text for insertion
  function escapeHtml(s) {
    if (!s) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // run init
  init();

  // expose for debugging (optional)
  window._TAP = {
    PRODUCTS, renderProducts, getFilteredProducts
  };
})();
