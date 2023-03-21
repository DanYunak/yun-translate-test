import { ThemeType } from '../../../redux/types'

export const themeClassCondition = (theme: ThemeType) => {
    if (theme === 'dark') {
        return 'dark'
    } else {
        return 'light'
    }
}