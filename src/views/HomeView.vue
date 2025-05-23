<template>
  <div class="home">
    <Preloader />
    <!-- Your other home content here -->
  </div>
</template>

<script lang="ts">
import { Preloader } from '@/components/Preloader';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    Preloader
  }
});
</script>

<style>
/* Global styles that should be applied to the entire app */
/* These are already included in the Preloader component */
</style>
