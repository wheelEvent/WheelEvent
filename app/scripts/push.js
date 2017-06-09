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

	var wheelEventPush = {
		/**
		 * Create user in BDD
		 * @param  {string}   _username        name given by socialNetwork
		 * @param  {string}   _email           mail given by socialNetwork
		 * @param  {string}   _profilePicture  URL given bu socialNetwork
		 * @param  {Function} callback         called when done with true if success or false if user already exist
		 */
		createUser(_username, _email, _profilePicture, callback) {
			var userId = window.get.currentUserId();
			var user = firebase.database().ref('users/' + userId);
			user.once('value').then(function(snapshot) {
				snapshot = snapshot.val();
				if (snapshot === null) {
					var newUser = {
						username: _username,
						email: _email,
						profilePicture: _profilePicture
					};
					user.set(newUser);
					if (isLocalhost) {
						info('createUser succeded', newUser);
					}
					return callback(true);
				}
				warn('createUser failed : user already exist');
				return callback(false);
			});
		}
	};
	window.push = wheelEventPush;
})();
