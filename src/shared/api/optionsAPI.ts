import { OptionsType } from '../model/types'
import { apiKeys } from './apiKeys'

export const optionsAPI: OptionsType = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',

        'X-RapidAPI-Key': apiKeys[0]['X-RapidAPI-Key'],

        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    data: new URLSearchParams
}

export const optionsAPIWithSetData = {
    ...optionsAPI,
    setData: (data: URLSearchParams) => {
        optionsAPI.data = data
    }
}