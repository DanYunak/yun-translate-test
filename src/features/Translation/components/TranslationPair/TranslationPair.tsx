import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { getTheme } from '../../../../redux/selectors/translation-selector'

type PropsType = {
    text: string
    translatedText: string
}

export const TranslationPair: FC<PropsType> = memo(({ text, translatedText }) => {
    const theme = useSelector(getTheme)

    return (
        <div className='translation__pair'>
            <div className='translation__text'>
                {text}
            </div>
            <div className={`translation__text_translated translation__text_translated_${theme === 'dark' && 'dark'}`}>
                {translatedText}
            </div>
        </div>
    )
})