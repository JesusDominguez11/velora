<template>
  <div>
    <!-- Preloader -->
    <div class="preloader" v-show="showPreloader">
      <div class="preloader-content">
        <div class="image-container">
          <div
            v-for="(image, index) in preloaderImages"
            :key="index"
            :id="`image-${image.percentage}`"
            class="image-wrapper"
            ref="imageWrappers"
          >
            <img :src="image.src" :alt="`Preloader Image ${index + 1}`">
          </div>
        </div>
        <div class="preloader-percentage">{{ currentPercentage }}</div>
      </div>
    </div>

    <!-- Contenido principal (se muestra después del preloader) -->
    <div v-show="!showPreloader">
      <!-- Header Navigation -->
      <header class="header">
        <div class="logo-left">REDUCE</div>
        <nav class="nav-center">
          <ul>
            <li>FOCUS</li>
            <li>CLARITY</li>
            <li>SIMPLIFY</li>
            <li>TRUTH</li>
          </ul>
        </nav>
        <div class="nav-right">+GET IN TOUCH</div>
      </header>

      <!-- Text Lines Container (Preloader) -->
      <div class="text-container">
        <div class="text-line" v-for="(line, index) in preloaderLines" :key="'preloader-' + index">{{ line }}</div>
      </div>

      <!-- Text Lines Container (Final) -->
      <div class="text-container-final">
        <div class="text-line-final" v-for="(line, index) in finalLines" :key="'final-' + index">{{ line }}</div>
      </div>

      <!-- Hero Text (Big Title) -->
      <div class="big-title">
        <div class="title-line" v-for="(line, index) in titleLines" :key="'title-' + index">
          <span>{{ line }}</span>
        </div>
      </div>

      <!-- Restart Button -->
      <button class="restart-btn" @click="restartAnimation">
        <div class="dot-container">
          <!-- Initial 4 dots -->
          <div class="dot" v-for="n in 8" :key="'dot-' + n"></div>
          <!-- Center dot -->
          <div class="center-dot"></div>
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

export default {
  name: 'PreloaderComponent',
  data() {
    return {
      showPreloader: true,
      currentPercentage: 0,
      preloaderImages: [
        { percentage: 0, src: 'https://cdn.cosmos.so/4900e2ad-dfdb-4f6a-8ca8-6700144e6c89?format=jpeg' },
        { percentage: 20, src: 'https://cdn.cosmos.so/acdef0b0-0321-4f80-9ab0-7932ccb88554?format=jpeg' },
        { percentage: 60, src: 'https://cdn.cosmos.so/09eb737d-c269-4fa6-a77c-4ada27419be0?format=jpeg' },
        { percentage: 80, src: 'https://cdn.cosmos.so/e9b9e7dc-73f5-4f7c-bbb3-ad2e3589bda0?format=jpeg' },
        { percentage: 100, src: 'https://cdn.cosmos.so/5b5c5242-4598-4d51-9891-0e90eeef6727?format=jpeg' }
      ],
      preloaderLines: [
        "Winning is a habit.",
        "Champions are made daily.",
        "Obstacles fuel growth.",
        "The mind conquers first.",
        "Success demands sacrifice.",
        "Greatness never rests.",
        "Victory is earned.",
        "Persistence prevails."
      ],
      finalLines: [
        "Embrace the challenge.",
        "Find your purpose.",
        "Commit to excellence.",
        "Trust the process.",
        "Silence the doubters.",
        "Rise above fear.",
        "Own your destiny.",
        "Leave a legacy."
      ],
      titleLines: [
        "WINNING",
        "MINDSET",
        "ALWAYS"
      ],
      mainTl: null
    };
  },
  mounted() {
    gsap.registerPlugin(CustomEase);

    // Crear funciones de easing personalizadas
    CustomEase.create("customEase", "0.6, 0.01, 0.05, 1");
    CustomEase.create("blurEase", "0.25, 0.1, 0.25, 1");
    CustomEase.create("counterEase", "0.35, 0.0, 0.15, 1");
    CustomEase.create("gentleIn", "0.38, 0.005, 0.215, 1");

    this.initAnimation();
    this.setupRestartButton();
  },
  methods: {
    initAnimation() {
      if (this.mainTl) this.mainTl.kill();

      // Resetear elementos
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
      const wrappers = this.$refs.imageWrappers;

      const percentageElement = document.querySelector(".preloader-percentage");
      const imageContainer = document.querySelector(".image-container");
      const finalWrapper = document.getElementById("image-100");
      const finalImage = finalWrapper ? finalWrapper.querySelector("img") : null;

      // Resetear wrappers y dimensiones del contenedor
      gsap.set(wrappers, { visibility: "hidden", clipPath: "inset(100% 0 0 0)" });
      gsap.set(wrappers[0], { visibility: "visible" });
      gsap.set(imageContainer, { width: "400px", height: "500px" });
      gsap.set(".image-wrapper img", {
        scale: 1.2,
        transformOrigin: "center center"
      });

      // Configurar preloader
      gsap.set(".preloader", { display: "flex", opacity: 1, y: 0 });
      document.querySelector(".preloader").style.backgroundColor = "#000";

      this.mainTl = gsap.timeline();

      // Animación de líneas de texto
      this.mainTl.to(
        ".text-line",
        {
          opacity: 1,
          duration: 0.15,
          stagger: 0.075,
          ease: "gentleIn"
        },
        0.5
      );

      // Cambiar color de líneas de texto
      this.mainTl.to(
        ".text-line",
        {
          color: "#fff",
          duration: 0.15,
          stagger: 0.075,
          ease: "blurEase"
        },
        "+=0.5"
      );

      // Sincronización para cambios de imagen y actualizaciones de porcentaje
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

        // Crear una etiqueta sincronizada para este paso
        this.mainTl.add(`step${percentage}`, index * 1.5);

        // Configurar wrapper de imagen como visible
        this.mainTl.set(wrappers[index], { visibility: "visible" }, `step${percentage}`);

        // Animación de revelación de imagen y cambio de porcentaje
        this.mainTl.to(
          wrappers[index],
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 0.65,
            ease: "customEase"
          },
          `step${percentage}`
        );

        // Actualizar porcentaje
        this.mainTl.to(
          this,
          {
            currentPercentage: percentage,
            duration: 0.65,
            ease: "counterEase",
            onUpdate: () => {
              percentageElement.innerText = this.currentPercentage;
              percentageElement.style.left = leftPosition;

              gsap.fromTo(
                percentageElement,
                { filter: "blur(8px)" },
                { filter: "blur(0px)", duration: 0.5, ease: "power2.inOut" }
              );
            }
          },
          `step${percentage}`
        );

        // Ocultar imagen anterior después de revelar la actual
        if (index > 0) {
          this.mainTl.to(
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

      // Ocultar líneas de texto antes de la fase final
      this.mainTl.to(
        ".text-line",
        {
          opacity: 0,
          duration: 0.15,
          stagger: 0.075,
          ease: "counterEase"
        },
        "step99+=1"
      );

      // Fase final: expandir imagen final y animar overlay
      this.mainTl.add("expandFinal", ">");
      this.mainTl.to({}, { duration: 0.5 }, "expandFinal");

      // Expandir contenedor de imagen a pantalla completa
      this.mainTl.to(
        imageContainer,
        {
          width: "100vw",
          height: "100vh",
          duration: 1.2,
          ease: "gentleIn"
        },
        "expandFinal+=0.5"
      );

      // Escalar imagen final
      this.mainTl.to(
        finalImage,
        {
          scale: 1.0,
          duration: 1.2,
          ease: "gentleIn"
        },
        "expandFinal+=0.5"
      );

      // Fundido de porcentaje
      this.mainTl.to(
        percentageElement,
        {
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.5,
          ease: "power2.out"
        },
        "expandFinal+=0.5"
      );

      // Mostrar header con animación escalonada
      this.mainTl.to(
        ".logo-left",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "customEase"
        },
        "expandFinal+=1.2"
      );

      // Animación escalonada para elementos del nav center
      this.mainTl.to(
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

      // Animación para nav right
      this.mainTl.to(
        ".nav-right",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "customEase"
        },
        "expandFinal+=1.7"
      );

      // Mostrar líneas de texto finales
      this.mainTl.to(
        ".text-container-final",
        {
          opacity: 1,
          duration: 0.1
        },
        "expandFinal+=1.5"
      );

      this.mainTl.to(
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

      // Mostrar botón de reinicio
      this.mainTl.to(
        ".restart-btn",
        {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.3,
          ease: "hop"
        },
        "expandFinal+=1.2"
      );

      // Cambiar opacidad del fondo del preloader durante la transición
      this.mainTl.to(
        ".preloader",
        {
          backgroundColor: "rgba(0,0,0,0.5)",
          duration: 0.5,
          ease: "customEase",
          onComplete: () => {
            this.showPreloader = false;
          }
        },
        "expandFinal+=0.7"
      );

      // Animación de aparición del texto hero (título grande)
      this.mainTl.to(".big-title", { opacity: 1, duration: 0.1 }, "expandFinal+=1.8");
      this.mainTl.to(
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
    },
    setupRestartButton() {
      const restartBtn = document.querySelector(".restart-btn");
      const additionalDots = document.querySelectorAll(".dot:nth-child(n+5)");
      const centerDot = document.querySelector(".center-dot");

      if (!restartBtn) return;

      // Animaciones de hover para el botón de reinicio
      restartBtn.addEventListener("mouseenter", () => {
        // Mostrar 4 puntos adicionales
        gsap.to(additionalDots, {
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "customEase"
        });

        // Mostrar y escalar punto central
        gsap.to(centerDot, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "gentleIn"
        });
      });

      restartBtn.addEventListener("mouseleave", () => {
        // Ocultar 4 puntos adicionales
        gsap.to(additionalDots, {
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "customEase"
        });

        // Ocultar y reducir punto central
        gsap.to(centerDot, {
          opacity: 0,
          scale: 0,
          duration: 0.4,
          ease: "gentleIn"
        });
      });
    },
    restartAnimation() {
      gsap.killTweensOf("*");

      // Restablecer estado inicial
      this.showPreloader = true;
      this.currentPercentage = 0;

      const imageContainer = document.querySelector(".image-container");
      gsap.set(imageContainer, { width: "400px", height: "500px" });

      const percentageElement = document.querySelector(".preloader-percentage");
      gsap.set(percentageElement, {
        filter: "blur(0px)",
        opacity: 1,
        left: "2rem"
      });

      const wrappers = this.$refs.imageWrappers;
      gsap.set(wrappers, {
        clipPath: "inset(100% 0 0 0)",
        visibility: "hidden",
        position: "absolute",
        top: 0,
        left: 0
      });
      gsap.set(wrappers[0], { visibility: "visible" });

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

      document.querySelector(".preloader").style.display = "flex";
      document.querySelector(".preloader").style.backgroundColor = "#000";

      setTimeout(this.initAnimation, 100);
    }
  }
};
</script>

<style scoped>
/* Estilos copiados del código original */
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
