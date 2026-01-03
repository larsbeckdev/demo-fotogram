<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { photos } from '@/data/photos.js'
import { buildVisibleItems } from '@/lib/album.js'
import { initScroll } from '@/lib/scroll.js'

import { Button } from '@/components/ui/button'
import Lightbox from '@/components/photoalbum/Lightbox.vue'

const all = ref(photos)

// Lightbox
const open = ref(false)
const index = ref(0)

function openAt(i) {
  index.value = i
  open.value = true
}

// Visible items (for + break)
const MAX = 12
const items = computed(() => buildVisibleItems(all.value, MAX))

// Scroll state
const isScrolled = ref(false)
const showTop = ref(false)
let cleanupScroll = null

onMounted(() => {
  cleanupScroll = initScroll((s) => {
    isScrolled.value = s.isScrolled
    showTop.value = s.showTop
  })
})

onBeforeUnmount(() => {
  if (cleanupScroll) cleanupScroll()
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <header
    class="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/70 transition-shadow"
    :class="isScrolled ? 'shadow-md' : ''"
  >
    <div class="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 class="text-center text-4xl md:text-6xl font-semibold tracking-tight">
        Your personal photo album
      </h1>
    </div>
  </header>

  <main class="mx-auto w-full max-w-6xl px-4 pb-20">
    <section aria-label="Photo album" class="pt-8">
      <div
        class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 justify-items-center"
        role="list"
        aria-label="Photo thumbnails"
      >
        <div v-for="(p, i) in items" :key="p.id" role="listitem">
          <button
            type="button"
            class="group relative size-20 sm:size-24 rounded-2xl overflow-hidden border border-border bg-muted/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            :aria-label="`Open photo: ${p.title || p.alt || p.id}`"
            @click="openAt(i)"
          >
            <img
              class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
              :src="p.src"
              :alt="p.alt || p.title || 'Photo thumbnail'"
              loading="lazy"
              decoding="async"
            />
          </button>
        </div>
      </div>
    </section>

    <Button
      v-show="showTop"
      class="fixed bottom-6 right-6"
      variant="secondary"
      type="button"
      aria-label="Back to top"
      @click="scrollToTop"
    >
      ↑ Top
    </Button>

    <Lightbox v-model:open="open" v-model:index="index" :items="items" />
  </main>
</template>
