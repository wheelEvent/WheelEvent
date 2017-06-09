(function() {
	'use strict';
	var wheelEvent = {
		init() {
			// doing different things depends on window.location.hash
			switch (window.location.hash) {
				// home page
				case '':
				case '#':
					// @TODO home page
					wheelEvent.homePage();
					break;

				// 404
				default:
					// @TODO page 404
					break;
			}
		},
		homePage() {
			var goToConnectedPage = function(isUserOk) {
				// @TODO wheelEvent.connectedPage();
				if (isUserOk) {
					$('#message').html(
						'<h2>Bravo</h2>' +
						'<h1>Vous êtes bien connecté</h1>'
					);
				}
				if (!isUserOk) {
					$('#message').html(
						'<h2>Erreur</h2>' +
						'<h1>Impossible de manipuler la base de données</h1>'
					);
				}
			};
			var createUserIfDoesntExist = function(socialNetworkUser, callback) {
				window.get.currentUser(function(user) {
					if (!user) {
						window.push.createUser(socialNetworkUser.displayName, socialNetworkUser.email, socialNetworkUser.photoURL, callback);
					}
					if (user) {
						callback(true);
					}
				});
			};
			var loginWithProvider = function(provider) {
				try {
					firebase.auth().signInWithPopup(provider).then(function(result) {
						// This gives you a Facebook Access Token. You can use it to access the Facebook API.
						// var token = result.credential.accessToken;
						// The signed-in user info.
						var socialNetworkUser = result.user;
						console.info('logged successfully', socialNetworkUser);
						createUserIfDoesntExist(socialNetworkUser, goToConnectedPage);
					}).catch(function(error) {
						// Handle Errors here.
						var errorCode = error.code;
						var errorMessage = error.message;
						// The email of the user's account used.
						var email = error.email;
						// The firebase.auth.AuthCredential type that was used.
						var credential = error.credential;
						// ...
						console.warn('logged failed', errorCode, errorMessage, email, credential);
					});
				} catch (e) {
					console.error(e);
					document.getElementById('load').innerHTML = 'Error facebook login, check the console.';
				}
			};
			var addListenerOnExistingBtn = function() {
				$('#loginWithFacebook').click(function loginWithFacebook() {
					var provider = new firebase.auth.FacebookAuthProvider();
					loginWithProvider(provider);
				});
				$('#loginWithGoogle').click(function loginWithGoogle() {
					var provider = new firebase.auth.GoogleAuthProvider();
					loginWithProvider(provider);
				});
				$('#logout').click(function logout() {
					firebase.auth().signOut().then(function() {
						console.info('Sign-out successful.');
					}).catch(function(error) {
						console.warn('An error happened.', error);
					});
				});
			};

			addListenerOnExistingBtn();
		},
		// toString obfuscation
		toString() {
			return 'object';
		}
	};
	window.app = {
		init: wheelEvent.init
	};
	// @TODO make browser listen to window.location.hash change to detect pageChange
})();
