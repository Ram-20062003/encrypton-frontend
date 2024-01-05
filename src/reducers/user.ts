import { LOGIN_SUCCESS } from "../actions/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function postReducer(state: any = null, action: any) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				name: action.payload.name,
				email: action.payload.email,
				userToken: action.payload.jwt,
			};
		default:
			return state;
	}
}
