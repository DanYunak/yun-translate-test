import { actions } from '../../../redux/actions/translation-actions'
import { TranslationType } from '../../../redux/reducers/translation-reducer'

export const handleSaveTranslation = (array: TranslationType[], id: number, dispatch: any, isSaved: boolean, setArray: (updatedArray: TranslationType[]) => void) => {
    const updatedArray = array.map(translation => {
        if (translation.id === id) {
            const updatedTranslation = {
                ...translation,
                saved: !translation.saved
            }
            if (isSaved === false) {
                dispatch(actions.setSavedTranslations(id, translation.sourceLanguage, translation.targetLanguage, translation.text, translation.translatedText, translation.saved))
            } else {
                // @ts-ignore
                const savedTranslations = JSON.parse(localStorage.getItem('savedTranslations')) || []
                const updatedSavedTranslations = savedTranslations.filter((tr: TranslationType) => tr.id !== translation.id)
                dispatch(actions.removeSavedTranslations(id))
                localStorage.setItem('savedTranslations', JSON.stringify(updatedSavedTranslations))

                const updatedArray = array.map((tr) => {
                    if (tr.id === id) {
                        return {
                            ...tr,
                            saved: false,
                        }
                    }
                    return tr
                })
                setArray(updatedArray)
            }
            return updatedTranslation
        }
        return translation
    })
    setArray(updatedArray)
}