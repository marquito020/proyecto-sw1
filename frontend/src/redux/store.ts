import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import tokenReducer from "../redux/states/token.state";
import userReducer from "../redux/states/user.state";
import messagesReducer from "../redux/states/messages.state";

import { authApi } from "../services/auth.service";
import { chatApi } from "../services/chat.service";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
    messages: messagesReducer,
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(chatApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
