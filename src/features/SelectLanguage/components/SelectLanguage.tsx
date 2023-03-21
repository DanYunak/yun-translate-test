import { Select } from 'antd'
import { FC, useState } from 'react'
import './SelectLanguage.css'

type LanguageOption = {
    value: string
    label: string
}

type PropsType = {
    languageOptions: LanguageOption[]
    defaultValue: string
    onSelect: (value: string) => void
    selectedLanguage: string
    value: string
}

export const SelectLanguage: FC<PropsType> = ({ languageOptions, defaultValue, onSelect, selectedLanguage, value }) => {
    const [options, setOptions] = useState<LanguageOption[]>(languageOptions)

    const handleChange = (value: string) => {
        if (value !== selectedLanguage) {
            onSelect(value)
        }
    }

    return (
        <div className='language__change'>
            <Select
                style={{ width: '100%' }}
                defaultValue={defaultValue}
                value={value}
                placeholder='Select a language'
                optionFilterProp='children'
                onChange={handleChange}
                size='large'
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={options.map((option) => ({
                    ...option,
                    disabled: option.value === selectedLanguage,
                }))}
            />
        </div>
    )
}