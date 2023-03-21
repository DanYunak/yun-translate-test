import { v1 as uuidv1 } from 'uuid'
import { actions } from '../actions/translation-actions'
import { savedTranslationsParse } from '../lib/helpers/localStorageParsers/parseSavedTranslations'
import { sourceLanguageParse } from '../lib/helpers/localStorageParsers/parseSourceLanguage'
import { targetLanguageParse } from '../lib/helpers/localStorageParsers/parseTargetLanguage'
import { themeParse } from '../lib/helpers/localStorageParsers/parseTheme'
import { InferActionsTypes } from '../store'
import { ThemeType } from '../types'

export type TranslationType = {
    id: number
    text: string
    translatedText: string
    sourceLanguage: string
    targetLanguage: string
    saved: boolean
}

const initialState = {
    text: '',
    translatedText: '',
    sourceLanguage: sourceLanguageParse,
    targetLanguage: targetLanguageParse,
    theme: themeParse as ThemeType,
    translationHistory: [] as TranslationType[],
    savedTranslations: savedTranslationsParse as TranslationType[],
    detectedLanguage: '',
    isLoading: false
}

type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>


export const translationReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'REQUEST_TRANSLATE':
            return {
                ...state,
                text: action.text
            }

        case 'SET_TRANSLATED_TEXT':
            return {
                ...state,
                translatedText: action.translatedText
            }

        case 'CHANGE_THEME':
            return {
                ...state,
                theme: action.theme
            }

        case 'SET_SOURCE_LANGUAGE':
            return {
                ...state,
                sourceLanguage: action.language
            }

        case 'SET_TARGET_LANGUAGE':
            return {
                ...state,
                targetLanguage: action.language
            }

        case 'SET_TRANSLATION_HISTORY':
            const translation: TranslationType = {
                ...action.payload,
                id: parseInt(uuidv1().split('-')[0], 16),
            }
            return {
                ...state,
                translationHistory: [translation, ...state.translationHistory]
            }

        case 'SET_SAVED_TRANSLATION':
            const savedTranslation: TranslationType = {
                ...action.payload,
            }
            return {
                ...state,
                savedTranslations: [savedTranslation, ...state.savedTranslations]
            }

        case 'REMOVE_SAVED_TRANSLATION':
            return {
                ...state,
                savedTranslations: [...state.savedTranslations.filter(translation => translation.id !== action.id)]
            }

        case 'SET_DETECTED_LANGUAGE':
            return {
                ...state,
                detectedLanguage: action.language
            }

        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }

        case 'DELETE_TRANSLATION':
            return {
                ...state,
                translationHistory: [...state.translationHistory.filter(translation => translation.id !== action.id)]
            }
            
        default: return state
    }
}