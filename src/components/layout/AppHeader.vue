<script setup>
import DarkLightModeButton from '../ui/button/DarkLightModeButton.vue'
import Logo from '@/assets/svg/fotogram_logo_full.svg'
</script>

<template>
  <header class="h-full bg-header">
    <div class="flex justify-between items-center h-full layout">
      <div class="">
        <Logo
          class="site-logo w-32 sm:w-32 md:w-36 lg:w-42 h-auto"
          aria-label="Fotogram Logo"
          role="img"
        />
      </div>
      <div>
        <DarkLightModeButton />
      </div>
    </div>
  </header>
</template>

<style scoped></style>
