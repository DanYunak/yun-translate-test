import { FC, memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { getSavedTranslations, getTheme } from '../../../../redux/selectors/translation-selector'
import { Close } from '../../../../shared/components/Close/Close'
import { isSaved } from '../../../../shared/lib/helpers/findIsSaved'
import { themeClassCondition } from '../../../../shared/lib/helpers/themeClassCondition'
import { Translation } from '../../../Translation'
import './SavedTranslations.css'

type PropsType = {
    changeSavedTranslationsStatus: () => void
}


export const SavedTranslations: FC<PropsType> = memo(({ changeSavedTranslationsStatus }) => {
    const theme = useSelector(getTheme)
    const savedTranslationsState = useSelector(getSavedTranslations)

    const [savedTranslations, setSavedTransletions] = useState(savedTranslationsState)

    useEffect(() => {
        setSavedTransletions(savedTranslationsState)
    }, [savedTranslationsState])

    return (
        <div className='saved__translations_wrapper'>
            <div className={`saved__translations saved__translations_${themeClassCondition(theme)}`}>
                {savedTranslations.length === 0 &&
                    <div className='saved__translation_empty'>
                        You don't have any saved translations yet
                    </div>
                }
                <div className='saved__translations_header'>
                    <span className='saved__translations_title'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        Saved Translations
                    </span>
                    <div className='close__saved_translations'>
                        <Close changeStatus={changeSavedTranslationsStatus} title='savedTranslations' />
                    </div>
                </div>
                {savedTranslations.map((savedTr) => (
                    <Translation translation={savedTr} isSaved={isSaved(savedTranslations, savedTr.id)} array={savedTranslations}
                        setArray={setSavedTransletions} title='savedTranslations' />
                ))}
            </div>
        </div>
    )
})