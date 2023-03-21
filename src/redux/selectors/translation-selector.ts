import { AppStateType } from '../store'

export const getText = (state: AppStateType) => {
    return state.translation.text
}

export const getTranslatedText = (state: AppStateType) => {
    return state.translation.translatedText
}

export const getTheme = (state: AppStateType) => {
    return state.translation.theme
}

export const getSourceLanguage = (state: AppStateType) => {
    return state.translation.sourceLanguage
}

export const getTargetLanguage = (state: AppStateType) => {
    return state.translation.targetLanguage
}

export const getTranslationHistory = (state: AppStateType) => {
    return state.translation.translationHistory
}

export const getSavedTranslations = (state: AppStateType) => {
    return state.translation.savedTranslations
}

export const getDetectedLanguage = (state: AppStateType) => {
    return state.translation.detectedLanguage
}

export const getIsLoading = (state: AppStateType) => {
    return state.translation.isLoading
}