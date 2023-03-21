import { FC, memo } from 'react'
import { ChangeTheme } from '../../../features/ChangeTheme'
import './Header.css'

export const Header: FC = memo(() => {
    return (
        <div className='header'>
            {window.innerWidth >= 690 &&
                <ChangeTheme component='header' />
            }
        </div>
    )
})