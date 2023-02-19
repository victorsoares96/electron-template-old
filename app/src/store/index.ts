/* eslint-disable import/order */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { mainApi } from '@src/api/main/main.api';
import hotkeysSlice from '@src/store/hotkeys/hotkeys.slice';
import sessionSlice from '@src/store/session/session.slice';
import sidebarSlice from '@src/store/sidebar/sidebar.slice';

import notificationSlice from './notification/notification.slice';
import settingsSlice from './settings/settings.slice';
import calendarReducer from './calendar/calendar.slice';
import chatReducer from './chat/chat.slice';
import kanbanReducer from './kanban/kanban.slice';
import mailReducer from './mail/mail.slice';
import productReducer from './product/product.slice';

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  product: persistReducer(productPersistConfig, productReducer),
  session: sessionSlice,
  hotkeys: hotkeysSlice,
  settings: settingsSlice,
  sidebar: sidebarSlice,
  notification: notificationSlice,
  [mainApi.reducerPath]: mainApi.reducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
  },
  rootReducer,
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }) /* .concat(mainApi.middleware) */,
});

const persistor = persistStore(store);

export { store, persistor };
