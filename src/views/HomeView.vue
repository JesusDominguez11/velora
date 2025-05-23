<template>
  <div>
    <PreloaderComponent />
    <div class="home-view">
      <Navbar />
      <HeroSection />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import PreloaderComponent from '@/components/Preloader.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    PreloaderComponent,
    Navbar,
    HeroSection
  }
})
</script>

<style lang="scss">
.home-view {
  position: relative;
}
</style>
