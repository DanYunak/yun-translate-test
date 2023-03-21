import { FC, memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import { SavedTranslations } from './features/SavedTranslations'
import { Settings } from './features/Settings'
import { ShowFeatures } from './features/ShowFeatures'
import { TranslationHistory } from './features/TranslationHistory'
import { Translator } from './pages/Translator/index'
import { actions } from './redux/actions/translation-actions'
import { getTheme } from './redux/selectors/translation-selector'
import { useAppDispatch } from './redux/store'
import { themeClassCondition } from './shared/lib/helpers/themeClassCondition'
import { Header } from './widgets/Header/index'

export const App: FC = memo(() => {
  const [isTranslationHistoryEnabled, setIsTranslationHistoryEnabled] = useState(false)
  const [isSavedTranslationsEnabled, setIsSavedTranslationsEnabled] = useState(false)
  const [isSettingsEnabled, setIsSettingsEnabled] = useState(false)

  const theme = useSelector(getTheme)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!theme) {
      dispatch(actions.changeTheme('dark'))
    }
  }, [theme])

  const additionalFeaturesCondition = isTranslationHistoryEnabled || isSavedTranslationsEnabled ? 'additional__features_enabled' : ''

  const changeHistoryStatus = useCallback(() => {
    setIsTranslationHistoryEnabled(prevIsTranslationHistoryEnabled => !prevIsTranslationHistoryEnabled)
    setIsSavedTranslationsEnabled(false)
    setIsSettingsEnabled(false)
  }, [])

  const changeSavedTranslationsStatus = useCallback(() => {
    setIsSavedTranslationsEnabled(prevIsSavedTranslationsEnabled => !prevIsSavedTranslationsEnabled)
    setIsTranslationHistoryEnabled(false)
    setIsSettingsEnabled(false)
  }, [])

  const changeSettingsStatus = useCallback(() => {
    setIsSettingsEnabled(prevIsSettingsEnabled => !prevIsSettingsEnabled)
    setIsTranslationHistoryEnabled(false)
    setIsSavedTranslationsEnabled(false)
  }, [])

  return (
    <div className={`app__wrapper ${themeClassCondition(theme)}`}>
      <div className={`app ${additionalFeaturesCondition}`}>
        <Header />
        <Translator />
        <ShowFeatures changeHistoryStatus={changeHistoryStatus} changeSavedTranslationsStatus={changeSavedTranslationsStatus} changeSettingsStatus={changeSettingsStatus} />
      </div>
      {isTranslationHistoryEnabled && <TranslationHistory changeHistoryStatus={changeHistoryStatus} />}
      {isSavedTranslationsEnabled && <SavedTranslations changeSavedTranslationsStatus={changeSavedTranslationsStatus} />}
      {isSettingsEnabled && <Settings changeSettingsStatus={changeSettingsStatus} />}
    </div>
  )
})