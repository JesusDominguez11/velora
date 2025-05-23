<template>
  <div class="home">
    <PreloaderHeader />
    <Preloader />
    <!-- Your other home content here -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Preloader, PreloaderHeader } from '@/components/preloader';

export default defineComponent({
  name: 'HomeView',
  components: {
    Preloader,
    PreloaderHeader
  }
});
</script>

<style>
/* Global styles that should be applied to the entire app */
/* These are already included in the Preloader component */
</style>
