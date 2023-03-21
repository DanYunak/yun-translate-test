import { CHANGE_THEME, REMOVE_SAVED_TRANSLATION, REQUEST_DETECT, REQUEST_TRANSLATE, SET_DETECTED_LANGUAGE, SET_SAVED_TRANSLATION, SET_SOURCE_LANGUAGE, SET_TARGET_LANGUAGE, SET_TRANSLATED_TEXT, SET_TRANSLATION_HISTORY, SET_IS_LOADING, DELETE_TRANSLATION } from '../consts';
import { ThemeType } from '../types';

export const actions = {
    requestTranslate: (text: string) => ({ type: REQUEST_TRANSLATE, text } as const),
    requestDetect: (text: string) => ({ type: REQUEST_DETECT, text } as const),

    setTranslatedText: (translatedText: string) => ({ type: SET_TRANSLATED_TEXT, translatedText } as const),

    changeTheme: (theme: ThemeType) => ({ type: CHANGE_THEME, theme } as const),

    setSourceLanguage: (language: string) => ({ type: SET_SOURCE_LANGUAGE, language } as const),

    setTargetLanguage: (language: string) => ({ type: SET_TARGET_LANGUAGE, language } as const),

    setSavedTranslations: (id: number, sourceLanguage: string, targetLanguage: string, text: string, translatedText: string, saved: boolean) => ({
        type: SET_SAVED_TRANSLATION,
        payload: { id, sourceLanguage, targetLanguage, text, translatedText, saved }
    } as const),

    removeSavedTranslations: (id: number) => ({
        type: REMOVE_SAVED_TRANSLATION, id
    } as const),


    setTranslationHistory: (sourceLanguage: string, targetLanguage: string, text: string, translatedText: string, saved: boolean) => ({
        type: SET_TRANSLATION_HISTORY,
        payload: { sourceLanguage, targetLanguage, text, translatedText, saved }
    } as const),

    setDetectedLanguage: (language: string) => ({ type: SET_DETECTED_LANGUAGE, language } as const),

    setIsLoading: (isLoading: boolean) => ({ type: SET_IS_LOADING, isLoading } as const),

    deleteTranslation: (id: number) => ({ type: DELETE_TRANSLATION, id } as const)
}