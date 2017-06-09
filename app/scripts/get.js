/**
 * Get help here https://firebase.google.com/docs/database/web/read-and-write
 */
(function() {
	'use strict';
	var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
		// [::1] is the IPv6 localhost address.
		window.location.hostname === '[::1]' ||
		// 127.0.0.1/8 is considered localhost for IPv4.
		window.location.hostname.match(
			/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
			)
		);
	var log = function(...args) {
		if (isLocalhost) {
			console.log.apply(console, args);
		}
	};
	var info = function(...args) {
		if (isLocalhost) {
			console.info.apply(console, args);
		}
	};
	var warn = function(...args) {
		console.warn.apply(console, args);
	};

	var wheelEventGet = {
		/**
		 * @return {uid} User uid provided by firebase
		 */
		currentUserId() {
			return firebase.auth().currentUser.uid;
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
					warn('currentUser failed : user doesn\'t exist');
					return callback(false);
				}
				info('currentUser succeded', snapshot);
				return callback(snapshot);
			});
		}
	};
	window.get = wheelEventGet;
})();
