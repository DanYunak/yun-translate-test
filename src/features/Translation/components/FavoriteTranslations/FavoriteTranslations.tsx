import { StarFilled, StarOutlined } from '@ant-design/icons';
import { FC, memo } from 'react';

type PropsType = {
    id: number
    handleSaveTranslation: (id: number) => void
    isSaved: boolean
}

export const FavoriteTranslations: FC<PropsType> = memo(({ id, handleSaveTranslation, isSaved}) => {
    return (
        <div className='favorite__translations' onClick={() => handleSaveTranslation(id)}>
            {isSaved === false
                ? <div className='save'>
                    <StarOutlined />
                </div>
                : <div className='remove__saved'>
                    <StarFilled />
                </div>
            }
        </div>
    )
})