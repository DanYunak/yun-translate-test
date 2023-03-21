import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { translationReducer } from './reducers/translation-reducer'
import { rootSaga } from './sagas/rootSaga'

const rootReducer = combineReducers({
    translation: translationReducer
})

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never