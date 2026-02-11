import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useScrollProgress(elementRef?: Ref<HTMLElement | null>) {
  const scrollProgress = ref(0)

  const calculateScrollProgress = () => {
    if (elementRef?.value) {
      // Calculate progress for specific element
      const element = elementRef.value
      const elementRect = element.getBoundingClientRect()
      const elementTop = elementRect.top + window.scrollY
      const elementHeight = elementRect.height
      const windowHeight = window.innerHeight
      
      const scrollPosition = window.scrollY
      const scrollableDistance = elementHeight - windowHeight
      
      if (scrollableDistance <= 0) {
        scrollProgress.value = 100
      } else {
        const scrolled = Math.max(0, scrollPosition - elementTop)
        const progress = Math.min(100, (scrolled / scrollableDistance) * 100)
        scrollProgress.value = progress
      }
    } else {
      // Calculate progress for entire page
      const winScroll = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      scrollProgress.value = (winScroll / height) * 100
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', calculateScrollProgress)
    window.addEventListener('resize', calculateScrollProgress)
    setTimeout(calculateScrollProgress, 100)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', calculateScrollProgress)
    window.removeEventListener('resize', calculateScrollProgress)
  })

  return {
    scrollProgress
  }
}