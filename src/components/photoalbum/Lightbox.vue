<script setup>
import { watch, onBeforeUnmount } from 'vue'
import { prevIndex, nextIndex } from '@/lib/album.js'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const props = defineProps({
  open: Boolean,
  items: { type: Array, default: () => [] },
  index: { type: Number, default: 0 },
})

const emit = defineEmits(['update:open', 'update:index'])

function close() {
  emit('update:open', false)
}

function prev() {
  emit('update:index', prevIndex(props.index, props.items.length))
}

function next() {
  emit('update:index', nextIndex(props.index, props.items.length))
}

function onKeydown(e) {
  if (!props.open) return

  if (e.key === 'Escape') {
    e.preventDefault()
    close()
    return
  }
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    prev()
    return
  }
  if (e.key === 'ArrowRight') {
    e.preventDefault()
    next()
    return
  }
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) window.addEventListener('keydown', onKeydown)
    else window.removeEventListener('keydown', onKeydown)
  },
  { immediate: true },
)

onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Dialog :open="open" @update:open="(v) => emit('update:open', v)">
    <DialogContent class="max-w-3xl" aria-describedby="lb-hint">
      <DialogHeader class="flex-row items-center justify-between gap-3">
        <DialogTitle class="truncate">
          {{ items[index]?.title ?? 'Preview' }}
        </DialogTitle>

        <div class="flex items-center gap-2">
          <Button variant="outline" size="icon" @click="prev" aria-label="Previous photo">‹</Button>
          <Button variant="outline" size="icon" @click="next" aria-label="Next photo">›</Button>
          <Button variant="outline" size="icon" @click="close" aria-label="Close preview">✕</Button>
        </div>
      </DialogHeader>

      <figure class="mt-4">
        <img
          v-if="items[index]"
          class="w-full max-h-[70vh] object-contain rounded-lg"
          :src="items[index].src"
          :alt="items[index].alt || items[index].title || 'Photo'"
          draggable="false"
        />
        <figcaption class="mt-3 text-sm text-muted-foreground">
          {{ items[index]?.alt ?? '' }}
        </figcaption>
      </figure>

      <p id="lb-hint" class="sr-only">
        Use left/right arrow keys to navigate. Press Escape to close.
      </p>
    </DialogContent>
  </Dialog>
</template>
