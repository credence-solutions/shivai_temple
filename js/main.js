(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate portfolio lightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        filter: '.filter-shivai'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Activate navbar links based on current page
   */
  window.addEventListener('load', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = select('.navbar a', true);

    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkHref = link.getAttribute('href');

      // Check if link matches current page
      if (linkHref === currentPage ||
          (currentPage === '' && linkHref === 'index.html') ||
          (currentPage === 'index.html' && linkHref === 'index.html')) {
        link.classList.add('active');
      }
    });
  });

  /**
   * Update active navbar link on click
   */
  on('click', '.navbar a', function(e) {
    const navLinks = select('.navbar a', true);
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    this.classList.add('active');
  }, true);

  /**
   * Daily Thought/Shloka Rotation
   */
  const thoughts = [
    {
      marathi: "या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता। नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥",
      english: "The Goddess resides in all beings in the form of power. Salutations to Her, salutations to Her, salutations to Her again and again.",
      source: "दुर्गा सप्तशती"
    },
    {
      marathi: "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥",
      english: "O Goddess, you are the auspicious of all auspicious, the consort of Shiva, the fulfiller of all desires. O three-eyed Gauri, Narayani, salutations to you.",
      source: "दुर्गा सप्तशती"
    },
    {
      marathi: "या देवी सर्वभूतेषु मातृरूपेण संस्थिता। नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥",
      english: "The Goddess who resides in all beings in the form of mother. Salutations to Her, salutations to Her, salutations to Her again and again.",
      source: "दुर्गा सप्तशती"
    },
    {
      marathi: "या देवी सर्वभूतेषु बुद्धिरूपेण संस्थिता। नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥",
      english: "The Goddess who resides in all beings in the form of intelligence. Salutations to Her, salutations to Her, salutations to Her again and again.",
      source: "दुर्गा सप्तशती"
    },
    {
      marathi: "शरणागतदीनार्तपरित्राणपरायणे। सर्वस्यार्तिहरे देवि नारायणि नमोऽस्तु ते॥",
      english: "O Goddess, you are devoted to protecting the helpless who surrender to you. O Narayani, you remove all sufferings, salutations to you.",
      source: "दुर्गा सप्तशती"
    }
  ];

  let currentThoughtIndex = 0;

  function rotateThought() {
    const thoughtText = select('#dailyThought');
    const thoughtTranslation = select('#thoughtTranslation');
    const thoughtSource = select('.thought-source');

    if (thoughtText && thoughtTranslation) {
      // Add fade out class
      thoughtText.style.opacity = '0';
      thoughtTranslation.style.opacity = '0';

      setTimeout(() => {
        currentThoughtIndex = (currentThoughtIndex + 1) % thoughts.length;
        const thought = thoughts[currentThoughtIndex];

        thoughtText.textContent = thought.marathi;
        thoughtTranslation.textContent = thought.english;
        thoughtSource.textContent = '- ' + thought.source;

        // Fade in
        thoughtText.style.transition = 'opacity 0.8s ease';
        thoughtTranslation.style.transition = 'opacity 0.8s ease';
        thoughtText.style.opacity = '1';
        thoughtTranslation.style.opacity = '1';
      }, 400);
    }
  }

  // Rotate thought every 10 seconds
  if (select('#dailyThought')) {
    setInterval(rotateThought, 10000);
  }

  /**
   * Dark Mode Toggle
   */
  const darkModeToggle = select('#darkModeToggle');
  if (darkModeToggle) {
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');

      // Save preference
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
      } else {
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }

  /**
   * Text Size Adjuster
   */
  let textSizeLevel = parseInt(localStorage.getItem('textSize')) || 2; // Default medium
  const textSizes = ['text-small', 'text-medium', 'text-large', 'text-xlarge'];

  function applyTextSize() {
    document.body.classList.remove(...textSizes);
    document.body.classList.add(textSizes[textSizeLevel]);
    localStorage.setItem('textSize', textSizeLevel);
  }

  // Apply saved text size on load
  applyTextSize();

  const textSizeIncrease = select('#textSizeIncrease');
  const textSizeDecrease = select('#textSizeDecrease');

  if (textSizeIncrease) {
    textSizeIncrease.addEventListener('click', () => {
      if (textSizeLevel < textSizes.length - 1) {
        textSizeLevel++;
        applyTextSize();
      }
    });
  }

  if (textSizeDecrease) {
    textSizeDecrease.addEventListener('click', () => {
      if (textSizeLevel > 0) {
        textSizeLevel--;
        applyTextSize();
      }
    });
  }

})()