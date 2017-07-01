/**
 * Get help here https://firebase.google.com/docs/database/web/read-and-write
 */
(function() {
	'use strict';

	var wheelEventGet = {
		/**
		 * @return {uid} User uid provided by firebase
		 */
		currentUserId() {
			var user = firebase.auth().currentUser;
			if (user) {
				return user.uid;
			}
			return false;
		},
		isConnected() {
			var user = firebase.auth().currentUser;
			if (user) {
				return true;
			}
			return false;
		},
		/**
		 * get user data from DB
		 * @param  {Function} callback called when done with userData as object or false if user hasn't been found
		 */
		currentUser(callback) {
			var userId = wheelEventGet.currentUserId();
			var user = firebase.database().ref('users/' + userId);
			user.once('value').then(function(snapshot) {
				snapshot = snapshot.val();
				if (snapshot === null) {
					console.warn('currentUser failed : user doesn\'t exist');
					return callback(false);
				}
				console.info('currentUser succeded', snapshot);
				return callback(snapshot);
			});
		}
	};
	window.get = function() {
		return wheelEventGet;
	};
})();
