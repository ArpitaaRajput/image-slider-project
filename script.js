const slider = document.getElementById("slider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const autoBtn = document.getElementById("autoBtn");

let currentIndex = 0;
const totalImages = slider.children.length;
let isAutoPlaying = false;
let autoSlide;

// Function to slide normally
function slideTo(index) {
  slider.style.transition = "transform 0.6s ease-in-out";
  slider.style.transform = `translateX(-${index * 100}%)`;
}

// Function to change image and handle loop
function showImage(index) {
  currentIndex = index;
  slideTo(currentIndex);
}

// When the transition ends (after sliding)
slider.addEventListener("transitionend", () => {
  // If we've moved past the last image → instantly jump to first
  if (currentIndex >= totalImages) {
    slider.style.transition = "none";
    currentIndex = 0;
    slider.style.transform = `translateX(0)`;
  }

  // If we go before the first image → instantly jump to last
  if (currentIndex < 0) {
    slider.style.transition = "none";
    currentIndex = totalImages - 1;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
});   

// Manual navigation
prevBtn.addEventListener("click", () => {
  if (currentIndex === 0) {
    // Temporarily disable transition for instant jump
    slider.style.transition = "none";
    currentIndex = totalImages - 1;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Re-enable smooth transition (important!)
    setTimeout(() => {
      slider.style.transition = "transform 0.6s ease-in-out";
    }, 50);
  } else {
    currentIndex--;
    showImage(currentIndex);
  }
});

nextBtn.addEventListener("click", () => {
  currentIndex++;
  showImage(currentIndex);
});

// Auto play toggle
autoBtn.addEventListener("click", () => {
  if (!isAutoPlaying) {
    autoSlide = setInterval(() => {
      currentIndex++;
      showImage(currentIndex);
    }, 1000);
    autoBtn.textContent = "Stop Slideshow";
    isAutoPlaying = true;
  } else {
    clearInterval(autoSlide);
    autoBtn.textContent = "Start Slideshow Automatically";
    isAutoPlaying = false;
  }
});

// Start with first image
showImage(currentIndex);
