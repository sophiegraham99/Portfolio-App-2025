/***************************************************
Spinning Text Effect
***************************************************/
const degreeToRadian = (angle) => {
  return angle * (Math.PI / 180);
};

const radius = 40;
const diameter = radius * 2;

const circle = document.querySelector("#circle");
circle.style.width = `${diameter}px`;
circle.style.height = `${diameter}px`;

const text = circle.dataset.text;
const characters = text.split("");

const deltaAngle = 360 / characters.length;
const characterOffsetAngle = 8;
let currentAngle = -90;

characters.forEach((character, index) => {
  const span = document.createElement("span");
  span.innerText = character;
  const xPos = radius * (1 + Math.cos(degreeToRadian(currentAngle)));
  const yPos = radius * (1 + Math.sin(degreeToRadian(currentAngle)));

  const transform = `translate(${xPos}px, ${yPos}px)`;
  const rotate = `rotate(${(index * deltaAngle) + characterOffsetAngle}deg)`;
  span.style.transform = `${transform} ${rotate}`;

  currentAngle += deltaAngle;
  circle.appendChild(span);
});



/***************************************************
Navigation Toggle Effect
***************************************************/
function toggleNav() {
  var nav = document.getElementById("myNav");
  var burgerMenu = document.querySelector(".burgermenu");
  if (nav.style.height === "100%") {
    nav.style.height = "0%";
    burgerMenu.classList.remove('opened'); 
  } else {
    nav.style.height = "100%";
    burgerMenu.classList.add('opened'); 
  }
}

document.querySelectorAll('.overlay-content a').forEach(item => {
  item.addEventListener('click', event => {
    toggleNav(); 
  });
});


/***************************************************
Background Stars Effect
***************************************************/
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

class Stars {
  constructor(el, options) {
    this.canvas = el;
    this.ctx = this.canvas.getContext('2d');
    this.options = Object.assign({
      stars: 200,
      colorRange: [0, 60, 240],
      speed: 2,
      onlyDraw: false,
      density: 800
    }, options);

    this.move = true;
    this.skipFrame = false;
    this.options.densityStars = this.options.stars;
    this.stars = [];

    this.start();
  }

  start() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.autoDensity();
    this.addStars();
    this.draw();

    window.addEventListener('resize', debounce(() => {
      this.restart();
    }, 100));
  }

  restart() {
    window.cancelAnimationFrame(this.drawFrame);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.stars.length = 0;
    this.autoDensity();
    this.addStars();
    this.draw();
  }

  addStars() {
    for (let i = 0; i < this.options.densityStars; i++) {
      const x = Math.random() * this.canvas.offsetWidth,
            y = Math.random() * this.canvas.offsetHeight,
            radius = Math.random() * 2,
            hue = this.options.colorRange[getRandom(0, this.options.colorRange.length - 1)],
            sat = getRandom(50, 100),
            alpha = Math.max(Math.random(), 0.05),
            speed = Math.random() * 0.5;

      this.stars.push(new Star(this.canvas, {
        x,
        y,
        hue,
        sat,
        radius,
        speed,
        alpha,
        speed: this.options.speed
      }));
    }
  }

  autoDensity() {
    const area = (this.canvas.width * this.canvas.height) / 1000;
    const numberParticles = area * this.options.stars / this.options.density;
    const missingParticles = this.options.stars - numberParticles;

    this.options.densityStars = this.options.stars + Math.abs(missingParticles) * (missingParticles < 0 ? 1 : -1);
  }

  draw() {
    if ((this.move && !this.skipFrame) || this.options.onlyDraw) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let star of this.stars) {
        star.move();
        star.draw();
      }
    }

    this.skipFrame = !this.skipFrame;
    if (!this.options.onlyDraw) {
      this.drawFrame = requestAnimationFrame(() => this.draw());
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Star {
  constructor(canvas, options) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = options;
    this.radius = this.options.radius;
    this.speed = this.options.speed;
    this.x = this.rx = this.options.x;
    this.y = this.ry = this.options.y;
    this.setVelocity();
  }

  setVelocity() {
    const alpha = this.options.alpha;
    if (alpha > 0 && alpha < 0.4) this.vy = -0.1;
    else if (alpha >= 0.4 && alpha < 0.7) this.vy = -0.3;
    else this.vy = -0.5;
    this.vx = 0;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.rx, this.ry, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = `hsla(${this.options.hue}, ${this.options.sat}%, 88%, ${this.options.alpha})`;
    this.ctx.fill();
  }

  move() {
    const ms = this.speed / 2;
    this.x += this.vx * ms;
    this.y += this.vy * ms;

    if (this.y + this.radius <= 0) {
      this.y = this.canvas.height;
    }

    this.rx = Math.round(this.x);
    this.ry = Math.round(this.y);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('canvas');
  if (canvas) new Stars(canvas);
});

/***************************************************
Icons move left on Scroll Effect
***************************************************/

window.addEventListener('scroll', () => {
  const section = document.querySelector('section.next');
  const svgs = section.querySelectorAll('svg');
  const sectionTop = section.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight && sectionTop > -section.offsetHeight) {
    const scrollProgress = 1 - (sectionTop / windowHeight); 
    const shift = scrollProgress * 200; 

    svgs.forEach((svg, index) => {
      svg.style.transform = `translateX(${-shift}px)`; 
    });
  }
});


/***************************************************
Let's Talk Footer Text Effect
***************************************************/
document.addEventListener("DOMContentLoaded", function () {
  const marquee = document.querySelector('.marquee');
  const text = marquee.querySelector('.lets-talk');
  const textCount = Math.ceil(window.innerWidth / text.offsetWidth) * 2;
  for (let i = 1; i < textCount; i++) {
    const clone = text.cloneNode(true);
    marquee.appendChild(clone);
  }
});


/***************************************************
Skills Scroll Bar Effect
***************************************************/
const scrollableList = document.getElementById('scrollableList');
const progressBar = document.getElementById('progressBar');

scrollableList.addEventListener('scroll', () => {
  const scrollTop = scrollableList.scrollTop;
  const scrollHeight = scrollableList.scrollHeight - scrollableList.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;
  progressBar.style.height = scrollPercent + "%";
});

/***************************************************
Skills GSAP Effect
***************************************************/
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".skills-list li").forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: i * 0.05, 
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });
});