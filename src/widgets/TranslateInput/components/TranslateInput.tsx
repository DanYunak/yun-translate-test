import { Input } from 'antd'
import { ChangeEvent, FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { SelectLanguage } from '../../../features/SelectLanguage'
import { options } from '../../../pages/Translator/languageOptions'
import { actions } from '../../../redux/actions/translation-actions'
import { getSourceLanguage, getTargetLanguage } from '../../../redux/selectors/translation-selector'
import { useAppDispatch } from '../../../redux/store'
import './TranslateInput.css'

type PropsType = {
    text: string
    onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export const TranslateInput: FC<PropsType> = memo(({ text, onTextChange }) => {
    const targetLanguage = useSelector(getTargetLanguage)
    const sourceLanguage = useSelector(getSourceLanguage)

    const dispatch = useAppDispatch()

    const handleSourceLanguageChange = (value: string) => {
        dispatch(actions.setSourceLanguage(value))
        localStorage.setItem('sourceLanguage', JSON.stringify(value))
    }

    return (
        <div className='translate__text'>
            <SelectLanguage languageOptions={options} defaultValue={sourceLanguage} onSelect={handleSourceLanguageChange}
                selectedLanguage={targetLanguage} value={sourceLanguage} />
            <Input.TextArea value={text} onChange={onTextChange} style={{ resize: 'none', height: 150 }}
                className='translation__field' placeholder='Enter the text to translate'
            />
        </div>
    )
})