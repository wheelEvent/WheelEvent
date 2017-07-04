(function() {
	'use strict';
	var myAccount = {
		init(options) {
			let defaults = {
				container: false,
				updateOnLoad: true
			};
			var settings = Object.assign({}, defaults, options);
			var page = myAccount.component.main();
			if (settings.container) {
				settings.container.append(page);
			}
			if (settings.updateOnLoad) {
				page.trigger('update', [settings]);
			}
			return page;
		},
		component: {
			main: function() {
				var id = {
					main: window.app.guid()
				};
				var block = $(
					'<div class="row flow-text" id="'+id.main+'">'+
						'<div class="col s12">'+
							'<h2 class="center-align">Mon compte</h2>'+
							'<p class="center-align">'+
								'<div class="preloader-wrapper big active">'+
									'<div class="spinner-layer spinner-blue-only">'+
										'<div class="circle-clipper left">'+
											'<div class="circle"></div>'+
										'</div><div class="gap-patch">'+
											'<div class="circle"></div>'+
										'</div><div class="circle-clipper right">'+
											'<div class="circle"></div>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</p>'+
						'</div>'+
					'</div>'
				);
				block.data('id', id);
				block.on('update', function(event, settings) {
					// @TODO
					window.get().currentUser(function(response){
						var preloader = block.find('.preloader-wrapper');
						$('<p>currentUser = '+JSON.stringify(response)+'</p>').insertAfter(preloader);
						preloader.remove();
					});
				});
				return block;
			}
		}
	};
	window.app.myAccount = function() {
		return myAccount;
	};
})();
