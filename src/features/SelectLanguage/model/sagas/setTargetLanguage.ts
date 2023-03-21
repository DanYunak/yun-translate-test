import { put, take } from '@redux-saga/core/effects'
import { actions } from '../../../../redux/actions/translation-actions'
import { SET_TARGET_LANGUAGE } from '../../../../redux/consts'

type ActionType = {
    language: string
}

function* setTargetLanguage(action: ActionType): any {
    try {
        yield put(actions.setTargetLanguage(action.language))
    } catch {
        console.error('Error target language')
    }
}

export function* watchSetTargetLanguage() {
    // @ts-ignore
    yield take(SET_TARGET_LANGUAGE, setTargetLanguage)
}