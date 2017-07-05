(function() {
	'use strict';
	var lastEvent = {
		init(options) {
			let defaults = {
				container: false,
				updateOnLoad: true,
				eventToLoad: 10,
				displaySponso: true,
				displayNearOnly: false
			};
			var settings = Object.assign({}, defaults, options);
			var list = lastEvent.component.main();
			if (settings.container) {
				settings.container.append(list);
			}
			if (settings.updateOnLoad) {
				list.trigger('update', [settings]);
			}
			return list;
		},
		component: {
			main: function() {
				var id = {
					main: window.app.guid(),
					list: window.app.guid(),
					action: window.app.guid()
				};
				var block = $(
					'<div class="col s12" id="'+id.main+'">'+
						'<h4>Futur events</h4>'+
						'<div class="row" id="'+id.list+'"></div>'+
						'<div class="row" id="'+id.action+'">'+
							'<div class="col s12 center-align">'+
								'<a class="btn waves-effect waves-default" href="#event/map">Plus ...</a>'+
							'</div>'+
						'</div>'+
					'</div>'
				);
				block.data('id', id);
				block.data('eventList', []);
				block.on('loadNewEvent', function(event, settings) {
					console.log('event = ', event, 'settings = ', settings);
					// @TODO
					//	settings = {
					//		eventToLoad: 10,
					//		displaySponso: true,
					//		displayNearOnly: false
					//	};
					//
					// - get events
					// - filter already in $(this).data('eventList')
					// - create DOM element
					// - add to block.find('#'+id.list)
					//   - must have .trigger('update', [settings])
				});
				block.on('update', function(event, settings) {
					for (var i = $(this).data('eventList').length - 1; i >= 0; i--) {
						let eventId = $(this).data('eventList')[i].id;
						block.find('#'+eventId).trigger('update', [settings]);
					}
					$(this).trigger('loadNewEvent', [settings]);
				});
				return block;
			}
		}
	};
	window.app.lastEvent = function() {
		return lastEvent;
	};
})();
