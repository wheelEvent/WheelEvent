/**
 * @TODO
 * - we should create new *.js file for each big page to avoid Cthulhu code ...
 */
(function() {
	'use strict';
	var wheelEvent = {
		init() {
			// doing different things depends on window.location.hash
			wheelEvent.navBar();
			wheelEvent.footer();
			var page = window.location.hash.split('/');
			// deleting '#' with substring
			switch (page[0].substring(1)) {
				// home page
				case '':
					// @TODO home page
					wheelEvent.homePage();
					break;

				// 404
				default:
					// @TODO page 404
					break;
			}
		},
		navBar() {
			var navBar = $(
				'<nav>' +
					'<ul id="slide-out" class="side-nav">' +
						'<li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>' +
						'<li><a href="#!">Second Link</a></li>' +
						'<li><div class="divider"></div></li>' +
						'<li><a class="subheader">Subheader</a></li>' +
						'<li><a class="waves-effect" href="#!">Third Link With Waves</a></li>' +
					'</ul>' +
					'<a href="#" data-activates="slide-out" class="button-collapse show-on-large"><i class="material-icons">menu</i></a>' +
				'</nav>'
			);
			$('header').empty();
			$('header').append(navBar);
			navBar.find('.button-collapse').sideNav({
				menuWidth: 300,
				// Choose whether you can drag to open on touch screens
				draggable: true,
				// swipe right to left to open menu
				edge: 'left',
				// Closes side-nav on <a> clicks
				closeOnClick: true
			});
		},
		footer() {
			// @TODO footer ?
		},
		homePage() {
			console.log('homePage');
			// ctrl + k + 4 for better view
			/**
			 * FUNCTIONS
			 */
			var goToConnectedPage = function(isUserOk) {
				// @TODO change hash to next page then update

				// trigger leavePage of previous page
				$('main').children().trigger('leavePage', function() {
					// then display newPage
					if (isUserOk) {
						$('main').html(
							'<h2>Bravo</h2>' +
							'<h1>Vous êtes bien connecté</h1>'
						);
					}
					if (!isUserOk) {
						$('main').html(
							'<h2>Erreur</h2>' +
							'<h1>Impossible de manipuler la base de données</h1>'
						);
					}
				});
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
				}
			};
			// home block & ids
			var id = {
				home: wheelEvent.guid(),
				btnConnectFB: wheelEvent.guid(),
				btnConnectG: wheelEvent.guid()
			};
			var home = $(
				'<div class="row flow-text">' +
					'<div class="col s12">' +
						'<h2 class="center-align">WheelEvent</h2>' +
						'<p>' +
							'Description du site<br>' +
							'Eu commodo ad aliquip nostrud irure consectetur mollit et in in ut deserunt deserunt eu deserunt ' +
							'exercitation ullamco quis cillum incididunt occaecat aliquip esse eu in ea veniam est non occaecat ' +
							'eu consequat consequat in voluptate magna sint esse est voluptate voluptate esse minim tempor labore ' +
						'</p>' +
						'<a href="#" id="' + id.btnConnectFB + '">Connexion&nbsp;via&nbsp;FB</a>' +
						'<a href="#" id="' + id.btnConnectG + '">Connexion&nbsp;via&nbsp;Google</a>' +
					'</div>' +
				'</div>'
			);
			home.attr('id', id.home);
			home.find('#' + id.btnConnectFB).click(function() {
				console.log('connection btn');
				var provider = new firebase.auth.FacebookAuthProvider();
				loginWithProvider(provider);
			});
			home.find('#' + id.btnConnectG).click(function() {
				console.log('connection btn');
				var provider = new firebase.auth.GoogleAuthProvider();
				loginWithProvider(provider);
			});

			// manipulate container <main>
			$('main').addClass('valign-wrapper');
			// you must call `$('main').children().trigger('leavePage');` before changing page
			home.on('leavePage', function(e, callback) {
				home.slideUp(300, function() {
					$('main').removeClass('valign-wrapper');
					home.remove();
					if (typeof callback === 'function') {
						callback();
					}
				});
			});

			// @TODO move this in another function ?
			// check if we are changing page or intiate app, then add home to page
			if ($('main').children().length === 0) {
				$('main').append(home);
			} else {
				$('main').children().trigger('leavePage', function() {
					$('main').append(home);
				});
			}

			// @TODO disconnect button when connected
			// $('#logout').click(function logout() {
			// 	firebase.auth().signOut().then(function() {
			// 		console.info('Sign-out successful.');
			// 	}).catch(function(error) {
			// 		console.warn('An error happened.', error);
			// 	});
			// });
		},
		guid() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0;
				var v = c === 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
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
