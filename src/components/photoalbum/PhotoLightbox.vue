<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { prevIndex, nextIndex } from '@/lib/album.js'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  open: Boolean,
  items: { type: Array, default: () => [] },
  index: { type: Number, default: 0 },
})

const emit = defineEmits(['update:open', 'update:index'])

const close = () => emit('update:open', false)
const prev = () => emit('update:index', prevIndex(props.index, props.items.length))
const next = () => emit('update:index', nextIndex(props.index, props.items.length))

function onKeydown(e) {
  if (!props.open) return

  const actions = {
    Escape: close,
    ArrowLeft: prev,
    ArrowRight: next,
  }

  const action = actions[e.key]
  if (!action) return

  e.preventDefault()
  action()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="photo-lightbox" aria-describedby="lb-hint">
      <DialogHeader class="flex-row items-center justify-between gap-3">
        <DialogTitle class="truncate text-center w-full wrap-words">
          {{ items[index]?.title ?? 'Preview' }}
        </DialogTitle>
      </DialogHeader>

      <figure class="gap-4 flex flex-col items-center">
        <img
          v-if="items[index]"
          class="w-full max-h-[40vh] object-cover rounded-lg sm:max-h-[40vh]"
          :src="items[index].src"
          :alt="items[index].alt || items[index].title || 'Photo'"
          draggable="false"
        />

        <figcaption class="mt-3 text-sm text-muted-foreground text-center">
          {{ items[index]?.alt ?? '' }}
        </figcaption>

        <div class="flex items-center gap-2 w-full justify-center mt-4">
          <Button variant="outline" size="icon" @click="prev" aria-label="Previous photo">
            <ChevronLeft class="h-4 w-4" />
          </Button>

          <span class="min-w-[72px] text-center text-sm text-muted-foreground tabular-nums">
            {{ items.length ? `${index + 1} / ${items.length}` : '0 / 0' }}
          </span>

          <Button variant="outline" size="icon" @click="next" aria-label="Next photo">
            <ChevronRight class="h-4 w-4" />
          </Button>
        </div>
      </figure>

      <p id="lb-hint" class="sr-only">
        Use left/right arrow keys to navigate. Press Escape to close.
      </p>
    </DialogContent>
  </Dialog>
</template>
