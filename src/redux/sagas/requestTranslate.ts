import { call, put, select, takeEvery } from '@redux-saga/core/effects'
import { apiKeys } from '../../shared/api/apiKeys'
import { optionsAPI, optionsAPIWithSetData } from '../../shared/api/optionsAPI'
import { requestTranslateAPI } from '../../widgets/TranslateInput/api/requestTranslate'
import { actions } from '../actions/translation-actions'
import { REQUEST_TRANSLATE } from '../consts'
import { getSourceLanguage, getTargetLanguage } from '../selectors/translation-selector'

type ActionType = {
    text: string
    translatedText: string
}

function* requestTranslate(action: ActionType | any): any {
    const sourceLanguage = yield select(getSourceLanguage)
    const targetLanguage = yield select(getTargetLanguage)
    let res

    const encodedParams = new URLSearchParams()
    encodedParams.append('source', sourceLanguage)
    encodedParams.append('target', targetLanguage)
    encodedParams.append('q', action.text)
    
    optionsAPIWithSetData.setData(encodedParams)

    try {
        yield put(actions.setIsLoading(true))
        res = yield call(requestTranslateAPI, optionsAPI)
        yield put(actions.setTranslatedText(res))
        yield put(actions.setTranslationHistory(sourceLanguage, targetLanguage, action.text, res, false))
        yield put(actions.setIsLoading(false))
    } catch (error: any) {
        if (error.response && error.response.status === 429) {
            const currentApiKeyIndex = apiKeys.findIndex(apiKey => apiKey['X-RapidAPI-Key'] === optionsAPI.headers['X-RapidAPI-Key'])
            if (currentApiKeyIndex < apiKeys.length - 1) {
                optionsAPI.headers['X-RapidAPI-Key'] = apiKeys[currentApiKeyIndex + 1]['X-RapidAPI-Key']
                res = yield call(requestTranslateAPI, optionsAPI)
                yield put(actions.setTranslatedText(res))
                yield put(actions.setTranslationHistory(sourceLanguage, targetLanguage, action.text, res, false))
            } else {
                throw new Error('All API keys have been used')
            }
        } else {
            return
        }
    }
}

export function* watchRequestTranslate() {
    yield takeEvery(REQUEST_TRANSLATE, requestTranslate)
}