<!-- <script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template> -->

<template>
  <div>
    <!-- <PreloaderComponent v-if="showPreloader" />
    <div v-else class="home-view"> -->
      <div class="home-view">
      <Navbar />
      <HeroSection />
      <!-- Aquí puedes agregar más secciones -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import PreloaderComponent from '@/components/Preloader.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    PreloaderComponent,
    Navbar,
    HeroSection
  },
  setup() {
    const showPreloader = ref(true)

    // Simular carga de recursos o esperar a que el preloader complete su animación
    onMounted(() => {
      // Esto es solo para demostración - en una app real podrías esperar a que carguen imágenes/recursos
      setTimeout(() => {
        showPreloader.value = false
      }, 5000) // Ajusta este tiempo según la duración de tu animación de preloader
    })

    return {
      showPreloader
    }
  }
})
</script>

<style lang="scss">
.home-view {
  position: relative;
}
</style>
