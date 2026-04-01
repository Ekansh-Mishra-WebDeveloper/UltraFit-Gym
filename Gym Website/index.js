// index.js - Full functionality + Premium Navbar + Floating CTA + Local Media + Fixed Transformation Slider
// Mobile Optimized: passive event listeners, touch improvements, reduced flicker

document.addEventListener('DOMContentLoaded', () => {
  // ========== STICKY NAVBAR (SCROLL EFFECT) ==========
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ========== HAMBURGER MENU (MOBILE) ==========
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        navLinks.classList.remove('active');
      }
    });
  });

  // ========== JOIN NOW BUTTON (SCROLL TO MEMBERSHIP) ==========
  const joinNowBtns = document.querySelectorAll('.join-now-nav, .join-now-btn');
  const membershipSection = document.getElementById('membership-section');
  joinNowBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (membershipSection) {
        membershipSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========== CONTACT US BUTTON (SCROLL TO CONTACT SECTION) ==========
  const contactUsNavBtn = document.getElementById('contactUsNavBtn');
  const contactSection = document.getElementById('contact-section');
  if (contactUsNavBtn && contactSection) {
    contactUsNavBtn.addEventListener('click', (e) => {
      e.preventDefault();
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // ========== OTHER NAV LINKS (PLACEHOLDERS) ==========
  const placeholderLinks = document.querySelectorAll('.nav-link:not(.join-now-nav):not(#contactUsNavBtn)');
  placeholderLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      alert('✨ Coming soon! Stay tuned for more features.');
    });
  });

  // ========== FLOATING CTA BUTTON ==========
  const floatingBtn = document.getElementById('floatingTrialBtn');
  if (floatingBtn) {
    floatingBtn.addEventListener('click', openLeadModal);
  }

  // ========== LIVE STATUS ==========
  const statusSpan = document.getElementById('statusText');
  function updateLiveStatus() {
    const now = new Date();
    const hours = now.getHours();
    const isOpen = hours >= 6 && hours < 22;
    statusSpan.innerText = isOpen ? 'Open Now – Closing at 10 PM' : 'Closed Now – Opens at 6 AM';
    const dot = document.querySelector('.pulse-dot');
    if (!isOpen) dot.style.backgroundColor = '#aaa';
    else dot.style.backgroundColor = '#2ecc2e';
  }
  updateLiveStatus();
  setInterval(updateLiveStatus, 60000);

  // ========== ANIMATED COUNTERS ==========
  const counters = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        let count = 0;
        const increment = target / 40;
        const updateCounter = () => {
          count += increment;
          if (count < target) {
            el.innerText = Math.floor(count);
            requestAnimationFrame(updateCounter);
          } else el.innerText = target;
        };
        updateCounter();
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));

  // ========== MODAL LOGIC (Lead Capture) ==========
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalDynamicBody');
  function showModal(contentHtml) {
    modalBody.innerHTML = contentHtml;
    modalOverlay.style.display = 'flex';
  }
  document.querySelectorAll('.close-modal').forEach(btn => btn.addEventListener('click', () => modalOverlay.style.display = 'none'));
  modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) modalOverlay.style.display = 'none'; });

  function openLeadModal() {
    showModal(`
      <h3 style="color:#FFD700">Claim 3-Day Free Trial</h3>
      <input type="text" id="leadName" placeholder="Full Name" style="width:100%; margin:10px 0; padding:12px; background:#222; border:1px solid #FFD700; color:white; border-radius:20px;">
      <input type="tel" id="leadPhone" placeholder="Phone Number" style="width:100%; margin:10px 0; padding:12px; background:#222; border:1px solid #FFD700; border-radius:20px;">
      <button id="submitLeadBtn" style="background:#FFD700; width:100%; padding:12px; border:none; border-radius:40px; font-weight:bold;">Get Trial Pass</button>
    `);
    document.getElementById('submitLeadBtn')?.addEventListener('click', () => {
      const name = document.getElementById('leadName')?.value;
      if (name) alert(`✅ Thanks ${name}, your 3-day free trial is ready! We'll contact you soon.`);
      modalOverlay.style.display = 'none';
    });
  }

  // Existing hero button
  document.getElementById('heroVipBtn')?.addEventListener('click', openLeadModal);

  // ========== TRAINER PROFILES ==========
  const trainerData = {
    owner: {
      img: "https://images.pexels.com/photos/1552102/pexels-photo-1552102.jpeg?auto=compress&cs=tinysrgb&w=200",
      name: "Marcus Vane",
      position: "Founder & CEO",
      bio: "Marcus Vane is a visionary leader with over 15 years of experience sculpting elite athletes."
    },
    trainer1: {
      img: "https://images.pexels.com/photos/841128/pexels-photo-841128.jpeg?auto=compress&cs=tinysrgb&w=200",
      name: "Elena Cross",
      position: "Head of Performance",
      bio: "Elena Cross, former Olympian, specializes in hypertrophy and functional movement."
    },
    trainer2: {
      img: "https://images.pexels.com/photos/260447/pexels-photo-260447.jpeg?auto=compress&cs=tinysrgb&w=200",
      name: "David Okafor",
      position: "Nutrition Director",
      bio: "David Okafor crafts precision meal plans that fuel elite performance."
    },
    trainer3: {
      img: "https://images.pexels.com/photos/842568/pexels-photo-842568.jpeg?auto=compress&cs=tinysrgb&w=200",
      name: "Isabella Cruz",
      position: "Strength & Conditioning",
      bio: "Isabella is a certified strength coach with 10+ years in athletic development."
    },
  };
  document.querySelectorAll('.leader-card').forEach(card => {
    const leaderType = card.getAttribute('data-leader');
    card.querySelector('button')?.addEventListener('click', () => {
      const data = trainerData[leaderType];
      if (data) {
        showModal(`
          <div style="text-align:center;">
            <img src="${data.img}" style="width:100px; height:100px; border-radius:50%; object-fit:cover; border:2px solid #FFD700; margin-bottom:1rem;">
            <h2 style="color:#FFD700;">${data.name}</h2>
            <p style="color:#bbb;">${data.position}</p>
            <p style="line-height:1.5; margin-top:1rem;">${data.bio}</p>
          </div>
        `);
      }
    });
  });

  // ========== LUXURY COMPARISON SLIDER (FIXED: BEFORE LEFT, AFTER RIGHT) ==========
  function initLuxurySlider(sliderElement) {
    const beforeUrl = sliderElement.getAttribute('data-before');
    const afterUrl = sliderElement.getAttribute('data-after');
    const beforeImg = sliderElement.querySelector('.before-image');
    const afterImg = sliderElement.querySelector('.after-image');
    const afterContainer = sliderElement.querySelector('.after-image-container');
    const handle = sliderElement.querySelector('.slider-handle');
    const percentageDisplay = sliderElement.querySelector('.drag-percentage');
    if (!beforeImg || !afterImg) return;

    // CORRECT ORDER: left side is BEFORE, right side is AFTER
    beforeImg.src = beforeUrl;   // static background image (before)
    afterImg.src = afterUrl;     // revealed image (after)

    let startX = 0, startPercent = 50, isDragging = false;

    function setPosition(percent) {
      percent = Math.min(Math.max(percent, 0), 100);
      afterContainer.style.width = percent + '%';
      handle.style.left = percent + '%';
      if (percentageDisplay) percentageDisplay.textContent = Math.round(percent) + '%';
    }

    function handleDragStart(e) {
      isDragging = true;
      sliderElement.classList.add('dragging');
      e.preventDefault();
      const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
      const rect = sliderElement.getBoundingClientRect();
      const relativeX = Math.min(Math.max(0, clientX - rect.left), rect.width);
      startPercent = (relativeX / rect.width) * 100;
      startX = clientX;
    }

    function handleDragMove(e) {
      if (!isDragging) return;
      e.preventDefault();
      let clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
      const rect = sliderElement.getBoundingClientRect();
      let deltaX = clientX - startX;
      let newPercent = startPercent + (deltaX / rect.width) * 100;
      newPercent = Math.min(Math.max(newPercent, 0), 100);
      setPosition(newPercent);
    }

    function handleDragEnd() {
      isDragging = false;
      sliderElement.classList.remove('dragging');
    }

    handle.addEventListener('mousedown', handleDragStart);
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
    handle.addEventListener('touchstart', handleDragStart, { passive: false });
    window.addEventListener('touchmove', handleDragMove, { passive: false });
    window.addEventListener('touchend', handleDragEnd);

    // Auto-animation (optional)
    function autoAnimate() {
      const start = 20, mid = 80, end = 50, duration = 1500;
      const startTime = performance.now();
      function animate(now) {
        const elapsed = now - startTime;
        let t = Math.min(elapsed / duration, 1);
        let percent;
        if (t <= 0.5) percent = start + (mid - start) * (t * 2);
        else percent = mid + (end - mid) * ((t - 0.5) * 2);
        setPosition(percent);
        if (t < 1) requestAnimationFrame(animate);
        else setPosition(end);
      }
      requestAnimationFrame(animate);
    }
    setTimeout(autoAnimate, 500);
    setPosition(50);
  }

  document.querySelectorAll('.luxury-comparison-slider').forEach(slider => initLuxurySlider(slider));

  // ========== WHATSAPP BUTTONS ==========
  document.querySelectorAll('.btn-gold-whatsapp').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = btn.getAttribute('data-product');
      const msg = `Hello UltraFit Gym, I am interested in ${product}. Is it in stock?`;
      window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    });
  });

  // ========== ACTION BUTTONS (Placeholder alerts) ==========
  document.querySelectorAll('.btn-see-more, .visit-shop-btn, .full-plan-btn, .full-workout-btn, .view-members-btn').forEach(btn => {
    btn.addEventListener('click', () => alert('✨ Full experience coming soon in the UltraFit ecosystem.'));
  });

  // ========== SCROLL FADE-IN ==========
  const fadeElements = document.querySelectorAll('.service-item, .leader-card, .trans-card, .product-card, .diet-card, .workout-card');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('appear'); });
  }, { threshold: 0.2 });
  fadeElements.forEach(el => { el.classList.add('fade-up'); fadeObserver.observe(el); });

  // ========== PREMIUM CAROUSELS (gallery, reels, reviews) ==========
  class InfiniteCarousel {
    constructor(containerId, itemsContainerId, dotsContainerId, prevBtnId, nextBtnId, itemType, originalItems, options = {}) {
      this.container = document.getElementById(containerId);
      this.itemsContainer = document.getElementById(itemsContainerId);
      this.dotsContainer = document.getElementById(dotsContainerId);
      this.prevBtn = document.getElementById(prevBtnId);
      this.nextBtn = document.getElementById(nextBtnId);
      this.itemType = itemType;
      this.originalItems = originalItems;
      this.totalReal = originalItems.length;
      this.infiniteItems = [originalItems[originalItems.length - 1], ...originalItems, originalItems[0]];
      this.currentRealIndex = 0;
      this.currentInfiniteIndex = 1;
      this.isTransitioning = false;
      this.autoSlideEnabled = options.autoSlide || false;
      this.autoSlideDelay = options.autoSlideDelay || 3000;
      this.pauseOnHover = options.pauseOnHover || true;
      this.autoSlideInterval = null;
      this.isHovered = false;
      this.initDOM();
      this.attachEvents();
      this.updateCarousel(false);
      if (this.autoSlideEnabled) this.startAutoSlide();
      if (this.pauseOnHover) this.setupHoverPause();
    }

    initDOM() {
      this.itemsContainer.innerHTML = '';
      this.infiniteItems.forEach((src, idx) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'carousel-item';
        if (this.itemType === 'image') {
          const img = document.createElement('img');
          img.src = src;
          img.alt = `Gallery ${idx}`;
          img.loading = 'lazy';
          slideDiv.appendChild(img);
        } else {
          const video = document.createElement('video');
          video.src = src;
          video.muted = true;
          video.playsInline = true;
          video.setAttribute('playsinline', '');
          slideDiv.appendChild(video);
        }
        this.itemsContainer.appendChild(slideDiv);
      });
      this.updateDots();
    }

    updateDots() {
      if (!this.dotsContainer) return;
      this.dotsContainer.innerHTML = '';
      for (let i = 0; i < this.totalReal; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === this.currentRealIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
          if (!this.isTransitioning) this.goToRealIndex(i);
        });
        this.dotsContainer.appendChild(dot);
      }
    }

    setActiveDot() {
      const dots = this.dotsContainer?.querySelectorAll('.dot');
      dots?.forEach((dot, idx) => {
        if (idx === this.currentRealIndex) dot.classList.add('active');
        else dot.classList.remove('active');
      });
    }

    updateCarousel(withTransition = true) {
      if (!withTransition) this.itemsContainer.style.transition = 'none';
      else this.itemsContainer.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      const percent = -this.currentInfiniteIndex * 100;
      this.itemsContainer.style.transform = `translateX(${percent}%)`;
      if (!withTransition) this.itemsContainer.offsetHeight;
      if (this.itemType === 'video') this.manageVideoPlayback();
    }

    manageVideoPlayback() {
      const videos = this.itemsContainer.querySelectorAll('video');
      videos.forEach((vid, idx) => {
        if (idx === this.currentInfiniteIndex) {
          vid.currentTime = 0;
          vid.play().catch(e => console.log('autoplay blocked'));
          vid.onended = () => { if (!this.isTransitioning) this.nextSlide(); };
        } else {
          vid.pause();
          vid.currentTime = 0;
          vid.onended = null;
        }
      });
    }

    goToRealIndex(targetRealIndex) {
      if (this.isTransitioning) return;
      const delta = targetRealIndex - this.currentRealIndex;
      const newInfiniteIndex = this.currentInfiniteIndex + delta;
      this.currentRealIndex = targetRealIndex;
      this.currentInfiniteIndex = newInfiniteIndex;
      this.updateCarousel(true);
      this.setActiveDot();
      if (this.autoSlideEnabled) this.resetAutoSlideTimer();
      this.isTransitioning = true;
      this.itemsContainer.addEventListener('transitionend', () => this.handleTransitionEnd(), { once: true });
    }

    handleTransitionEnd() {
      this.isTransitioning = false;
      if (this.currentInfiniteIndex === 0) {
        this.currentRealIndex = this.totalReal - 1;
        this.currentInfiniteIndex = this.totalReal;
        this.updateCarousel(false);
        this.setActiveDot();
      } else if (this.currentInfiniteIndex === this.totalReal + 1) {
        this.currentRealIndex = 0;
        this.currentInfiniteIndex = 1;
        this.updateCarousel(false);
        this.setActiveDot();
      }
      if (this.itemType === 'video') this.manageVideoPlayback();
    }

    nextSlide() { if (!this.isTransitioning) this.goToRealIndex((this.currentRealIndex + 1) % this.totalReal); }
    prevSlide() { if (!this.isTransitioning) this.goToRealIndex((this.currentRealIndex - 1 + this.totalReal) % this.totalReal); }

    attachEvents() {
      this.prevBtn?.addEventListener('click', () => this.prevSlide());
      this.nextBtn?.addEventListener('click', () => this.nextSlide());
      // swipe gestures
      let startX = 0, isDragging = false, dragDistance = 0;
      const carouselMain = this.container.querySelector('.carousel-main');
      const onStart = (e) => {
        if (this.isTransitioning) return;
        isDragging = true;
        startX = (e.touches ? e.touches[0].clientX : e.clientX);
        dragDistance = 0;
        this.itemsContainer.style.transition = 'none';
      };
      const onMove = (e) => {
        if (!isDragging) return;
        const currentX = (e.touches ? e.touches[0].clientX : e.clientX);
        const delta = currentX - startX;
        dragDistance = delta;
        const currentPercent = -this.currentInfiniteIndex * 100;
        const newPercent = currentPercent + (delta / this.itemsContainer.parentElement.offsetWidth) * 100;
        this.itemsContainer.style.transform = `translateX(${newPercent}%)`;
      };
      const onEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        this.itemsContainer.style.transition = '';
        if (Math.abs(dragDistance) > 50) {
          if (dragDistance > 0) this.prevSlide();
          else this.nextSlide();
        } else {
          this.updateCarousel(true);
        }
      };
      carouselMain.addEventListener('mousedown', onStart);
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);
      carouselMain.addEventListener('touchstart', onStart, { passive: false });
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', onEnd);
    }

    startAutoSlide() {
      if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = setInterval(() => {
        if (!this.isTransitioning && !this.isHovered) this.nextSlide();
      }, this.autoSlideDelay);
    }

    resetAutoSlideTimer() {
      if (!this.autoSlideEnabled) return;
      if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
      this.startAutoSlide();
    }

    setupHoverPause() {
      this.container.addEventListener('mouseenter', () => { this.isHovered = true; });
      this.container.addEventListener('mouseleave', () => { this.isHovered = false; this.resetAutoSlideTimer(); });
    }
  }

  // Gallery images
  const galleryImages = [
    "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/260447/pexels-photo-260447.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/6457569/pexels-photo-6457569.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1200"
  ];
  // Reels videos (local files)
  const reelsVideos = [
    "UltraFit_Clip1.mp4",
    "UltraFit_Clip2.mp4",
    "UltraFit_Clip3.mp4"
  ];
  if (document.getElementById('galleryCarousel')) {
    new InfiniteCarousel('galleryCarousel', 'galleryItemsContainer', 'galleryDots', 'galleryPrevBtn', 'galleryNextBtn', 'image', galleryImages, { autoSlide: true });
  }
  if (document.getElementById('reelsCarousel')) {
    new InfiniteCarousel('reelsCarousel', 'reelsItemsContainer', 'reelsDots', 'reelsPrevBtn', 'reelsNextBtn', 'video', reelsVideos, { autoSlide: false });
  }

  // ========== GYM MEMBERS CAROUSEL ==========
  const membersData = [
    { name: "Daniel Chen", role: "Software Engineer", age: 28, bio: "From coding marathons to marathon runs, UltraFit gave me discipline.", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
    { name: "Olivia Park", role: "Student", age: 21, bio: "Balancing studies and fitness is hard, but the community keeps me motivated.", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
    { name: "Marcus Reed", role: "Business Owner", age: 42, bio: "UltraFit's training and nutrition plans are second to none.", avatar: "https://randomuser.me/api/portraits/men/52.jpg" },
    { name: "Sophia Laurent", role: "Artist", age: 26, bio: "Fitness is my creative outlet. The trainers understand strength.", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "James O'Connor", role: "Athlete", age: 31, bio: "Professional training environment without ego. Perfect for performance.", avatar: "https://randomuser.me/api/portraits/men/22.jpg" }
  ];
  const membersContainer = document.getElementById('membersCarouselItems');
  const membersPrevBtn = document.getElementById('membersPrevBtn');
  const membersNextBtn = document.getElementById('membersNextBtn');
  const membersDotsContainer = document.getElementById('membersDots');
  let currentMemberIndex = 0;
  let membersTransitioning = false;

  function renderMembers() {
    membersContainer.innerHTML = '';
    membersData.forEach(m => {
      const card = document.createElement('div');
      card.className = 'member-card';
      card.innerHTML = `
        <img class="member-avatar" src="${m.avatar}" alt="${m.name}" loading="lazy">
        <div class="member-name">${m.name}</div>
        <div class="member-role">${m.role}</div>
        <div class="member-age">${m.age} years old</div>
        <div class="member-bio">“${m.bio}”</div>
      `;
      membersContainer.appendChild(card);
    });
    updateMembersCarousel(false);
  }

  function updateMembersCarousel(withTransition = true) {
    if (withTransition) membersContainer.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    else membersContainer.style.transition = 'none';
    membersContainer.style.transform = `translateX(-${currentMemberIndex * 100}%)`;
    if (!withTransition) membersContainer.offsetHeight;
    updateMembersDots();
  }

  function updateMembersDots() {
    membersDotsContainer.innerHTML = '';
    for (let i = 0; i < membersData.length; i++) {
      const dot = document.createElement('div');
      dot.classList.add('members-dot');
      if (i === currentMemberIndex) dot.classList.add('active');
      dot.addEventListener('click', () => { if (!membersTransitioning) goToMemberIndex(i); });
      membersDotsContainer.appendChild(dot);
    }
  }

  function goToMemberIndex(index) {
    if (membersTransitioning) return;
    membersTransitioning = true;
    currentMemberIndex = index;
    updateMembersCarousel(true);
    setTimeout(() => membersTransitioning = false, 500);
  }

  membersPrevBtn?.addEventListener('click', () => goToMemberIndex((currentMemberIndex - 1 + membersData.length) % membersData.length));
  membersNextBtn?.addEventListener('click', () => goToMemberIndex((currentMemberIndex + 1) % membersData.length));
  if (membersContainer) renderMembers();

  // ========== REVIEWS CAROUSEL (auto-slide) with touch improvements ==========
  const reviewsData = [
    { name: "Amara Kapoor", avatar: "https://randomuser.me/api/portraits/women/68.jpg", rating: 5, text: "The best fitness decision I've ever made. World-class trainers." },
    { name: "James Laurent", avatar: "https://randomuser.me/api/portraits/men/32.jpg", rating: 5, text: "Elite equipment, gold-standard training. UltraFit is a game changer." },
    { name: "Sophia Ramirez", avatar: "https://randomuser.me/api/portraits/women/44.jpg", rating: 5, text: "The energy, the community, the results — unmatched." },
    { name: "Liam Williams", avatar: "https://randomuser.me/api/portraits/men/22.jpg", rating: 4, text: "Life-changing journey. The coaches really care about your progress." },
    { name: "Mia Chen", avatar: "https://randomuser.me/api/portraits/women/89.jpg", rating: 5, text: "Luxury meets hardcore fitness. Results speak for themselves." }
  ];
  const reviewItems = document.getElementById('reviewCarouselItems');
  const reviewPrev = document.getElementById('reviewPrevBtn');
  const reviewNext = document.getElementById('reviewNextBtn');
  const reviewDots = document.getElementById('reviewDots');
  let currentReview = 0;
  let reviewTransition = false;
  let autoSlideReview;

  function renderReviews() {
    reviewItems.innerHTML = '';
    reviewsData.forEach(r => {
      const stars = Array(5).fill().map((_, i) => `<i class="fas fa-star ${i < r.rating ? '' : 'inactive'}"></i>`).join('');
      const card = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML = `
        <img class="review-avatar" src="${r.avatar}" alt="${r.name}" loading="lazy">
        <div class="review-name">${r.name}</div>
        <div class="review-stars">${stars}</div>
        <div class="review-text">“${r.text}”</div>
      `;
      reviewItems.appendChild(card);
    });
    updateReviewCarousel(false);
  }

  function updateReviewCarousel(withTransition = true) {
    if (withTransition) reviewItems.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    else reviewItems.style.transition = 'none';
    reviewItems.style.transform = `translateX(-${currentReview * 100}%)`;
    if (!withTransition) reviewItems.offsetHeight;
    updateReviewDots();
  }

  function updateReviewDots() {
    reviewDots.innerHTML = '';
    for (let i = 0; i < reviewsData.length; i++) {
      const dot = document.createElement('div');
      dot.classList.add('review-dot');
      if (i === currentReview) dot.classList.add('active');
      dot.addEventListener('click', () => { if (!reviewTransition) goToReview(i); });
      reviewDots.appendChild(dot);
    }
  }

  function goToReview(index) {
    if (reviewTransition) return;
    reviewTransition = true;
    currentReview = index;
    updateReviewCarousel(true);
    setTimeout(() => reviewTransition = false, 500);
    resetAutoSlide();
  }

  function nextReview() { goToReview((currentReview + 1) % reviewsData.length); }
  function prevReview() { goToReview((currentReview - 1 + reviewsData.length) % reviewsData.length); }

  function startAutoSlide() {
    if (autoSlideReview) clearInterval(autoSlideReview);
    autoSlideReview = setInterval(() => { if (!reviewTransition) nextReview(); }, 3000);
  }
  function resetAutoSlide() { if (autoSlideReview) { clearInterval(autoSlideReview); startAutoSlide(); } }

  reviewPrev?.addEventListener('click', () => { prevReview(); resetAutoSlide(); });
  reviewNext?.addEventListener('click', () => { nextReview(); resetAutoSlide(); });
  if (reviewItems) { renderReviews(); startAutoSlide(); }

  // Swipe for reviews with passive: false for better touch handling
  let startX = 0, isDragging = false, dragDist = 0;
  const reviewMain = document.querySelector('.review-carousel-main');
  const onStart = (e) => { if (reviewTransition) return; isDragging = true; startX = (e.touches ? e.touches[0].clientX : e.clientX); dragDist = 0; reviewItems.style.transition = 'none'; };
  const onMove = (e) => { if (!isDragging) return; const curX = (e.touches ? e.touches[0].clientX : e.clientX); const delta = curX - startX; dragDist = delta; const percent = -currentReview * 100 + (delta / reviewItems.parentElement.offsetWidth) * 100; reviewItems.style.transform = `translateX(${percent}%)`; };
  const onEnd = () => { if (!isDragging) return; isDragging = false; reviewItems.style.transition = ''; if (Math.abs(dragDist) > 50) { if (dragDist > 0) prevReview(); else nextReview(); resetAutoSlide(); } else updateReviewCarousel(true); };
  reviewMain?.addEventListener('mousedown', onStart);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onEnd);
  reviewMain?.addEventListener('touchstart', onStart, { passive: false });
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('touchend', onEnd);
});