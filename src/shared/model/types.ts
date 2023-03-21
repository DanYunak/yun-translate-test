export type OptionsType = {
    method: string;
    url: string;
    headers: {
        'content-type': string;
        'Accept-Encoding': string;
        'X-RapidAPI-Key': string;
        'X-RapidAPI-Host': string;
    };
    data: URLSearchParams;
}

export type TitleType = 'history' | 'savedTranslations' | 'settings'