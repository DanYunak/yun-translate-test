import { takeEvery } from '@redux-saga/core/effects';
import { SET_SAVED_TRANSLATION } from '../../../../redux/consts';
import { savedTranslationsParse } from '../../../../redux/lib/helpers/localStorageParsers/parseSavedTranslations';

type ActionType = {
    payload: {
        id: number
        sourceLanguage: string
        targetLanguage: string
        text: string
        translatedText: string
    }
}

function* saveTranslation(action: ActionType | any) {
    const { id, sourceLanguage, targetLanguage, text, translatedText } = action.payload

    try {
        const newSavedTranslation = { id, sourceLanguage, targetLanguage, text, translatedText };
        savedTranslationsParse.push(newSavedTranslation);
        localStorage.setItem('savedTranslations', JSON.stringify(savedTranslationsParse));
    } catch {
        console.error('Error save translation')
    }
}

export function* watchSaveTranslation() {
    yield takeEvery(SET_SAVED_TRANSLATION, saveTranslation)
}