import { SaveTwoTone, SettingTwoTone, StarTwoTone } from '@ant-design/icons'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { getTheme } from '../../../redux/selectors/translation-selector'
import { themeClassCondition } from '../../lib/helpers/themeClassCondition'
import { TitleType } from '../../model/types'
import './Show.css'

type PropsType = {
    title: TitleType
    onClick: () => void
}

export const Show: FC<PropsType> = memo(({ title, onClick }) => {
    const theme = useSelector(getTheme)

    const iconCondition = (title: TitleType) => {
        switch (title) {
            case 'history':
                return <SaveTwoTone style={{ fontSize: '150%' }} />
            case 'savedTranslations':
                return <StarTwoTone style={{ fontSize: '150%' }} />
            case 'settings':
                return <SettingTwoTone style={{ fontSize: '150%' }} />
        }
    }

    const labelCondition = (title: TitleType) => {
        switch (title) {
            case 'history':
                return 'History'
            case 'savedTranslations':
                return 'Saved'
            case 'settings':
                return 'Settings'
        }
    }

    return (
        <div className='show__wrapper'>
            <div className={`show show_${themeClassCondition(theme)}`} onClick={onClick}>
                {iconCondition(title)}
            </div>
            <span className={`show__label show__label_${themeClassCondition(theme)}`}>
                {labelCondition(title)}
            </span>
        </div>
    )
})