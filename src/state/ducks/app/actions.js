import {
	CURRENT_TAB_OPEN,
	IS_MOBILE_MENU_OPEN,
	LOGIN_SUCCESS,
	LOGIN_FAILD,
	SIGNUP_FAILD,
	SINGUP_SUCCESS,
	LOGOUT_FAILD,
	LOGOUT_SUCCESS,
	RECOVERY_FAILD,
	RECOVERY_SUCCESS,
} from './types';

import { wroker, analytics } from 'config/firebase';

export const mobileMenuHandle = (isMobileMenuOpen) => {
	return (dispatch, getState) => {
		dispatch({
			type: IS_MOBILE_MENU_OPEN,
			payload: {
				[IS_MOBILE_MENU_OPEN]: isMobileMenuOpen,
			},
		});
	};
};

export const openTab = (currentTabOpen) => {
	return (dispatch, getState) => {
		dispatch({
			type: CURRENT_TAB_OPEN,
			payload: {
				[CURRENT_TAB_OPEN]: currentTabOpen,
			},
		});
	};
};

export const showError = (type, payload) => (dispatch, getState) => {
	dispatch({
		type,
		payload,
	});
};

export const signin = (credentials) => {
	return async (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();
		try {
			const res = await firebase
				.auth()
				.signInWithEmailAndPassword(
					credentials.email,
					credentials.password
				);
			const user = await firestore
				.collection('users')
				.doc(res.user.uid)
				.get();
			const u = user.data();
			if (u) {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: u,
				});
				analytics.logEvent('login', {
					type: LOGIN_SUCCESS,
					user: u,
				});
			} else {
				dispatch({
					type: LOGIN_FAILD,
					payload: 'User not found',
				});
				analytics.logEvent('exception', {
					type: LOGIN_FAILD,
					description: 'User not found',
					fatal: true,
				});
			}
		} catch (error) {
			analytics.logEvent('exception', {
				type: LOGIN_FAILD,
				description: error.message,
				fatal: true,
			});
			dispatch({
				type: LOGIN_FAILD,
				payload: error.message,
			});
		}
	};
};

export const googleSignin = () => {
	return async (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();
		try {
			const res = await firebase.login({
				provider: 'google',
				type: 'popup',
			});

			if (res.additionalUserInfo.isNewUser) {
				await res.user.delete();
				dispatch({
					type: LOGIN_FAILD,
					payload: 'User not found',
				});
				analytics.logEvent('exception', {
					type: LOGIN_FAILD,
					description: 'User not found',
					user: res.user,
					fatal: true,
				});
			} else {
				const user = await firestore
					.collection('users')
					.doc(res.user.uid)
					.get();
				const u = user.data();
				if (u) {
					dispatch({
						type: LOGIN_SUCCESS,
						payload: u,
					});
					analytics.logEvent('login', {
						type: LOGIN_SUCCESS,
						user: u,
					});
				} else {
					dispatch({
						type: LOGIN_FAILD,
						payload: 'User not found',
					});
					analytics.logEvent('exception', {
						type: LOGIN_FAILD,
						description: 'User not found',
						fatal: true,
					});
				}
			}
		} catch (error) {
			dispatch({
				type: LOGIN_FAILD,
				payload: error.message,
			});
			analytics.logEvent('exception', {
				type: LOGIN_FAILD,
				description: error.message,
				fatal: true,
			});
		}
	};
};

export const signup = (credentials) => {
	return async (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		try {
			const res = await wroker
				.auth()
				.createUserWithEmailAndPassword(
					credentials.email,
					credentials.password
				);

			res.user.sendEmailVerification();
			delete credentials.password;
			await firestore
				.collection('users')
				.doc(res.user.uid)
				.set(credentials);
			dispatch({
				type: SINGUP_SUCCESS,
			});
			analytics.logEvent('sign_up', {
				email: credentials.email,
				uid: res.user.uid,
			});
		} catch (error) {
			dispatch({
				type: SIGNUP_FAILD,
				payload: error.message,
			});
			analytics.logEvent('exception', {
				type: SIGNUP_FAILD,
				description: error.message,
				fatal: true,
			});
		}
	};
};

export const logout = () => {
	return async (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		try {
			await firebase.auth().signOut();
			dispatch({
				type: LOGOUT_SUCCESS,
			});
			analytics.logEvent(LOGOUT_SUCCESS, {
				type: LOGOUT_SUCCESS,
			});
		} catch (error) {
			dispatch({
				type: LOGOUT_FAILD,
				payload: error.message,
			});
			analytics.logEvent('exception', {
				type: LOGOUT_FAILD,
				description: error.message,
				fatal: true,
			});
		}
	};
};

export const sendRecoveryLink = (email) => {
	return async (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		try {
			await firebase.auth().sendPasswordResetEmail(email);
			dispatch({
				type: RECOVERY_SUCCESS,
			});
			analytics.logEvent(RECOVERY_SUCCESS, {
				type: RECOVERY_SUCCESS,
				email: email,
			});
		} catch (error) {
			dispatch({
				type: RECOVERY_FAILD,
				payload: error.message,
			});
			analytics.logEvent('exception', {
				type: RECOVERY_FAILD,
				description: error.message,
				fatal: true,
			});
		}
	};
};

export const setUser = (user) => {
	return (dispatch, getState) => {
		dispatch({
			type: LOGIN_SUCCESS,
			payload: user,
		});
	};
};
