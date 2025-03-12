// Get the current language name for display
const getCurrentLanguageName = () => {
  switch(locale) {
    case 'es': return 'Español'
    case 'fr': return 'Français'
    case 'de': return 'Deutsch'
    default: return 'English'
  }
}
