const targetLanguageString = localStorage.getItem('targetLanguage')

export const targetLanguageParse = targetLanguageString !== null ? JSON.parse(targetLanguageString) : null