/**
 * @NOTE
 * - Create new *.js file for each big page to avoid Cthulhu code ...
 *  -> see main.js, var scriptToLoad
 * ctrl+k+3 for better view
 */
(function() {
	'use strict';
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
		this.toString = function() {
			return 'wheelEventInitialize = function(logName = \'noname\', options = {})';
		};
		if (logName.constructor !== String) {
			console.warn('logName must be a String');
			return;
		}
		if (options.constructor !== Object) {
			console.warn('options must be a Object');
			return;
		}
		var opt = {};
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
		var system = {
			render: function() {
				console.info('wheelEventInitialize : render', $(this).data('logName'));
				var _this = this;
				/**
				 * fonction qui render la page
				 */
				function renderPage() {
					if ($('main').children().length === 0) {
						$('main').append($(_this));
						$(_this).trigger('beforeRender');
					} else {
						$('main').children().trigger('beforeChangePage', [_this]);
					}
				}

				if (opt.mustBeConnected && !window.get().isConnected()) {
					wheelEvent.loginPage(renderPage);
				} else {
					renderPage();
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
		opt = Object.assign(defaultOptions, options, system);
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

					case 'account':
						switch (page[1]) {
							case 'me':
								wheelEvent.myAccount();
								break;

							default:
								wheelEvent.pageNotFound();
								break;
						}
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
			var id = {
				slideOut: wheelEvent.guid()
			};
			var navBar = $(
				'<nav>'+
					'<div class="nav-wrapper">'+
						'<a href="#" class="brand-logo">Wheel Event</a>'+
						// for better view, hide this block (ctrl+k+7)
						'<ul id="'+id.slideOut+'" class="side-nav">'+
							'<li>'+
								'<h1 class="black-text center-align flow-text">'+
									'<span style="font-size:3em;">'+
										'WheelEvent'+
									'</span>'+
								'</h1>'+
							'</li>'+
							'<li>'+
								'<a href="#concept">'+
									'<i class="material-icons">lightbulb_outline</i>'+
									'Le concept'+
								'</a>'+
							'</li>'+
							'<li>'+
								'<a href="#event/map">'+
									'<i class="material-icons">map</i>'+
									'Carte'+
								'</a>'+
							'</li>'+
							'<li>'+
								'<a href="#event/sub">'+
									'<i class="material-icons">event</i>'+
									'Mes Events'+
								'</a>'+
							'</li>'+
							'<li>'+
								'<a href="#account/me">'+
									'<i class="material-icons">account_circle</i>'+
									'Ma Page'+
								'</a>'+
							'</li>'+
							'<li>'+
								'<a href="#about">'+
									'<i class="material-icons">copyright</i>'+
									'À propos'+
								'</a>'+
							'</li>'+
							'<li>'+
								'<a href="#cgv">'+
									'<i class="material-icons">book</i>'+
									'C.G.V.'+
								'</a>'+
							'</li>'+
						'</ul>'+
						'<a href="#" data-activates="'+id.slideOut+'" class="button-collapse show-on-large"><i class="material-icons">menu</i></a>'+
					'</div>'+
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
			var id = {
				wheel: wheelEvent.guid(),
				sposoredEvent: wheelEvent.guid(),
				lastEvent: wheelEvent.guid()
			};
			var homePage = $(
				'<div class="row flow-text">'+
					'<div class="col s12">'+
						// for better view, hide this block (ctrl+k+7)
						'<div class="component">'+
							'<div class="cn-wrapper opened-nav" id="'+id.wheel+'">'+
								'<ul>'+
									'<li><a href="#concept">'+
										'<span>'+
											'<i class="material-icons">lightbulb_outline</i><br>'+
											'Le concept'+
										'</span>'+
										'</a>'+
									'</li>'+
									'<li><a href="#event/map">'+
										'<span>'+
											'<i class="material-icons">map</i><br>'+
											'Carte'+
										'</span>'+
										'</a>'+
									'</li>'+
									'<li><a href="#event/sub">'+
										'<span>'+
											'<i class="material-icons">event</i><br>'+
											'Mes Events'+
										'</span>'+
										'</a>'+
									'</li>'+
									'<li><a href="#account/me">'+
										'<span>'+
											'Ma Page<br>'+
											'<i class="material-icons">account_circle</i>'+
										'</span>'+
										'</a>'+
									'</li>'+
									'<li><a href="#about">'+
										'<span>'+
											'À propos<br>'+
											'<i class="material-icons">copyright</i>'+
										'</span>'+
										'</a>'+
									'</li>'+
									'<li><a href="#cgv">'+
										'<span>'+
											'C.G.V.<br>'+
											'<i class="material-icons">book</i>'+
										'</span>'+
										'</a>'+
									'</li>'+
								'</ul>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="col s12 l8" id="'+id.lastEvent+'"></div>'+
				'</div>'
			);

			homePage.find('.opened-nav a').click(function() {
				if ($('.opened-nav').hasClass('loading')) {
					$('.opened-nav').removeClass('loading');
				} else {
					$('.opened-nav').addClass('loading');
				}
			});
			homePage.wheelEventInitialize('homePage');

			if (typeof window.app.lastEvent === 'function') {
				window.app.lastEvent().init({
					container: homePage.find('#'+id.lastEvent)
				});
				homePage.trigger('render');
			} else {
				$.getScript('/scripts/assets/lastEvent.js').done(function() {
					window.app.lastEvent().init({
						container: homePage.find('#'+id.lastEvent)
					});
				}).always(function() {
					homePage.trigger('render');
				});
			}
			return;
			// folding
				// ctrl+k+4 for better view
				/**
				 * FUNCTIONS
				 */
				/**
				 * fonction temporaire, il suffit de changer window.location.hash pour changer de page
				 * @param {Boolean} isUserOk true if correctly connected
				 */
				/** */
				/** COMMENT OLD CODE, still usefull
				var goToConnectedPage = function(isUserOk) {
					// @TODO change hash to next page then update

					// trigger leavePage of previous page
					$('main').children().trigger('leavePage', function() {
						// then display newPage
						if (isUserOk) {
							$('main').html(
								'<h2>Bravo</h2>'+
								'<h1>Vous êtes bien connecté</h1>'
							);
						}
						if (!isUserOk) {
							$('main').html(
								'<h2>Erreur</h2>'+
								'<h1>Impossible de manipuler la base de données</h1>'
							);
						}
					});
				};
				var createUserIfDoesntExist = function(socialNetworkUser, callback) {
					window.get().currentUser(function(user) {
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
					'<div class="row flow-text">'+
						'<div class="col s12">'+
							'<h2 class="center-align">WheelEvent</h2>'+
							'<p>'+
								'Description du site<br>'+
								'Eu commodo ad aliquip nostrud irure consectetur mollit et in in ut deserunt deserunt eu deserunt '+
								'exercitation ullamco quis cillum incididunt occaecat aliquip esse eu in ea veniam est non occaecat '+
								'eu consequat consequat in voluptate magna sint esse est voluptate voluptate esse minim tempor labore '+
							'</p>'+
							'<a href="#" id="'+id.btnConnectFB+'">Connexion&nbsp;via&nbsp;FB</a>'+
							'<a href="#" id="'+id.btnConnectG+'">Connexion&nbsp;via&nbsp;Google</a>'+
						'</div>'+
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
				home.find('#'+id.btnConnectFB).click(function() {
					console.log('connection btn');
					var provider = new firebase.auth.FacebookAuthProvider();
					loginWithProvider(provider);
				});
				home.find('#'+id.btnConnectG).click(function() {
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
			/***/
		},
		loginPage(callback=(console.log)) {
			console.info('wheelEvent.loginPage()');
			var checkUserThenRedirect = function(socialNetworkUser) {
				window.get().currentUser(function(user) {
					if (!user) {
						window.push.createUser(socialNetworkUser.displayName, socialNetworkUser.email, socialNetworkUser.photoURL, function(success) {
							if (success) {
								callback();
							} else {
								// @TODO faire une fonction qui affiche "désolé une erreur est survenue, blablabla"
								wheelEvent.pageNotFound();
							}
						});
					}
					if (user) {
						callback(true);
					}
				});
			};
			var loginWithProvider = function(provider) {
				try {
					firebase.auth().signInWithPopup(provider).then(function(result) {
						// @TODO prepare facebook here
						// This gives you a Facebook Access Token. You can use it to access the Facebook API.
						// var token = result.credential.accessToken;

						// The signed-in user info.
						var socialNetworkUser = result.user;
						console.info('logged successfully', socialNetworkUser);
						checkUserThenRedirect(socialNetworkUser);
					}).catch(function(error) {
						// @TODO faire une fonction qui affiche "désolé une erreur est survenue, blablabla"
						console.warn('logged failed', error);
					});
				} catch (e) {
					console.error(e);
				}
			};
			var id = {
				facebookLoginBtn: wheelEvent.guid(),
				googleLoginBtn: wheelEvent.guid()
			};
			var loginPage = $(
				'<div class="row flow-text">'+
					'<div class="col s12">'+
						'<h2 class="center-align">Connexion<br>Inscription</h2>'+
						'<p class="center-align">'+
							'Vous devez vous connecter pour accéder à cette page.<br>'+
							'<i>Une connexion via <span class="blue-text">facebook</span> est nécessaire pour profiter des fonctionnalités de publications synchronisées</i>'+
						'</p>'+
						'<div class="row">'+
							'<div class="col s12 center-align">'+
								'<a class="btn blue white-text waves-effect waves-light" id="'+id.facebookLoginBtn+'">Via Facebook</a>'+
							'</div>'+
						'</div>'+
						'<div class="row">'+
							'<div class="col s12 center-align">'+
								'<a class="btn red white-text waves-effect waves-light" id="'+id.googleLoginBtn+'">Via Google</a>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			loginPage.find('#'+id.facebookLoginBtn).click(function() {
				var provider = new firebase.auth.FacebookAuthProvider();
				loginWithProvider(provider);
			});
			loginPage.find('#'+id.googleLoginBtn).click(function() {
				var provider = new firebase.auth.GoogleAuthProvider();
				loginWithProvider(provider);
			});
			loginPage.wheelEventInitialize('loginPage');
			loginPage.trigger('render');
		},
		myAccount() {
			console.info('wheelEvent.myAccount()');
			var loadMyAccount = function() {
				var myAccount = window.app.myAccount().init();
				myAccount.wheelEventInitialize('myAccount', {
					mustBeConnected: true
				});
				myAccount.trigger('render');
			};

			$.ajax({
				url: '/scripts/page/myAccount.js',
				dataType: 'script',
				cache: !window.isLocalHost
			})
			.done(loadMyAccount)
			.fail(function() {
				// @TODO faire une fonction qui affiche "désolé une erreur est survenue, blablabla"
				wheelEvent.pageNotFound();
			});
		},
		pageNotFound() {
			console.info('wheelEvent.pageNotFound()');
			var pageNotFound = $(
				'<div class="row flow-text">'+
					'<div class="col s12">'+
						'<h2 class="center-align">Erreur 404</h2>'+
						'<p class="center-align">'+
							'Page introuvable ou inexistante'+
						'</p>'+
					'</div>'+
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
		init: wheelEvent.init,
		guid: wheelEvent.guid
	};
})();
