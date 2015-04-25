/**
 *
 */

/**
 *
 */
Controls = function(elements, eventHandler) {
  var root = this;

  root.elements = elements;
  root.eventHandler = $(eventHandler);

  root.weekTimeSelectionColors = {
    'inactive': '#fff',
    'active': '#ddd',
  };

  root.sliders = {
    'snow': $(root.elements.snow_slider),
    'rain': $(root.elements.rain_slider)
  };

  root.sliderWidgets = {
    'snow': null,
    'rain': null
  };

};

/**
 *
 */
Controls.prototype.init = function() {
  var root = this;

  $(root.elements.week_selection + ' button').on('click', function(e) {
    root.weekTimeChange($(e.target));
  });

  // Initialize the snow amount slider.
  root.sliders.snow.slider({
    id: 'snow-slider-widget',
    handle: 'custom',
    ticks: [-1, 0, 1, 2, 3, 4, 5],
    ticks_labels: ['None', 'Trace', '0-2 in.', '2-4 in.', '4-8 in.', '8-15 in.', '15+ in.'],
    ticks_snap_bounds: 1,
    tooltip: 'hide',
    value: -1
  });
  root.sliderWidgets.snow = $('#snow-slider-widget');
  root.sliderWidgets.snow.find('.slider-handle.custom').addClass('active');

  // Initialize the snow amount slider.
  root.sliders.rain.slider({
    id: 'rain-slider-widget',
    handle: 'custom',
    ticks: [-1, 0, 1, 2, 3, 4, 5],
    ticks_labels: ['None', 'Trace', '0-2 in.', '2-4 in.', '4-8 in.', '8-15 in.', '15+ in.'],
    ticks_snap_bounds: 1,
    tooltip: 'hide',
    value: -1
  });
  root.sliderWidgets.rain = $('#rain-slider-widget');
  root.sliderWidgets.rain.find('.slider-handle.custom').addClass('active');

  root.sliders.snow.on("slideStop", function(e) {
    root.snowChange(e.value);
  });

  root.sliders.rain.on("slideStop", function(e) {
    root.rainChange(e.value);
  });
};

/**
 *
 */
Controls.prototype.weekTimeChange = function(target) {
  var root = this;

  // Set all buttons to default color
  $(root.elements.week_selection + ' button').css('background-color', root.weekTimeSelectionColors.inactive);

  // Set the selected background color for this button.
  target.css('background-color', root.weekTimeSelectionColors.active);

  // Trigger weektime change.
  root.eventHandler.trigger("weekTimeChange", [target.data('value')]);
}

/**
 *
 */
Controls.prototype.snowChange = function(value) {
  var root = this;

  //console.log(root.sliders.rain.find('.slider-handle.custom'));
  //root.sliderWidgets.rain.find('.slider-handle.custom').css('background-color', '#000');
  //root.sliderWidgets.rain.find('.slider-handle.custom').css('content', '');


  if (value != -1) {
    // Disable the snow slider.
    root.sliders.rain.slider("disable");
    root.sliderWidgets.rain.find('.slider-handle.custom').removeClass('active');
    root.sliderWidgets.rain.find('.slider-handle.custom').addClass('inactive');
  }
  else {
    root.sliders.rain.slider("enable");
    root.sliderWidgets.rain.find('.slider-handle.custom').removeClass('inactive');
    root.sliderWidgets.rain.find('.slider-handle.custom').addClass('active');
  }

  root.eventHandler.trigger("weatherAmountChange", ['snow', value]);
}

/**
 *
 */
Controls.prototype.rainChange = function(value) {
  var root = this;

  if (value != -1) {
    // Disable the snow slider.
    root.sliders.snow.slider("disable");
    root.sliderWidgets.snow.find('.slider-handle.custom').removeClass('active');
    root.sliderWidgets.snow.find('.slider-handle.custom').addClass('inactive');
  }
  else {
    root.sliders.snow.slider("enable");
    root.sliderWidgets.snow.find('.slider-handle.custom').removeClass('inactive');
    root.sliderWidgets.snow.find('.slider-handle.custom').addClass('active');
  }

  root.eventHandler.trigger("weatherAmountChange", ['rain', value]);
}
