export function buildVisibleItems(allItems, max) {
  const result = []
  for (let i = 0; i < allItems.length; i++) {
    result.push(allItems[i])
    if (result.length >= max) break
  }
  return result
}

export function nextIndex(current, length) {
  if (length <= 0) return 0
  return (current + 1) % length
}

export function prevIndex(current, length) {
  if (length <= 0) return 0
  return (current - 1 + length) % length
}
