import { Input, Space, Spin } from 'antd'
import { FC, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { SelectLanguage } from '../../../features/SelectLanguage'
import { options } from '../../../pages/Translator/languageOptions'
import { actions } from '../../../redux/actions/translation-actions'
import { getIsLoading, getSourceLanguage, getTargetLanguage, getTranslatedText } from '../../../redux/selectors/translation-selector'
import { useAppDispatch } from '../../../redux/store'
import './TranslateOutput.css'

type PropsType = {
    text: string
}

export const TranslateOutput: FC<PropsType> = memo(({ text }) => {
    const translatedText = useSelector(getTranslatedText)
    const sourceLanguage = useSelector(getSourceLanguage)
    const targetLanguage = useSelector(getTargetLanguage)
    const isLoading = useSelector(getIsLoading)

    const [defaultValue, setDefaultValue] = useState(targetLanguage)

    const dispatch = useAppDispatch()

    const handleTargetLanguageChange = (value: string) => {
        dispatch(actions.setTargetLanguage(value))
        localStorage.setItem('targetLanguage', JSON.stringify(value))
    }

    const optionsWithoutDetect = options.filter(opt => opt.value !== 'detect')

    return (
        <div className='translated__text'>
            <SelectLanguage languageOptions={optionsWithoutDetect} defaultValue={defaultValue} onSelect={handleTargetLanguageChange}
                selectedLanguage={sourceLanguage} value={sourceLanguage === targetLanguage ? '' : targetLanguage} />
            <Space>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Input.TextArea
                        value={text !== '' && translatedText ? translatedText : ''}
                        className='translation__field' style={{ height: 150, resize: 'none' }}
                    />
                    {isLoading && (
                        <Spin style={{ position: 'absolute' }} size='large' />
                    )}
                </div>
            </Space>
        </div>
    )
})