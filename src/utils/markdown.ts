import { marked } from 'marked'

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true
})

export const renderMarkdown = (content: string): string => {
  if (!content) return '<p class="text-gray-500 italic">ይህ ገጽ አሁን ባዶ ነው</p>'
  
  try {
    // Use the synchronous version by forcing string conversion
    const result = marked.parse(content)
    if (typeof result === 'string') {
      return result
    } else {
      // If it's a promise (in newer versions), we need to handle it differently
      // For Vue templates, we'll use a placeholder and let the async version handle it
      return String(result) || '<p>Loading...</p>'
    }
  } catch (error) {
    console.error('Markdown parsing error:', error)
    return `<p class="text-red-500">Error parsing content: ${error}</p>`
  }
}

export default renderMarkdown