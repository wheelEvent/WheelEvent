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
		},
		/**
		 * Permet de créer un événement
		 * @param  {string}   _creator userId provided by wheelEventGet.currentUserId
		 * @param  {number}   _latitude  latitude from https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_geolocation
		 * @param  {number}   _longitude longitude from https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_geolocation
		 * @param  {Date}     _from    object Date javascript at the beginnning of the event
		 * @param  {Date}     _to      object Date javascript at the end of the event
		 * @param  {Array}    _what    ['Rassemblement indépendant', 'Rassemblement de Club', 'Jour de course', 'Week-end de course']
		 * @param  {Array}    _public  ['Tous publics', '4 ans et +', '8 ans et +', '12 ans et +', '16 ans et +', 'Adultes', 'Enfants', 'Séniors', 'Masculin', 'Féminin']
		 * @param  {object}   _price   object provided by wheelEventPush.buildPrice
		 * @param  {string}   _desc    event's description, \n line-break
		 * @param  {string}   _name    event's name, no line-break
		 * @param  {Function} callback called when done, with object's event or false if can't create event
		 */
		createEvent(_creator, _latitude, _longitude, _from, _to, _what, _public, _price, _desc, _name, callback) {
			// @TODO
		},
		/**
		 * return an object with method addPriceTag, editPriceTag, deletePriceTag
		 * @return {object} object for wheelEventPush.createEvent
		 */
		buildPrice() {
			/**
			 * usage :
			 * var p = buildPrice();
			 * p.addPriceTag('all', 4.00);
			 * console.log(p.getPriceTag());
			 * p.editPriceTag('all', 6.00);
			 * p.deletePriceTag('all');
			 */
			function Builder() {
				this.data = {};
				this.checkDef = function(def) {
					if (def.constructor !== String) {
						warn('buildPrice : def must be String');
						return false;
					}
					if (def.length <= 0) {
						warn('buildPrice : def can\'t be empty');
						return false;
					}
					return def;
				};
				this.checkPrice = function(price) {
					price = parseFloat(price);
					if (isNaN(price)) {
						warn('buildPrice : price must be float');
						return false;
					}
					if (price < 0) {
						warn('buildPrice : price must be >= 0.00');
						return false;
					}
					return price.toFixed(2);
				};
				this.addPriceTag = function(def, price) {
					def = this.checkDef(def);
					price = this.checkPrice(price);
					if (def === false || price === false) {
						warn('buildPrice : can\'t add price');
						return false;
					}
					this.data[def] = price;
					return true;
				};
				this.editPriceTag = function(def, price) {
					def = this.checkDef(def);
					price = this.checkPrice(price);
					if (def === false || price === false) {
						return false;
					}
					if (typeof this.data[def] === 'undefined') {
						warn('buildPrice : def not found');
						return false;
					}
					this.data[def] = price;
					return true;
				};
				this.deletePriceTag = function(def) {
					def = this.checkDef(def);
					if (def === false) {
						return false;
					}
					if (typeof this.data[def] === 'undefined') {
						warn('buildPrice : def not found');
						return false;
					}
					this.data[def] = false;
					return true;
				};
				this.getPriceTag = function() {
					return this.data;
				};
			}
			return new Builder();
		}
	};
	window.push = wheelEventPush;
})();
