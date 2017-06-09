/*!
*
*  Web Starter Kit
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*    https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/
// eslint-env browser
(function() {
	'use strict';

	// Check to make sure service workers are supported in the current browser,
	// and that the current page is accessed from a secure origin. Using a
	// service worker from an insecure origin will trigger JS console errors. See
	// http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
	var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
		// [::1] is the IPv6 localhost address.
		window.location.hostname === '[::1]' ||
		// 127.0.0.1/8 is considered localhost for IPv4.
		window.location.hostname.match(
			/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
			)
		);

	if ('serviceWorker' in navigator &&
		(window.location.protocol === 'https:' || isLocalhost)) {
		navigator.serviceWorker.register('service-worker.js')
		.then(function(registration) {
			// updatefound is fired if service-worker.js changes.
			registration.onupdatefound = function() {
				// updatefound is also fired the very first time the SW is installed,
				// and there's no need to prompt for a reload at that point.
				// So check here to see if the page is already controlled,
				// i.e. whether there's an existing service worker.
				if (navigator.serviceWorker.controller) {
					// The updatefound event implies that registration.installing is set:
					// https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
					var installingWorker = registration.installing;

					installingWorker.onstatechange = function() {
						switch (installingWorker.state) {
							case 'installed':
							// At this point, the old content will have been purged and the
							// fresh content will have been added to the cache.
							// It's the perfect time to display a "New content is
							// available; please refresh." message in the page's interface.
							break;

							case 'redundant':
							throw new Error('The installing ' +
								'service worker became redundant.');

							default:
							// Ignore
						}
					};
				}
			};
		}).catch(function(e) {
			console.error('Error during service worker registration:', e);
		});
	}

	/**
	 * App JS comes here
	 */
	function loginWithProvider(provider) {
		try {
			firebase.auth().signInWithPopup(provider).then(function(result) {
				// This gives you a Facebook Access Token. You can use it to access the Facebook API.
				var token = result.credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				// ...
				console.info('logged successfully', user);
			}).catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// ...
				console.warn('logged failed');
			});
		} catch (e) {
			console.error(e);
			document.getElementById('load').innerHTML = 'Error facebook login, check the console.';
		}
	}

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
})();
