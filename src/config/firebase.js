import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { firebaseConfig } from './config';

const handleError = (error) => {
	if (error === 'failed-precondition') {
		console.log({
			message: 'Error',
			description:
				'Multiple tabs open, offline data only works in one tab at a a time.',
		});
	} else if (error === 'unimplemented') {
		console.log({
			message: 'Error',
			description: 'Cannot save offline on this browser.',
		});
	}
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({
	cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
});
firebase
	.firestore()
	.enablePersistence({ synchronizeTabs: true })
	.then(() => {
		firebase.firestore();
		console.log('Offline support enabled');
	})
	.catch((err) => {
		handleError(err.code);
		return firebase.firestore();
	});

export default firebase;
export const analytics = firebase.analytics();
export const wroker = firebase.initializeApp(firebaseConfig, 'wroker');
