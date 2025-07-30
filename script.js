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

const whileLoop = async() => {
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

whileLoop();