import { FC, memo } from 'react'
import { TranslationType } from '../../../../redux/reducers/translation-reducer'
import { useAppDispatch } from '../../../../redux/store'
import { handleSaveTranslation } from '../../../../shared/lib/helpers/handleSaveTranslation'
import { DeleteTranslation } from '../DeleteTranslation/DeleteTranslation'
import { FavoriteTranslations } from '../FavoriteTranslations/FavoriteTranslations'
import { TranslationLanguages } from '../TranslationLanguages/TranslationLanguages'
import { TranslationPair } from '../TranslationPair/TranslationPair'
import './Translation.css'

type PropsType = {
    translation: TranslationType
    array: TranslationType[]
    setArray: (updatedArray: TranslationType[]) => void
    isSaved: boolean
    title: 'history' | 'savedTranslations'
}

export const Translation: FC<PropsType> = memo(({ translation, array, setArray, isSaved, title }) => {
    const dispatch = useAppDispatch()

    return (
        <div className='translation' key={translation.id}>
            {/* @ts-ignore */}
            <TranslationLanguages sourceLanguage={translation.sourceLanguage} targetLanguage={translation.targetLanguage} />
            <TranslationPair text={translation.text} translatedText={translation.translatedText} />
            <FavoriteTranslations id={translation.id} isSaved={isSaved}
                handleSaveTranslation={() => handleSaveTranslation(array, translation.id, dispatch, isSaved, setArray)} />
            {title === 'history' &&
                <DeleteTranslation id={translation.id} />
            }
        </div>
    )
})