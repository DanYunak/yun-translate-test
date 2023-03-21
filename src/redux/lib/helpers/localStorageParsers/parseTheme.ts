const themeString = localStorage.getItem('theme')

export const themeParse = themeString !== null ? JSON.parse(themeString) : null