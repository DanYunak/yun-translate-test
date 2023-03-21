import { FC } from 'react'
import { flagIconsCondition } from '../../lib/helpers/flagIconsCondition'

type PropsType = {
    language: string
}

export const CountryFlag: FC<PropsType> = ({ language }) => {
    return (
        <div className='country__flag'>
            {flagIconsCondition(language)}
        </div>
    )
}