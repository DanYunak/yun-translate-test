import axios from 'axios'
import { apiKeys } from '../../../shared/api/apiKeys'

type ResponseType = {
    data: {
        detections: [
            [
                {
                    language: string
                }
            ]
        ]
    }
}


export const requestDetectAPI = (options: any): Promise<ResponseType | string | undefined> => {
    return axios.request<ResponseType>(options).then(res => res.data.data.detections[0][0].language)
        .catch(() => {
            console.clear()
            const keyIndex = apiKeys.findIndex((key: any) => key['X-RapidAPI-Key'] === options.headers['X-RapidAPI-Key'])
            
            if (keyIndex === -1 || keyIndex === apiKeys.length - 1) {
                return
            }
            
            options.headers['X-RapidAPI-Key'] = apiKeys[keyIndex + 1]['X-RapidAPI-Key']
            
            console.clear()
            return requestDetectAPI(options)
        })
}