import { all } from '@redux-saga/core/effects'
import { watchChangeTheme } from '../../features/ChangeTheme/model/sagas/changeTheme'
import { watchSetSourceLanguage } from '../../features/SelectLanguage/model/sagas/setSourceLanguage'
import { watchSetTargetLanguage } from '../../features/SelectLanguage/model/sagas/setTargetLanguage'
import { watchRequestTranslate } from './requestTranslate'
import { watchSaveTranslation } from '../../features/SavedTranslations/model/sagas/saveTranslation'
import { watchRequestDetect } from './requestDetect'

export function* rootSaga() {
    yield all([
        watchRequestTranslate(),
        watchRequestDetect(),
        watchChangeTheme(),
        watchSetSourceLanguage(),
        watchSetTargetLanguage(),
        watchSaveTranslation()
    ])
}