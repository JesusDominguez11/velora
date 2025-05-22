<template>
  <section class="hero-section">
    <!-- Carrusel de imágenes de fondo -->
    <div class="hero-background">
      <transition name="fade" mode="out-in">
        <img
          :key="currentImageIndex"
          :src="images[currentImageIndex]"
          alt="Luxury Car"
          class="hero-image"
        />
      </transition>
      <div class="color-overlay"></div>
      <div class="light-effect"></div>

      <!-- Partículas -->
      <div class="particles">
        <div v-for="i in particleCount" :key="i" class="particle" :style="particleStyle(i)"></div>
      </div>
    </div>

    <!-- Contenido -->
    <div class="hero-content">
      <div class="logo-container">
        <h1 class="brand-name">VELORA</h1>
        <p class="brand-tagline">Engineering Excellence</p>
      </div>
    </div>

    <!-- Indicador de scroll -->
    <div class="scroll-hint">
      <span class="scroll-text">Scroll</span>
      <div class="scroll-line"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { gsap } from 'gsap'

// Importación directa de imágenes
import nissanGtr from '@/assets/images/nissan_gtr.jpeg'
import toyotaMr2 from '@/assets/images/toyota_mr2.jpg'
import nissan300zx from '@/assets/images/nissan_300zx_1.jpg'

export default defineComponent({
  name: 'HeroSection',
  setup() {
    const particleCount = 40;
    const currentImageIndex = ref(0);

    // Array con las imágenes importadas
    const images = [
      nissanGtr,
      toyotaMr2,
      nissan300zx
    ];

    const particleStyle = (i: number) => {
      const size = Math.random() * 3 + 2;
      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.5 + 0.3,
        animationDelay: `${Math.random() * 5}s`,
        background: 'rgba(255, 255, 255, 0.8)'
      }
    }

    const startImageTransition = () => {
      setInterval(() => {
        currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
      }, 5000); // Cambia cada 5 segundos
    }

    onMounted(() => {
      gsap.to('.light-effect', {
        duration: 8,
        opacity: 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to('.particle', {
        duration: 15,
        x: () => gsap.utils.random(-20, 20),
        y: () => gsap.utils.random(-20, 20),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.from('.logo-container', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
      })

      startImageTransition();
    })

    return {
      particleCount,
      particleStyle,
      currentImageIndex,
      images
    }
  }
})
</script>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  height: 100vh;
  min-height: 800px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;

  .hero-image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 1;
  }

  .color-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
  to bottom,
  rgba(0, 0, 0, 0.6) 0%,
  rgba(20, 30, 40, 0.4) 50%,
  rgba(0, 0, 0, 0.6) 100%
);
    z-index: 2;
  }

  .light-effect {
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 70% 30%,
      rgba(200, 200, 255, 0.1) 0%,
      transparent 60%
    );
    z-index: 3;
    opacity: 0.1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 4;

  .particle {
    position: absolute;
    border-radius: 50%;
    filter: blur(0.8px);
    animation: floatParticle 25s infinite ease-in-out;
    will-change: transform;
  }

  @keyframes floatParticle {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(10px, 5px) scale(1.05); }
    50% { transform: translate(5px, 10px) scale(1.1); }
    75% { transform: translate(-5px, 5px) scale(1.05); }
  }
}

.hero-content {
  position: relative;
  z-index: 5; // Encima de las partículas
  width: 100%;
  text-align: center;
  padding: 0 2rem;
}

.logo-container {
  max-width: 1200px;
  margin: 0 auto;
  color: white;
  text-align: left;
  padding-left: 10%;
}

.brand-name {
  font-size: 5rem;
  font-weight: 300;
  letter-spacing: 5px;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
}

.brand-tagline {
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 8px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
}

.scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
}

/* Resto del CSS permanece igual */
</style>
