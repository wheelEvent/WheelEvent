/**
 * @NOTE
 * - Create new *.js file for each big page to avoid Cthulhu code ...
 *  -> see main.js, var scriptToLoad
 */
(function() {
	'use strict';
	// ctrl+k+3 for better view
	/**
	 * Initialize les objet principaux de la vue
	 * Usage :
		 * 	$(element).wheelEventInitialize('maSuperPage', {
		 *		onRender: function(){
		 *			// action lors du render terminé de l'element
		 *		},
		 *		onChangePage: function() {
		 *			// action lors de la suppression terminé de l'élément
		 *		},
		 * 		mustBeConnected: false // @TODO vérifie que l'user est connecté avant d'afficher la page
		 *	});
	 *	$(element).trigger('render');
	 * @param  {Object} method pour les trigger onRender et onChangePage
	 */
	$.fn.wheelEventInitialize = function(logName = 'noname', options = {}) {
		console.info('wheelEventInitialize', this);
		if (logName.constructor !== String) {
			console.warn('logName must be a String');
			return;
		}
		if (options.constructor !== Object) {
			console.warn('options must be a Object');
			return;
		}
		this.data('logName', logName);
		/**
		 * Processus de changement d'élément sur la vue :
		 * this == $(element)
		 * oldPage == element actuellement présent dans la page
		 *
		 * quand $(element).trigger('render');
		 * 	this.render
		 * 		oldPage.beforeChangePage
		 * 		oldPage.slideUp
		 * 		->	oldPage.onChangePage
		 * 			oldPage.afterChangePage
		 * 			this.beforeRender
		 * 		<-	this.slideDown
		 * 		this.onRender
		 */
		var defaultOptions = {
			onRender: function() {
				console.info('wheelEventInitialize : onRender', $(this).data('logName'));
				console.log('onRender');
			},
			onChangePage: function() {
				console.info('wheelEventInitialize : onChangePage', $(this).data('logName'));
				console.log('leaving page');
			},
			mustBeConnected: false
		};
		var base = {
			render: function() {
				console.info('wheelEventInitialize : render', $(this).data('logName'));
				if ($('main').children().length === 0) {
					$('main').append($(this));
					$(this).trigger('beforeRender');
				} else {
					$('main').children().trigger('beforeChangePage', [this]);
				}
			},
			beforeChangePage: function(e, newPage) {
				console.info('wheelEventInitialize : beforeChangePage', $(this).data('logName'));
				var _this = this;
				$(this).slideUp(700, function() {
					$(_this).trigger('onChangePage');
					$(_this).trigger('afterChangePage', [newPage]);
				});
			},
			afterChangePage: function(e, newPage) {
				console.info('wheelEventInitialize : afterChangePage', $(this).data('logName'));
				$(this).remove();
				$('main').append($(newPage));
				$(newPage).trigger('beforeRender');
			},
			beforeRender: function() {
				console.info('wheelEventInitialize : beforeRender', $(this).data('logName'));
				var _this = this;
				$(this).css('display', 'none');
				$(_this).trigger('onRender');
				$(this).slideDown(700);
			}
		};
		var opt = Object.assign(defaultOptions, options, base);
		this.on('onRender', opt.onRender);
		this.on('onChangePage', opt.onChangePage);
		this.on('beforeChangePage', opt.beforeChangePage);
		this.on('afterChangePage', opt.afterChangePage);
		this.on('beforeRender', opt.beforeRender);
		this.on('render', opt.render);
	};

	var wheelEvent = {
		init() {
			// doing different things depends on window.location.hash
			wheelEvent.navBar();
			wheelEvent.footer();

			var onHashChange = function() {
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
						wheelEvent.pageNotFound();
						break;
				}
			};
			// cross browser hash change detection
			if (!('onhashchange' in window)) {
				var oldHref = location.href;
				setInterval(function() {
					var newHref = location.href;
					if (oldHref !== newHref) {
						var _oldHref = oldHref;
						oldHref = newHref;
						onHashChange.call(window, {
							type: 'hashchange',
							newURL: newHref,
							oldURL: _oldHref
						});
					}
				}, 100);
			} else if (window.addEventListener) {
				window.addEventListener('hashchange', onHashChange, false);
			} else if (window.attachEvent) {
				window.attachEvent('onhashchange', onHashChange);
			}
			onHashChange();
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
			console.info('wheelEvent.homePage()');
			var homePage = $(
				'<div class="row flow-text">' +
					'<div class="col s12">' +
						'<div class="component">' +
							'<div class="cn-wrapper opened-nav" id="cn-wrapper">' +
								'<ul>' +
									'<li><a href="#"><span>Le concept</span></a></li>' +
									'<li><a href="#"><span>Carte</span></a></li>' +
									'<li><a href="#"><span>Mes Events</span></a></li>' +
									'<li><a href="#"><span>Ma Page</span></a></li>' +
									'<li><a href="#"><span>À propos</span></a></li>' +
									'<li><a href="#"><span>C.G.V.</span></a></li>' +
								 '</ul>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>'
			);

			homePage.find('.opened-nav a').click(function(event) {
				if ($('.opened-nav').hasClass('loading')) {
					$('.opened-nav').removeClass('loading');
				} else {
					$('.opened-nav').addClass('loading');
				}
			});
			homePage.wheelEventInitialize('homePage');
			homePage.trigger('render');
			return;
			// ctrl + k + 4 for better view
			/**
			 * FUNCTIONS
			 */
			/**
			 * fonction temporaire, il suffit de changer window.location.hash pour changer de page
			 * @param {Boolean} isUserOk true if correctly connected
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
			home.wheelEventInitialize('homePage', {
				onRender: function() {
					console.info('wheelEventInitialize : onRender', $(this).data('logName'));
					$('main').addClass('valign-wrapper');
				},
				onChangePage: function() {
					console.info('wheelEventInitialize : onChangePage', $(this).data('logName'));
					$('main').removeClass('valign-wrapper');
				}
			});
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

			// @TODO move this in another function ?
			// check if we are changing page or intiate app, then add home to page
			home.trigger('render');

			// @TODO disconnect button when connected
			// $('#logout').click(function logout() {
			// 	firebase.auth().signOut().then(function() {
			// 		console.info('Sign-out successful.');
			// 	}).catch(function(error) {
			// 		console.warn('An error happened.', error);
			// 	});
			// });
		},
		pageNotFound() {
			console.info('wheelEvent.pageNotFound()');
			var pageNotFound = $(
				'<div class="row flow-text">' +
					'<div class="col s12">' +
						'<h2 class="center-align">Erreur 404</h2>' +
						'<p class="center-align">' +
							'Page introuvable ou inexistante' +
						'</p>' +
					'</div>' +
				'</div>'
			);
			pageNotFound.wheelEventInitialize('pageNotFound');
			pageNotFound.trigger('render');
		},
		guid() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0;
				var v = c === 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		},
		toString() {
			// toString obfuscation
			return 'Object';
		}
	};
	window.app = {
		init: wheelEvent.init
	};
})();
