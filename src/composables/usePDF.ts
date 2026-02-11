import { ref } from 'vue'
import html2pdf from 'html2pdf.js'

export function usePDF() {
  const isDownloading = ref(false)

  const downloadPDF = async (elementSelector: string, filename: string = 'document.pdf') => {
    isDownloading.value = true
    
    const element = document.querySelector(elementSelector) as HTMLElement

    if (!element) {
      window.print()
      isDownloading.value = false
      return
    }

    const opt = {
      margin: [0.5, 0.5] as [number, number],
      filename,
      image: { 
        type: 'jpeg' as const, 
        quality: 0.98 
      },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        logging: false,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait' as const 
      }
    }

    try {
      await html2pdf().set(opt).from(element).save()
    } catch (error) {
      console.error('PDF Generation failed', error)
      window.print()
    } finally {
      isDownloading.value = false
    }
  }

  return {
    isDownloading,
    downloadPDF
  }
}