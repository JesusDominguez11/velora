<template>
  <div>
    <!-- Preloader -->
    <div class="preloader" v-if="!isLoaded">
      <div class="preloader-content">
        <div class="image-container">
          <div
            v-for="(image, index) in images"
            :key="index"
            :id="`image-${image.percentage}`"
            class="image-wrapper"
          >
            <img :src="image.src" :alt="`Preloader Image ${index + 1}`">
          </div>
        </div>
        <div class="preloader-percentage">{{ currentPercentage }}</div>
      </div>

      <!-- Text Lines Container (Preloader) -->
      <div class="text-container">
        <div
          v-for="(line, index) in preloaderLines"
          :key="`pre-${index}`"
          class="text-line"
          :style="{ opacity: textLineOpacity[index] }"
        >
          {{ line }}
        </div>
      </div>
    </div>

    <!-- Main Content (shown after preloader) -->
    <div v-if="isLoaded">
      <!-- Header Navigation -->
      <header class="header">
        <div class="logo-left">REDUCE</div>
        <nav class="nav-center">
          <ul>
            <li v-for="(item, index) in navItems" :key="index">{{ item }}</li>
          </ul>
        </nav>
        <div class="nav-right">+GET IN TOUCH</div>
      </header>

      <!-- Final Content -->
      <div class="text-container-final">
        <div
          v-for="(line, index) in finalLines"
          :key="`final-${index}`"
          class="text-line-final"
        >
          {{ line }}
        </div>
      </div>

      <!-- Hero Text (Big Title) -->
      <div class="big-title">
        <div class="title-line" v-for="(line, index) in titleLines" :key="`title-${index}`">
          <span>{{ line }}</span>
        </div>
      </div>

      <!-- Restart Button -->
      <button class="restart-btn" @click="restartAnimation">
        <div class="dot-container">
          <!-- Initial 4 dots -->
          <div class="dot" v-for="i in 4" :key="`dot-${i}`"></div>

          <!-- Additional 4 dots (hidden initially) -->
          <div class="dot" v-for="i in 4" :key="`dot-add-${i}`"></div>

          <!-- Center dot (hidden initially) -->
          <div class="center-dot"></div>
        </div>
      </button>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

export default defineComponent({
  name: 'PreloaderComponent',
  setup() {
    const isLoaded = ref(false);
    const currentPercentage = ref(0);
    const textLineOpacity = ref<number[]>([]);

    // Data
    const images = [
      { percentage: 0, src: 'https://cdn.cosmos.so/4900e2ad-dfdb-4f6a-8ca8-6700144e6c89?format=jpeg' },
      { percentage: 20, src: 'https://cdn.cosmos.so/acdef0b0-0321-4f80-9ab0-7932ccb88554?format=jpeg' },
      { percentage: 60, src: 'https://cdn.cosmos.so/09eb737d-c269-4fa6-a77c-4ada27419be0?format=jpeg' },
      { percentage: 80, src: 'https://cdn.cosmos.so/e9b9e7dc-73f5-4f7c-bbb3-ad2e3589bda0?format=jpeg' },
      { percentage: 100, src: 'https://cdn.cosmos.so/5b5c5242-4598-4d51-9891-0e90eeef6727?format=jpeg' }
    ];

    const preloaderLines = [
      'Winning is a habit.',
      'Champions are made daily.',
      'Obstacles fuel growth.',
      'The mind conquers first.',
      'Success demands sacrifice.',
      'Greatness never rests.',
      'Victory is earned.',
      'Persistence prevails.'
    ];

    const finalLines = [
      'Embrace the challenge.',
      'Find your purpose.',
      'Commit to excellence.',
      'Trust the process.',
      'Silence the doubters.',
      'Rise above fear.',
      'Own your destiny.',
      'Leave a legacy.'
    ];

    const titleLines = ['WINNING', 'MINDSET', 'ALWAYS'];
    const navItems = ['FOCUS', 'CLARITY', 'SIMPLIFY', 'TRUTH'];

    // Initialize text line opacities
    textLineOpacity.value = new Array(preloaderLines.length).fill(0);

    // Animation timeline
    let mainTl: gsap.core.Timeline;

    // Create custom easing functions
    CustomEase.create("customEase", "0.6, 0.01, 0.05, 1");
    CustomEase.create("blurEase", "0.25, 0.1, 0.25, 1");
    CustomEase.create("counterEase", "0.35, 0.0, 0.15, 1");
    CustomEase.create("gentleIn", "0.38, 0.005, 0.215, 1");

    const initAnimation = () => {
      if (mainTl) mainTl.kill();

      // Reset states
      isLoaded.value = false;
      currentPercentage.value = 0;
      textLineOpacity.value = new Array(preloaderLines.length).fill(0);

      // Ensure restart button and header are hidden initially
      gsap.set(".restart-btn", { opacity: 0, pointerEvents: "none" });
      gsap.set(".header", { opacity: 1 });
      gsap.set(".logo-left", { opacity: 0, y: 10 });
      gsap.set(".nav-center li", { opacity: 0, y: 10 });
      gsap.set(".nav-right", { opacity: 0, y: 10 });
      gsap.set(".text-container-final", { opacity: 0 });
      gsap.set(".text-line-final", { opacity: 0 });
      gsap.set(".big-title", { opacity: 0 });
      gsap.set(".big-title .title-line span", { y: "100%", opacity: 0 });

      const percentages = [0, 20, 60, 80, 99];
      const wrappers = percentages.map(p => document.getElementById(`image-${p}`));
      const percentageElement = document.querySelector(".preloader-percentage");
      const imageContainer = document.querySelector(".image-container");
      const finalWrapper = document.getElementById("image-100");
      const finalImage = finalWrapper?.querySelector("img");

      // Reset wrappers and container dimensions
      gsap.set(wrappers, { visibility: "hidden", clipPath: "inset(100% 0 0 0" });
      if (wrappers[0]) gsap.set(wrappers[0], { visibility: "visible" });
      gsap.set(imageContainer, { width: "400px", height: "500px" });
      gsap.set(".image-wrapper img", {
        scale: 1.2,
        transformOrigin: "center center"
      });

      // Set preloader overlay to start with solid black background
      gsap.set(".preloader", { display: "flex", opacity: 1, y: 0 });
      document.querySelector(".preloader")?.style.setProperty('background-color', '#000');

      mainTl = gsap.timeline();

      // Animate text lines in
      mainTl.to(
        ".text-line",
        {
          opacity: 1,
          duration: 0.15,
          stagger: 0.075,
          ease: "gentleIn"
        },
        0.5
      );

      // Change color of text lines
      mainTl.to(
        ".text-line",
        {
          color: "#fff",
          duration: 0.15,
          stagger: 0.075,
          ease: "blurEase"
        },
        "+=0.5"
      );

      // Improved synchronization for image changes and percentage updates
      percentages.forEach((percentage, index) => {
        const windowWidth = window.innerWidth;
        const fontSizeRem = 14;
        const fontSizePx =
          fontSizeRem *
          parseFloat(getComputedStyle(document.documentElement).fontSize);
        const textWidth = String(percentage).length * (fontSizePx * 0.6);
        const padding = 32;
        let leftPosition;
        if (percentage === 0) {
          leftPosition = padding + "px";
        } else if (percentage === 99) {
          leftPosition = windowWidth - textWidth - padding + "px";
        } else {
          const availableWidth = windowWidth - 2 * padding - textWidth;
          leftPosition = padding + (availableWidth * percentage) / 100 + "px";
        }

        // Create a synchronized label for this step
        mainTl.add(`step${percentage}`, index * 1.5);

        // Set image wrapper to visible
        mainTl.set(wrappers[index], { visibility: "visible" }, `step${percentage}`);

        // Animate image reveal and percentage change simultaneously
        mainTl.to(
          wrappers[index],
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 0.65,
            ease: "customEase"
          },
          `step${percentage}`
        );

        // Update percentage value
        mainTl.to(
          this,
          {
            currentPercentage: percentage,
            duration: 0.65,
            ease: "counterEase",
            onUpdate: () => {
              if (percentageElement) {
                percentageElement.textContent = `${currentPercentage.value}`;
                percentageElement.style.left = leftPosition;
              }
            },
            onStart: () => {
              if (percentageElement) {
                gsap.fromTo(
                  percentageElement,
                  { filter: "blur(8px)" },
                  { filter: "blur(0px)", duration: 0.5, ease: "power2.inOut" }
                );
              }
            }
          },
          `step${percentage}`
        );

        // Hide previous image after current one is revealed
        if (index > 0) {
          mainTl.to(
            wrappers[index - 1],
            {
              clipPath: "inset(100% 0 0 0)",
              duration: 0.5,
              ease: "customEase",
              onComplete: () => {
                gsap.set(wrappers[index - 1], { visibility: "hidden" });
              }
            },
            `step${percentage}+=0.15`
          );
        }
      });

      // Animate text lines out before final phase
      mainTl.to(
        ".text-line",
        {
          opacity: 0,
          duration: 0.15,
          stagger: 0.075,
          ease: "counterEase"
        },
        "step99+=1"
      );

      // Final phase
      mainTl.add("expandFinal", ">");
      mainTl.to({}, { duration: 0.5 }, "expandFinal");

      // Expand image container to full screen
      mainTl.to(
        imageContainer,
        {
          width: "100vw",
          height: "100vh",
          duration: 1.2,
          ease: "gentleIn"
        },
        "expandFinal+=0.5"
      );

      // Scale final image
      if (finalImage) {
        mainTl.to(
          finalImage,
          {
            scale: 1.0,
            duration: 1.2,
            ease: "gentleIn"
          },
          "expandFinal+=0.5"
        );
      }

      // Fade out percentage
      mainTl.to(
        percentageElement,
        {
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.5,
          ease: "power2.out"
        },
        "expandFinal+=0.5"
      );

      // Show header with staggered animation
      mainTl.to(
        ".logo-left",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "customEase"
        },
        "expandFinal+=1.2"
      );

      // Staggered animation for nav center items
      mainTl.to(
        ".nav-center li",
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "customEase"
        },
        "expandFinal+=1.3"
      );

      // Animation for nav right
      mainTl.to(
        ".nav-right",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "customEase"
        },
        "expandFinal+=1.7"
      );

      // Animate in the final text lines
      mainTl.to(
        ".text-container-final",
        {
          opacity: 1,
          duration: 0.1
        },
        "expandFinal+=1.5"
      );

      mainTl.to(
        ".text-line-final",
        {
          opacity: 1,
          color: "#fff",
          duration: 0.15,
          stagger: 0.075,
          ease: "gentleIn"
        },
        "expandFinal+=1.6"
      );

      // Show restart button
      mainTl.to(
        ".restart-btn",
        {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.3,
          ease: "hop"
        },
        "expandFinal+=1.2"
      );

      // Change preloader background opacity
      mainTl.to(
        ".preloader",
        {
          backgroundColor: "rgba(0,0,0,0.5)",
          duration: 0.5,
          ease: "customEase"
        },
        "expandFinal+=0.7"
      );

      // Animate hero text (big title) appearance
      mainTl.to(".big-title", { opacity: 1, duration: 0.1 }, "expandFinal+=1.8");
      mainTl.to(
        ".big-title .title-line span",
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power4.out"
        },
        "expandFinal+=1.8"
      );

      // Mark as loaded at the end of animation
      mainTl.call(() => {
        isLoaded.value = true;
      }, [], "expandFinal+=2");
    };

    const restartAnimation = () => {
      gsap.killTweensOf("*");

      // Reset preloader overlay to initial state
      gsap.set(".preloader", { display: "flex", opacity: 1, y: 0 });
      document.querySelector(".preloader")?.style.setProperty('background-color', '#000');

      const imageContainer = document.querySelector(".image-container");
      gsap.set(imageContainer, { width: "400px", height: "500px" });

      const percentageElement = document.querySelector(".preloader-percentage");
      gsap.set(percentageElement, {
        filter: "blur(0px)",
        opacity: 1,
        textContent: "0",
        left: "2rem"
      });

      const wrappers = document.querySelectorAll(".image-wrapper");
      gsap.set(wrappers, {
        clipPath: "inset(100% 0 0 0)",
        visibility: "hidden",
        position: "absolute",
        top: 0,
        left: 0
      });
      if (wrappers[0]) gsap.set(wrappers[0], { visibility: "visible" });

      gsap.set(".image-wrapper img", {
        scale: 1.2,
        transformOrigin: "center center"
      });
      gsap.set(".restart-btn", { opacity: 0, pointerEvents: "none" });
      gsap.set(".header", { opacity: 1 });
      gsap.set(".logo-left", { opacity: 0, y: 10 });
      gsap.set(".nav-center li", { opacity: 0, y: 10 });
      gsap.set(".nav-right", { opacity: 0, y: 10 });
      gsap.set(".big-title", { opacity: 0 });
      gsap.set(".big-title .title-line span", { y: "100%", opacity: 0 });
      gsap.set(".text-line", { opacity: 0, color: "#4f4f4f" });
      gsap.set(".text-line-final", { opacity: 0 });
      gsap.set(".text-container-final", { opacity: 0 });

      isLoaded.value = false;
      currentPercentage.value = 0;

      setTimeout(initAnimation, 100);
    };

    const setupButtonHover = () => {
      const restartBtn = document.querySelector(".restart-btn");
      const additionalDots = document.querySelectorAll(".dot:nth-child(n+5)");
      const centerDot = document.querySelector(".center-dot");

      if (restartBtn && additionalDots && centerDot) {
        // Restart button hover animations
        restartBtn.addEventListener("mouseenter", () => {
          // Show additional 4 dots
          gsap.to(additionalDots, {
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "customEase"
          });

          // Show and scale up center dot
          gsap.to(centerDot, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "gentleIn"
          });
        });

        restartBtn.addEventListener("mouseleave", () => {
          // Hide additional 4 dots
          gsap.to(additionalDots, {
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "customEase"
          });

          // Hide and scale down center dot
          gsap.to(centerDot, {
            opacity: 0,
            scale: 0,
            duration: 0.4,
            ease: "gentleIn"
          });
        });
      }
    };

    onMounted(() => {
      setTimeout(() => {
        initAnimation();
        setupButtonHover();
      }, 100);
    });

    return {
      isLoaded,
      currentPercentage,
      textLineOpacity,
      images,
      preloaderLines,
      finalLines,
      titleLines,
      navItems,
      restartAnimation
    };
  }
});
</script>

<style scoped>
/* Your CSS styles here (same as in your original code) */
@font-face {
  src: url("https://fonts.cdnfonts.com/css/pp-neue-montreal") format("woff2");
  font-family: "PP Neue Montreal", sans-serif;
  font-weight: 400;
}

*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: calc(100vw / 1512 * 10);
}

body {
  font-family: "PP Neue Montreal", sans-serif;
  font-weight: 700;
  font-size: 1.8rem;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
  background-color: #000;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: white;
  position: relative;
}

/* Background noise effect */
body::before {
  content: "";
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: transparent
    url("http://assets.iceable.com/img/noise-transparent.png") repeat 0 0;
  background-size: 300px 300px;
  animation: noise-animation 0.3s steps(5) infinite;
  opacity: 0.8;
  will-change: transform;
  z-index: 100;
  pointer-events: none;
}

@keyframes noise-animation {
  0% {
    transform: translate(0, 0);
  }

  10% {
    transform: translate(-2%, -3%);
  }

  20% {
    transform: translate(-4%, 2%);
  }

  30% {
    transform: translate(2%, -4%);
  }

  40% {
    transform: translate(-2%, 5%);
  }

  50% {
    transform: translate(-4%, 2%);
  }

  60% {
    transform: translate(3%, 0);
  }

  70% {
    transform: translate(0, 3%);
  }

  80% {
    transform: translate(-3%, 0);
  }

  90% {
    transform: translate(2%, 2%);
  }

  100% {
    transform: translate(1%, 0);
  }
}

/* Header Navigation */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 10003;
  opacity: 0;
}

.logo-left {
  color: #fff;
  font-size: 1.8rem;
  position: relative;
  display: inline-block;
}

.nav-center {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1.8rem;
  line-height: 1.1;
}

.nav-center ul {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  align-items: flex-start;
  gap: 0.2rem;
}

.nav-center li {
  font-size: 2rem;
  position: relative;
  cursor: pointer;
  color: white;
  padding: 0;
  display: inline-block;
  z-index: 1;
  opacity: 0;
  transform: translateY(10px);
}

.nav-center li:first-child {
  margin-top: 0;
}

.nav-center li::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: white;
  z-index: -1;
  transition: width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.nav-center li:hover::after {
  width: 100%;
}

.nav-center li:hover {
  color: black;
  mix-blend-mode: difference;
}

.nav-right {
  font-size: 1.8rem;
  opacity: 0;
  position: relative;
  cursor: pointer;
  display: inline-block;
  z-index: 1;
}

.nav-right::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: white;
  z-index: -1;
  transition: width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.nav-right:hover::after {
  width: 100%;
}

.nav-right:hover {
  color: black;
  mix-blend-mode: difference;
}

/* Preloader */
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.preloader-content {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container {
  position: relative;
  width: 400px;
  height: 500px;
  overflow: hidden;
}

.image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
}

/* Final image special handling */
#image-100 {
  z-index: 10;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preloader-percentage {
  position: absolute;
  bottom: 5%;
  left: 2rem;
  font-size: 14rem;
  color: white;
}

/* Text Lines Container - Preloader */
.text-container {
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  text-align: right;
  z-index: 10001;
  max-width: 450px;
}

.text-line {
  padding: 0.3em 0;
  opacity: 0;
  color: #4f4f4f;
  font-family: "PP Neue Montreal", sans-serif;
  font-size: 1.6rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

/* Text Lines Container - Final */
.text-container-final {
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  text-align: right;
  z-index: 10001;
  max-width: 450px;
}

.text-line-final {
  padding: 0.3em 0;
  opacity: 0;
  color: #4f4f4f;
  font-family: "PP Neue Montreal", sans-serif;
  font-size: 1.6rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

/* Hero Text (Big Title) Styles */
.big-title {
  position: absolute;
  bottom: 30px;
  left: 30px;
  z-index: 10001;
  opacity: 0;
  text-align: left;
  color: red;
  font-size: 14rem;
  line-height: 0.9;
}

.big-title .title-line {
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.big-title .title-line span {
  display: block;
  transform: translateY(100%);
  opacity: 0;
}

/* Restart Button Styles */
.restart-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 10002;
  padding: 0;
  opacity: 0;
}

.dot-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.dot {
  position: absolute;
  border-radius: 50%;
  background-color: white;
  width: 6px;
  height: 6px;
}

/* Initial 4 dots */
.dot:nth-child(1) {
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.dot:nth-child(2) {
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}

.dot:nth-child(3) {
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.dot:nth-child(4) {
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
}

/* Additional 4 dots (hidden initially) */
.dot:nth-child(5) {
  top: 15px;
  right: 15px;
  opacity: 0;
}

.dot:nth-child(6) {
  bottom: 15px;
  right: 15px;
  opacity: 0;
}

.dot:nth-child(7) {
  bottom: 15px;
  left: 15px;
  opacity: 0;
}

.dot:nth-child(8) {
  top: 15px;
  left: 15px;
  opacity: 0;
}

/* Center dot (hidden initially) */
.center-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: white;
  opacity: 0;
}
</style>
