import { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SwapLanguages } from '../../../features/SwapLanguages'
import { actions } from '../../../redux/actions/translation-actions'
import { getSourceLanguage, getTargetLanguage } from '../../../redux/selectors/translation-selector'
import { useAppDispatch } from '../../../redux/store'
import { TranslateInput } from '../../../widgets/TranslateInput'
import { TranslateOutput } from '../../../widgets/TranslateOutput'
import './Translator.css'

export const Translator: FC = memo(() => {
    const dispatch = useAppDispatch()
    const sourceLanguage = useSelector(getSourceLanguage)
    const targetLanguage = useSelector(getTargetLanguage)

    const [text, setText] = useState('')
    const [timer, setTimer] = useState(0)


    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }

    const handleSwapText = (text: string) => {
        setText(text)
    }

    useEffect(() => {
        clearTimeout(timer)
        // @ts-ignore
        setTimer(setTimeout(() => {
            if (text !== '') {
                requestTranslate(text)
            }
        }, 2000))
    }, [text])

    const requestTranslate = (text: string) => {
        if (sourceLanguage === 'detect') {
            dispatch(actions.requestDetect(text))
        } else {
            dispatch(actions.requestTranslate(text))
        }
    }

    useEffect(() => {
        if (text !== '') {
            requestTranslate(text)
        }
    }, [targetLanguage])

    useEffect(() => {
        if (text === '') {
            dispatch(actions.setTranslatedText(''))
        }
    }, [text])

    return (
        <div className='translator'>
            <SwapLanguages onSwap={handleSwapText} />
            <TranslateInput onTextChange={handleTextChange} text={text} />
            <TranslateOutput text={text} />
        </div>
    )
})