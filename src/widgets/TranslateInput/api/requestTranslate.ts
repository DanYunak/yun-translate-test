import axios from 'axios'
import { apiKeys } from '../../../shared/api/apiKeys'
import { OptionsType } from '../../../shared/model/types'

type ResponseType = {
    data: {
        translations: [
            {
                translatedText: string
            }
        ]
    }
}

export const requestTranslateAPI = (options: OptionsType): Promise<string | ResponseType> => {
    return axios.request<ResponseType>(options).then(res => res.data.data.translations[0].translatedText)
    .catch(() => {
        console.clear()
        const keyIndex = apiKeys.findIndex((key: any) => key['X-RapidAPI-Key'] === options.headers['X-RapidAPI-Key'])
        
        if (keyIndex === -1 || keyIndex === apiKeys.length - 1) {
            throw new Error('All API keys have been used')
        }

        options.headers['X-RapidAPI-Key'] = apiKeys[keyIndex + 1]['X-RapidAPI-Key']
        
        console.clear()
        return requestTranslateAPI(options)
    })
}