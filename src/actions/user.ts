import { SIGN_UP_SUCCESS, LOGIN_SUCCESS } from "./types";

export const signUpSuccess = (data: {
	name: string;
	email: string;
	jwt: string;
}) => {
	return {
		type: SIGN_UP_SUCCESS,
		payload: data,
	};
};

export const loginSuccess = (data: {
	token: {
		jwt_token: string;
	};
	user: {
		name: string;
		email: string;
	};
}) => {
	return {
		type: LOGIN_SUCCESS,
		payload: {
			name: data.user.name,
			email: data.user.email,
			jwt: data.token.jwt_token,
		},
	};
};
