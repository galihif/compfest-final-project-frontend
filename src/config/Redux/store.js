import rootReducer from './reducer'
import { createStore } from 'redux'
import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistedReducer = persistReducer({ key: 'compfest', storage }, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
