import {
	CURRENT_TAB_OPEN,
	IS_MOBILE_MENU_OPEN,
	LOGIN_FAILD,
	LOGIN_SUCCESS,
	SIGNUP_FAILD,
	SINGUP_SUCCESS,
	RECOVERY_FAILD,
	RECOVERY_SUCCESS,
} from './types';

export const isMobileMenuOpen = (isMobileMenuOpen = false, action) => {
	switch (action.type) {
		case IS_MOBILE_MENU_OPEN: {
			return action.payload.IS_MOBILE_MENU_OPEN;
		}

		default:
			return isMobileMenuOpen;
	}
};

export const currentTab = (currentTab = 0, action) => {
	switch (action.type) {
		case CURRENT_TAB_OPEN: {
			return action.payload.CURRENT_TAB_OPEN;
		}

		default:
			return currentTab;
	}
};

export const auth = (auth = { error: null, user: null, role: {} }, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS: {
			return { ...auth, error: null, user: action.payload };
		}
		case LOGIN_FAILD: {
			return { ...auth, error: action.payload };
		}
		case SINGUP_SUCCESS: {
			return { ...auth, error: null };
		}
		case SIGNUP_FAILD: {
			return { ...auth, error: action.payload };
		}
		case RECOVERY_SUCCESS: {
			return { ...auth, error: null };
		}
		case RECOVERY_FAILD: {
			return { ...auth, error: action.payload };
		}

		default:
			return auth;
	}
};
