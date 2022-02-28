import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  SetUser: "[Set User] Action",
};

const initialAuthState = {
  user: undefined
};

export const reducer = persistReducer(
  { storage, key: "auth", whitelist: ["user"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { user } = action.payload;
        return {
          user: {
            startTime: new Date(),
            ...user
          }
        };
      }


      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.

        return {
          user: undefined,
          _persist: { version: -1, rehydrated: true }
        }
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: (user) => ({ type: actionTypes.Login, payload: { user } }),

  fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
};

export function* saga() {

}
