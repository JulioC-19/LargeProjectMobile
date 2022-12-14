export enum AuthActionTypes {
  LOGIN,
  SIGNOUT,
  FAIL,
  RETRIEVE_USER,
}

export type AuthState = {
  email?: string | null;
  password?: string | null;
  authToken?: string | null;
  isLoading?: boolean;
  firstName?: string | null;
  lastName?: string | null;
  profilePicture?: string | null;
};

export const initAuthState: AuthState = {
  email: '',
  password: '',
  authToken: null,
  isLoading: false,
  firstName: '',
  lastName: '',
  profilePicture: '',
};
/**
 * Takes in a payload what will contain the necessary data for
 * the authentication process and the action types.
 */
type AuthAction = {
  payload?: AuthState;
  type: AuthActionTypes;
};

export function authStateReducer(
  state: AuthState,
  action: AuthAction,
): AuthState {
  switch (action.type) {
    // First time the user logins
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        isLoading: action.payload?.isLoading,
      };
    // If user is authenticated, retrieve the information
    case AuthActionTypes.RETRIEVE_USER:
      return {
        email: action.payload?.email,
        password: action.payload?.password,
        authToken: action.payload?.authToken,
        isLoading: false,
        firstName: action.payload?.firstName,
        lastName: action.payload?.lastName,
        profilePicture: action.payload?.profilePicture,
      };
    // Clear the user token, email and password
    case AuthActionTypes.FAIL:
    case AuthActionTypes.SIGNOUT:
      return {
        email: '',
        password: '',
        authToken: null,
        isLoading: false,
        firstName: '',
        lastName: '',
        profilePicture: '',
      };
  }
}
