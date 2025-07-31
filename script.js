$(window).on('scroll', function() {
    var scroll = $(window).scrollTop();
  
    console.log(scroll > 100);
  
    if (scroll) {
      $('nav').removeClass('nav-fade');
      $('nav').addClass('nav-show');
    }
  
    else {
      $('nav').removeClass('nav-show');
      $('nav').addClass('nav-fade')
    }
  })
  
  function nav() {
    document.getElementById("navbar").classList.toggle("nav-open");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const phrases = ["math", "reading", "physics", "coding", "writing", "English", "history", "algebra"]
const typewriter = document.getElementById("typewriter");

let sleepTime = 100;

let curPhraseIndex = 0;

const typeWriter = async() => {
  while (true) {
    let curWord = phrases[curPhraseIndex];

    for (let i = 0; i < curWord.length; i++) {
      typewriter.innerText = curWord.substring(0, i+1);

      await sleep(sleepTime);
    }

    await sleep(sleepTime * 10);

    for (let i = curWord.length; i > 0; i--) {
      typewriter.innerText = curWord.substring(0, i-1);

      await sleep(sleepTime);
    }

    await sleep(sleepTime * 2);

    if (curPhraseIndex === phrases.length - 1) {
      curPhraseIndex = 0;
    }

    else {
      curPhraseIndex++;
    }

  }
}

typeWriter();

const carouselImages = [
  "https://www.learntobe.org/assets/photos/tutor-at-laptop-92fbe612c8c02f139d997ce30c9136e31916723b1fafb09d2a0f4be223f7c71c.jpg",
  "https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?cs=srgb&dl=pexels-julia-m-cameron-4144222.jpg&fm=jpg"
];

let carouselIndex = 0;

const chevronLeft = document.getElementById("chevronLeft");
const chevronRight = document.getElementById("chevronRight");
const carouselContainers = document.getElementById("carouselContainers");
const carouselImage = document.getElementById("carouselImage");

for (let i = 0; i < carouselImages.length; i++) {
  let child = document.createElement("div");
  child.id = "carousel" + i;
  child.style.width = "10px";
  child.style.height = "10px";
  child.style.backgroundColor = "#1f1f1f";
  child.style.borderRadius = "50%";
  carouselContainers.appendChild(child);
}

function updateChevronStyles() {
  chevronRight.style.color = "#1f1f1f";
  chevronRight.style.opacity = carouselIndex + 1 === carouselImages.length ? "0.5" : "1";
  chevronRight.style.cursor = carouselIndex + 1 === carouselImages.length ? "default" : "pointer";

  chevronLeft.style.color = "#1f1f1f";
  chevronLeft.style.opacity = carouselIndex === 0 ? "0.5" : "1";
  chevronLeft.style.cursor = carouselIndex === 0 ? "default" : "pointer";
}

function updateImage() {
  carouselImage.src = carouselImages[carouselIndex];
}

function colorChevronSelector() {
  const element = document.getElementById("carousel" + carouselIndex);
  element.style.backgroundColor = "#6d48ffff";
}

function discolorChevronSelector() {
  const element = document.getElementById("carousel" + carouselIndex);
  element.style.backgroundColor = "#1f1f1f";
}

function handleImageChange(newIndex) {
  if (newIndex < 0 || newIndex >= carouselImages.length) return;

  carouselImage.classList.remove("fade-in", "fade-out");

  // Start fade-out
  carouselImage.classList.add("fade-out");

  // Wait for fade-out to finish before switching image
  carouselImage.addEventListener("animationend", function onFadeOut() {
    carouselImage.removeEventListener("animationend", onFadeOut);

    discolorChevronSelector();

    carouselIndex = newIndex;
    updateImage();
    updateChevronStyles();
    colorChevronSelector();

    carouselImage.classList.remove("fade-out");
    carouselImage.classList.add("fade-in");

    // Clean up after fade-in completes
    carouselImage.addEventListener("animationend", function onFadeIn() {
      carouselImage.classList.remove("fade-in");
      carouselImage.removeEventListener("animationend", onFadeIn);
    });
  });
}

chevronRight.addEventListener("click", () => handleImageChange(carouselIndex + 1));
chevronLeft.addEventListener("click", () => handleImageChange(carouselIndex - 1));

// Initialize
updateChevronStyles();
updateImage();
colorChevronSelector();
