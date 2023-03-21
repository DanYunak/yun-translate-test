import { takeEvery } from '@redux-saga/core/effects';
import { CHANGE_THEME } from '../../../../redux/consts';
import { ThemeType } from '../../../../redux/types';

type ActionType = {
    theme: ThemeType
}

function* changeTheme(action: ActionType | any) {
    try {
        localStorage.setItem('theme', JSON.stringify(action.theme))
    } catch {
        console.error('Error theme')
    }
}

export function* watchChangeTheme() {
    yield takeEvery(CHANGE_THEME, changeTheme)
}