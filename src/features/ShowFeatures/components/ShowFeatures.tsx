import { FC, memo } from 'react';
import { Show } from '../../../shared/components/Show/Show';
import './ShowFeatures.css'

type PropsType = {
    changeHistoryStatus: () => void
    changeSavedTranslationsStatus: () => void
    changeSettingsStatus: () => void
}

export const ShowFeatures: FC<PropsType> = memo(({ changeHistoryStatus, changeSavedTranslationsStatus, changeSettingsStatus }) => {
    return (
        <div className='show__features'>
            <div>
                <Show title='history' onClick={changeHistoryStatus} />
            </div>
            <div className='show__saved_translations'>
                <Show title='savedTranslations' onClick={changeSavedTranslationsStatus} />
            </div>
            {window.innerWidth <= 690 &&
                <div className='show__settings'>
                    <Show title='settings' onClick={changeSettingsStatus} />
                </div>
            }
        </div>
    )
})