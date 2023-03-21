import { CloseCircleOutlined } from '@ant-design/icons'
import { FC } from 'react'
import { TitleType } from '../../model/types'
import './Close.css'

type PropsType = {
    changeStatus: () => void
    title: TitleType
}

export const Close: FC<PropsType> = ({ changeStatus, title }) => {
    return (
        <CloseCircleOutlined className='close__icon' onClick={changeStatus} />
    )
}