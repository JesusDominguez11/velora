<template>
  <div>
    <!-- Preloader with Image Animation -->
    <div class="preloader" ref="preloader">
      <div class="preloader-content">
        <div class="image-container" ref="imageContainer">
          <div id="image-0" class="image-wrapper">
            <img src="https://cdn.cosmos.so/4900e2ad-dfdb-4f6a-8ca8-6700144e6c89?format=jpeg" alt="Preloader Image 1">
          </div>
          <div id="image-20" class="image-wrapper">
            <img src="https://cdn.cosmos.so/acdef0b0-0321-4f80-9ab0-7932ccb88554?format=jpeg" alt="Preloader Image 2">
          </div>
          <div id="image-60" class="image-wrapper">
            <img src="https://cdn.cosmos.so/09eb737d-c269-4fa6-a77c-4ada27419be0?format=jpeg" alt="Preloader Image 3">
          </div>
          <div id="image-80" class="image-wrapper">
            <img src="https://cdn.cosmos.so/e9b9e7dc-73f5-4f7c-bbb3-ad2e3589bda0?format=jpeg" alt="Preloader Image 4">
          </div>
          <div id="image-100" class="image-wrapper">
            <img src="https://cdn.cosmos.so/5b5c5242-4598-4d51-9891-0e90eeef6727?format=jpeg" alt="Preloader Image 5">
          </div>
        </div>
        <div class="preloader-percentage" ref="percentageElement">0</div>
      </div>
    </div>

    <!-- Text Lines Container (Preloader) -->
    <div class="text-container">
      <div class="text-line">Winning is a habit.</div>
      <div class="text-line">Champions are made daily.</div>
      <div class="text-line">Obstacles fuel growth.</div>
      <div class="text-line">The mind conquers first.</div>
      <div class="text-line">Success demands sacrifice.</div>
      <div class="text-line">Greatness never rests.</div>
      <div class="text-line">Victory is earned.</div>
      <div class="text-line">Persistence prevails.</div>
    </div>

    <!-- Text Lines Container (Final) -->
    <div class="text-container-final">
      <div class="text-line-final">Embrace the challenge.</div>
      <div class="text-line-final">Find your purpose.</div>
      <div class="text-line-final">Commit to excellence.</div>
      <div class="text-line-final">Trust the process.</div>
      <div class="text-line-final">Silence the doubters.</div>
      <div class="text-line-final">Rise above fear.</div>
      <div class="text-line-final">Own your destiny.</div>
      <div class="text-line-final">Leave a legacy.</div>
    </div>

    <!-- Hero Text (Big Title) -->
    <div class="big-title">
      <div class="title-line"><span>WINNING</span></div>
      <div class="title-line"><span>MINDSET</span></div>
      <div class="title-line"><span>ALWAYS</span></div>
    </div>

    <!-- Restart Button -->
    <button class="restart-btn" ref="restartBtn">
      <div class="dot-container">
        <!-- Initial 4 dots -->
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>

        <!-- Additional 4 dots (hidden initially) -->
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>

        <!-- Center dot (hidden initially) -->
        <div class="center-dot"></div>
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

export default defineComponent({
  name: 'Preloader',
  setup() {
    const preloader = ref<HTMLElement | null>(null);
    const imageContainer = ref<HTMLElement | null>(null);
    const percentageElement = ref<HTMLElement | null>(null);
    const restartBtn = ref<HTMLElement | null>(null);
    let mainTl: gsap.core.Timeline | null = null;

    // Create custom easing functions
    CustomEase.create("customEase", "0.6, 0.01, 0.05, 1");
    CustomEase.create("blurEase", "0.25, 0.1, 0.25, 1");
    CustomEase.create("counterEase", "0.35, 0.0, 0.15, 1");
    CustomEase.create("gentleIn", "0.38, 0.005, 0.215, 1");

    const initAnimation = () => {
      if (mainTl) mainTl.kill();

      // Ensure restart button and header are hidden initially
      gsap.set(".restart-btn", { opacity: 0, pointerEvents: "none" });
      gsap.set(".header", { opacity: 1 }); // Set header to visible but children to invisible
      gsap.set(".logo-left", { opacity: 0, y: 10 });
      gsap.set(".nav-center li", { opacity: 0, y: 10 });
      gsap.set(".nav-right", { opacity: 0, y: 10 });
      gsap.set(".text-container-final", { opacity: 0 });
      gsap.set(".text-line-final", { opacity: 0 });
      gsap.set(".big-title", { opacity: 0 });
      gsap.set(".big-title .title-line span", { y: "100%", opacity: 0 });

      const percentages = [0, 20, 60, 80, 99];
      const wrappers = [
        document.getElementById("image-0"),
        document.getElementById("image-20"),
        document.getElementById("image-60"),
        document.getElementById("image-80"),
        document.getElementById("image-100")
      ];

      const percentageElementValue = percentageElement.value;
      const imageContainerValue = imageContainer.value;
      const finalWrapper = document.getElementById("image-100");
      const finalImage = finalWrapper?.querySelector("img");

      // Reset wrappers and container dimensions
      gsap.set(wrappers, { visibility: "hidden", clipPath: "inset(100% 0 0 0)" });
      if (wrappers[0]) gsap.set(wrappers[0], { visibility: "visible" });
      if (imageContainerValue) gsap.set(imageContainerValue, { width: "400px", height: "500px" });
      gsap.set(".image-wrapper img", {
        scale: 1.2,
        transformOrigin: "center center"
      });

      // Set preloader overlay to start with solid black background
      if (preloader.value) {
        gsap.set(preloader.value, { display: "flex", opacity: 1, y: 0 });
        preloader.value.style.backgroundColor = "#000";
      }

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
        mainTl?.add(`step${percentage}`, index * 1.5);

        // Set image wrapper to visible
        mainTl?.set(wrappers[index], { visibility: "visible" }, `step${percentage}`);

        // Animate image reveal and percentage change simultaneously
        mainTl?.to(
          wrappers[index],
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 0.65,
            ease: "customEase"
          },
          `step${percentage}`
        );

        // Synchronize percentage update with image reveal
        if (percentageElementValue) {
          mainTl?.to(
            percentageElementValue,
            {
              innerText: `${percentage}`,
              left: leftPosition,
              duration: 0.65, // Match duration with image reveal
              ease: "counterEase",
              snap: { innerText: 1 },
              onStart: function () {
                gsap.fromTo(
                  percentageElementValue,
                  { filter: "blur(8px)" },
                  { filter: "blur(0px)", duration: 0.5, ease: "power2.inOut" }
                );
              }
            },
            `step${percentage}`
          ); // Start at the same time as image reveal
        }

        // Hide previous image after current one is revealed
        if (index > 0) {
          mainTl?.to(
            wrappers[index - 1],
            {
              clipPath: "inset(100% 0 0 0)",
              duration: 0.5,
              ease: "customEase",
              onComplete: function () {
                gsap.set(wrappers[index - 1], { visibility: "hidden" });
              }
            },
            `step${percentage}+=0.15`
          ); // Slight delay after current image starts revealing
        }
      });

      // Animate text lines out before final phase
      mainTl?.to(
        ".text-line",
        {
          opacity: 0,
          duration: 0.15,
          stagger: 0.075,
          ease: "counterEase"
        },
        "step99+=1"
      );

      // Final phase: expand final image and animate overlay to a semi-transparent dark tone
      mainTl?.add("expandFinal", ">");
      mainTl?.to({}, { duration: 0.5 }, "expandFinal");

      // Expand image container to full screen
      if (imageContainerValue) {
        mainTl?.to(
          imageContainerValue,
          {
            width: "100vw",
            height: "100vh",
            duration: 1.2,
            ease: "gentleIn"
          },
          "expandFinal+=0.5"
        );
      }

      // Scale final image
      if (finalImage) {
        mainTl?.to(
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
      if (percentageElementValue) {
        mainTl?.to(
          percentageElementValue,
          {
            opacity: 0,
            filter: "blur(10px)",
            duration: 0.5,
            ease: "power2.out"
          },
          "expandFinal+=0.5"
        );
      }

      // Show header with staggered animation
      mainTl?.to(
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
      mainTl?.to(
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
      mainTl?.to(
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
      mainTl?.to(
        ".text-container-final",
        {
          opacity: 1,
          duration: 0.1
        },
        "expandFinal+=1.5"
      );

      mainTl?.to(
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
      mainTl?.to(
        ".restart-btn",
        {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.3,
          ease: "hop"
        },
        "expandFinal+=1.2"
      );

      // Fix: Only change preloader background opacity during transition to full screen
      if (preloader.value) {
        mainTl?.to(
          preloader.value,
          {
            backgroundColor: "rgba(0,0,0,0.5)",
            duration: 0.5,
            ease: "customEase"
          },
          "expandFinal+=0.7"
        ); // Timing adjusted to happen during the expansion
      }

      // Animate hero text (big title) appearance
      mainTl?.to(".big-title", { opacity: 1, duration: 0.1 }, "expandFinal+=1.8");
      mainTl?.to(
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

      return mainTl;
    };

    const setupRestartButton = () => {
      const restartBtnElement = restartBtn.value;
      const additionalDots = document.querySelectorAll(".dot:nth-child(n+5)");
      const centerDot = document.querySelector(".center-dot");

      if (!restartBtnElement) return;

      // Restart button hover animations
      restartBtnElement.addEventListener("mouseenter", () => {
        // Show additional 4 dots
        gsap.to(additionalDots, {
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "customEase"
        });

        // Show and scale up center dot
        if (centerDot) {
          gsap.to(centerDot, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "gentleIn"
          });
        }
      });

      restartBtnElement.addEventListener("mouseleave", () => {
        // Hide additional 4 dots
        gsap.to(additionalDots, {
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "customEase"
        });

        // Hide and scale down center dot
        if (centerDot) {
          gsap.to(centerDot, {
            opacity: 0,
            scale: 0,
            duration: 0.4,
            ease: "gentleIn"
          });
        }
      });

      // Restart button functionality
      restartBtnElement.addEventListener("click", () => {
        gsap.killTweensOf("*");
        // Reset preloader overlay to initial state
        if (preloader.value) {
          gsap.set(preloader.value, { display: "flex", opacity: 1, y: 0 });
          preloader.value.style.backgroundColor = "#000";
        }

        if (imageContainer.value) {
          gsap.set(imageContainer.value, { width: "400px", height: "500px" });
        }

        if (percentageElement.value) {
          gsap.set(percentageElement.value, {
            filter: "blur(0px)",
            opacity: 1,
            innerText: "0",
            left: "2rem"
          });
        }

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

        if (preloader.value) {
          preloader.value.style.display = "flex";
        }
        setTimeout(initAnimation, 100);
      });
    };

    onMounted(() => {
      setTimeout(() => {
        initAnimation();
        setupRestartButton();
      }, 100);
    });

    return {
      preloader,
      imageContainer,
      percentageElement,
      restartBtn
    };
  }
});
</script>

<style scoped>
/* Your CSS styles here (copy the entire CSS section from your original code) */
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

/* Media queries para móviles */
@media (max-width: 768px) {
  html {
    font-size: calc(100vw / 375 * 10);
  }

  .preloader-content {
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 20vh;
  }

  .image-container {
    width: 300px !important;
    height: 300px !important;
    margin-bottom: 2rem;
  }

  .preloader-percentage {
    font-size: 8rem !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    bottom: 15% !important;
    text-align: center;
  }

  .text-container,
  .text-container-final {
    position: static !important;
    transform: none !important;
    text-align: center !important;
    max-width: 100% !important;
    padding: 0 2rem;
    margin-top: 2rem;
  }

  .text-line,
  .text-line-final {
    font-size: 1.4rem !important;
    text-align: center !important;
    padding: 0.2em 0 !important;
  }

  .big-title {
    bottom: 10px !important;
    left: 10px !important;
    font-size: 5rem !important;
  }

  .restart-btn {
    bottom: 20px !important;
    right: 20px !important;
    width: 50px !important;
    height: 50px !important;
  }

  .nav-center li {
    font-size: 1.6rem !important;
  }

  .logo-left,
  .nav-right {
    font-size: 1.4rem !important;
  }
}

@media (max-width: 480px) {
  .image-container {
    width: 250px !important;
    height: 250px !important;
  }

  .preloader-percentage {
    font-size: 6rem !important;
    bottom: 20% !important;
  }

  .big-title {
    font-size: 4rem !important;
  }
}
</style>
