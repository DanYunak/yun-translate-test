import { TranslationType } from '../../../redux/reducers/translation-reducer'

export const isSaved = (savedTranslations: TranslationType[], id: number) => {
    const savedTranslation = savedTranslations.find((savedTr: TranslationType) => savedTr.id === id)
    return savedTranslation !== undefined
}