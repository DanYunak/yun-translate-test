const savedTranslationsArray = localStorage.getItem('savedTranslations')

export const savedTranslationsParse = savedTranslationsArray?.length === 0 ? JSON.parse(savedTranslationsArray) : []