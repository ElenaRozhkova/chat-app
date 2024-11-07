export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const SIGNIN_ROUTE = `${AUTH_ROUTES}/signin`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const UPDATE_PROFILE_IMAGE = `${AUTH_ROUTES}/update-image`;
export const REMOVE_PROFILE_IMAGE = `${AUTH_ROUTES}/remove-profile`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;


export const CONTACTS_ROUTES = "/api/contacts";
export const SEARCH_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/search`;
export const GET_DM_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/get-contacts-for-dm`;


export const MESSAGES_ROUTES = "/api/messages";
export const GET_MESSAGES_ROUTES = `${MESSAGES_ROUTES}/get-messages`;