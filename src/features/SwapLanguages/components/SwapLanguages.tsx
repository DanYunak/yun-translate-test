import { FC } from 'react';
import { useSelector } from 'react-redux';
import { actions } from '../../../redux/actions/translation-actions';
import { getSourceLanguage, getTargetLanguage, getTheme, getTranslatedText } from '../../../redux/selectors/translation-selector';
import { useAppDispatch } from '../../../redux/store';
import { themeClassCondition } from '../../../shared/lib/helpers/themeClassCondition';
import './SwapLanguages.css';

type PropsType = {
    onSwap: (text: string) => void
}

export const SwapLanguages: FC<PropsType> = ({ onSwap }) => {
    const dispatch = useAppDispatch()
    const theme = useSelector(getTheme)
    const sourceLanguage = useSelector(getSourceLanguage)
    const targetLanguage = useSelector(getTargetLanguage)
    const translatedText = useSelector(getTranslatedText)

    const swapLanguages = () => {
        if (sourceLanguage !== 'detect') {
            dispatch(actions.setSourceLanguage(targetLanguage))
            dispatch(actions.setTargetLanguage(sourceLanguage))
            dispatch(actions.setTranslatedText(''))
        } else {
            dispatch(actions.setSourceLanguage(sourceLanguage))
            dispatch(actions.setTargetLanguage(targetLanguage))
        }
    }

    return (
        <div className={`swap__languages swap__languages_${themeClassCondition(theme)}`} onClick={() => {
            swapLanguages()
            onSwap(translatedText)
        }}>
            <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' fill='currentColor' viewBox='0 0 16 16'>
                <path fill-rule='evenodd' d='M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z' />
            </svg>
        </div>
    )
}