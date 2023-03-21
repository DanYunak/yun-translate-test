import { call, put, takeEvery } from '@redux-saga/core/effects'
import { apiKeys } from '../../shared/api/apiKeys'
import { requestDetectAPI } from '../../widgets/TranslateInput/api/requestDetect'
import { actions } from '../actions/translation-actions'
import { REQUEST_DETECT } from '../consts'

type ActionType = {
    text: string
}

function* requestDetect(action: ActionType | any): any {
    const encodedParams = new URLSearchParams()
    encodedParams.append("q", action.text)

    const options = {
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': 'f4a20a0c86msh5bb20b921d20a76p146281jsnd53d6ebd590b',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        data: encodedParams
    }

    let res

    try {
        yield put(actions.setIsLoading(true))
        res = yield call(requestDetectAPI, options)
        
        yield put(actions.setDetectedLanguage(res))
        yield put(actions.setSourceLanguage(res))
        yield put(actions.requestTranslate(action.text))
        localStorage.setItem('sourceLanguage', JSON.stringify(res))
    } catch (error: any) {
        if (error.response && error.response.status === 429) {
            const currentApiKeyIndex = apiKeys.findIndex(apiKey => apiKey['X-RapidAPI-Key'] === options.headers['X-RapidAPI-Key'])
            if (currentApiKeyIndex < apiKeys.length - 1) {
                options.headers['X-RapidAPI-Key'] = apiKeys[currentApiKeyIndex + 1]['X-RapidAPI-Key']
                res = yield call(requestDetectAPI, options)
                yield put(actions.setDetectedLanguage(res))
                yield put(actions.setSourceLanguage(res))
                yield put(actions.requestTranslate(action.text))
                localStorage.setItem('sourceLanguage', JSON.stringify(res))
            } else {
                throw new Error('All API keys have been used')
            }
        } else {
            return
        }
    }
}

export function* watchRequestDetect() {
    yield takeEvery(REQUEST_DETECT, requestDetect)
}