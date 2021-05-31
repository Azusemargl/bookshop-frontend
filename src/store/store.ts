import { ThunkAction } from 'redux-thunk'
import { createStore, Action, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// Types
export type AppState = ReturnType<typeof rootReducer>
export type InferAction<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never
export type BaseThunk<A extends Action, R = Promise<void>> = ThunkAction<R, AppState, unknown, A>
