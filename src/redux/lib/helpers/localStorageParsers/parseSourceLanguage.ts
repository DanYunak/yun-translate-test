const sourceLanguageString = localStorage.getItem('sourceLanguage')

export const sourceLanguageParse = sourceLanguageString !== null ? JSON.parse(sourceLanguageString) : null