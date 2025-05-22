<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <!-- Logo con hover corregido -->
      <router-link to="/" class="logo">
        <span class="logo-text">
          <span class="gradient-text">VELORA</span>
        </span>
      </router-link>

      <!-- Menú principal -->
      <div class="menu">
        <router-link
          v-for="(link, index) in links"
          :key="index"
          :to="link.path"
          class="menu-link"
        >
          {{ link.name }}
          <span class="link-underline"></span>
        </router-link>
      </div>

      <!-- Botón móvil -->
      <button class="mobile-toggle" @click="toggleMenu">
        <span class="toggle-line"></span>
        <span class="toggle-line"></span>
      </button>
    </div>

    <!-- Menú móvil -->
    <transition name="fade">
      <div class="mobile-menu" v-if="mobileOpen" @click="toggleMenu">
        <router-link
          v-for="(link, index) in links"
          :key="'m-' + index"
          :to="link.path"
          class="mobile-link"
        >
          {{ link.name }}
        </router-link>
      </div>
    </transition>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'Navbar',
  setup() {
    const links = [
      { name: 'Models', path: '/models' },
      { name: 'Gallery', path: '/gallery' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' }
    ]

    const isScrolled = ref(false)
    const mobileOpen = ref(false)

    const checkScroll = () => {
      isScrolled.value = window.scrollY > 20
    }

    const toggleMenu = () => {
      mobileOpen.value = !mobileOpen.value
    }

    onMounted(() => {
      window.addEventListener('scroll', checkScroll)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', checkScroll)
    })

    return {
      links,
      isScrolled,
      mobileOpen,
      toggleMenu
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1.5rem 0;
  transition: all 0.3s ease;
  background: transparent;

  &.scrolled {
    padding: 1rem 0;
    background: rgba(15, 20, 30, 0.95);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Estilos corregidos para el logo */
.logo {
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 3px;
  text-decoration: none;

  .logo-text {
    position: relative;
    display: inline-block;

    .gradient-text {
      background: linear-gradient(135deg, #6b8cff 0%, #a2b5ff 50%, #e0e5ff 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      transition: all 0.4s ease;
      position: relative;
      z-index: 2;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #5a7df5 0%, #8fa3f5 50%, #d5dbf5 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: 1;
    }
  }

  &:hover .logo-text::after {
    opacity: 1;
  }
}

.menu {
  display: flex;
  gap: 2.5rem;

  @media (max-width: 768px) {
    display: none;
  }
}

.menu-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.95rem;
  letter-spacing: 1px;
  font-weight: 300;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;

  &:hover {
    color: white;

    .link-underline {
      transform: scaleX(1);
      opacity: 1;
    }
  }

  &.router-link-exact-active {
    color: white;
    font-weight: 400;

    .link-underline {
      transform: scaleX(1);
      opacity: 1;
      background: linear-gradient(90deg, #6b8cff, #a2b5ff);
    }
  }
}

.link-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: white;
  transform: scaleX(0);
  transform-origin: left;
  opacity: 0;
  transition: all 0.3s ease;
}

/* Estilos para móvil */
.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  flex-direction: column;
  gap: 5px;

  @media (max-width: 768px) {
    display: flex;
  }
}

.toggle-line {
  display: block;
  width: 22px;
  height: 1px;
  background: white;
  transition: all 0.3s ease;
}

.mobile-menu {
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  background: rgba(15, 20, 30, 0.98);
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  @media (min-width: 769px) {
    display: none;
  }
}

.mobile-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.95rem;
  letter-spacing: 1px;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }

  &.router-link-exact-active {
    color: white;
    font-weight: 400;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
