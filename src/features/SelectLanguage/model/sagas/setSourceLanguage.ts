import { put, take } from '@redux-saga/core/effects'
import { actions } from '../../../../redux/actions/translation-actions'
import { SET_SOURCE_LANGUAGE } from '../../../../redux/consts'

type ActionType = {
    language: string
}

function* setSourceLanguage(action: ActionType): any {
    try {
        yield put(actions.setSourceLanguage(action.language))
    } catch {
        console.error('Error source language')
    }
}

export function* watchSetSourceLanguage() {
    // @ts-ignore
    yield take(SET_SOURCE_LANGUAGE, setSourceLanguage)
}