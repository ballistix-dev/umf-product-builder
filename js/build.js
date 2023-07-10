var BUILD;

var SERIES;

var MODELS;

var PLUGIN_VERSION = '1.6.5';

var PLUGIN_URL = window.location.origin + '/wp-content/plugins/umf-product-builder';

(function($) {

  $.getJSON( PLUGIN_URL + "/data/models.json?ver="+ PLUGIN_VERSION, function(data) {

    MODELS = data;


  });

  $.getJSON( PLUGIN_URL + "/data/series.json?ver="+ PLUGIN_VERSION, function(data) {

    SERIES = data;

    $.getJSON( PLUGIN_URL + "/data/build.json?ver="+ PLUGIN_VERSION, function(data) {

      BUILD = data;

      // init

      var current_page = 0;

      load_question(current_page);

    });

  });

  $('#questions').on('change', 'input[type="radio"]', function(event) {

    event.preventDefault()

    var target = $(this).val();

    $(this).closest(".question").nextAll().remove();

    if ($(this).hasClass('result')) {

      $("#result").show();

      $('#result').addClass('loading');

      setTimeout(function() {

        load_result(target);

        $('#result').removeClass('loading');

      }, 1000)

    } else {

      load_question(target);

    };

  });

  function load_question(id) {

    $("#result").hide();

    var page_data = BUILD[id];

    var html = '';

    html += '<li class="question">';

    html += '<span>' + page_data.text + '</span>';

    if (page_data.tooltip) {

      html += '&nbsp;<div class="tooltip"><i class="fa fa-question-circle"></i><span class="tooltiptext">' + page_data.tooltip + '</span></div>';

    }

    html += '<ul class="choices">';

    for (var choice in page_data.choices) {

      var choice_data = page_data.choices[choice];

      html += '<li><label for="radio_' + choice_data.target + '"><input type="radio" class="' + choice_data.type + '" id="radio_' + choice_data.target + '" name="radio-group-' + id + '" value="' + choice_data.target + '">' + choice_data.text + '</label></li>';

    }

    html += '</ul>';

    html += '</li>';

    $("#questions").append(html);

  }

  function load_result(query) {

    const target_arr = query.split(',');

    var regex = new RegExp("(<=\\s|\\b)" + target_arr[0] + "(?=[]\\b|\\s|$)");

    const series = SERIES.find(item => item.series.search(regex) !== -1);

    $('#result .content').empty();

    $('#result .content').append(
      '<div class="wrap">'
      + '<h4>' + series["name"] + '</h4>'
      + series["description"]
      + '<a class="product_url" target="_blank" href="' + series["url"] + '">Learn more</a>'
      + '</div>'
    );

    if (series["variant"]) {

      $('#result .augmented-reality').show();

      if (series["variant"][0]) {
        $('bitreel-model-viewer').attr('modelname', series["variant"][0][0]);
      };

      var slide = document.querySelector("bitreel-model-viewer").shadowRoot.querySelector(".slides")

      $(slide).empty();

      $.each(series["variant"], function(index, value) {

        str = value[1].replace(/\s+/g, '-').toLowerCase();

        $(slide).append('<button class="slide selected" onclick="switchSrc(this, &apos;' + value[0] + '&apos;)" style="background-image: url(' + PLUGIN_URL + '/img/swatch/swatch_' + str + '.png); background-position: center 10px; background-color: transparent; border-radius: 0; border: none !important; justify-content: center;"><span class="text-wrap" style="display: block; align-self: flex-end; height: 35px;"><span class="color-option">' + value[1] + '</span></span></button>');

      });

    } else {

      $('#result .augmented-reality').hide();

    }

    $('#result .series').html('<h3>Models in the series</h3>');

      $.each(target_arr, function(index, value) {
        
        console.log( value );

        var regex = new RegExp("(<=\\s|\\b)" + value + "(?=[]\\b|\\s|$)");

        const models = MODELS.filter(item => item.series.search(regex) !== -1);

        console.log(models);

          $.each(models, function(lead, point) {

            $('#result .series').append('<div class="entry ' + point["id"] + '">' +
              '<img src="' + point["image"] + '">' +
              '<h5>' + point["name"] + '</h5>' +
              '<a class="product_information" target="_blank" href="' + point["product_information"] + '">Download product information</a><br><br>' +
              '<ul></ul></div>'
            );

            if (point["additional"]) {
              $('#result .series .' + point["id"] + ' ul').append('<h6>Additional Features</h6>');
            
            $.each(point["additional"], function(x, y) {

              $('#result .series .' + point["id"] + ' ul').append('<li><strong>' + y + '</strong></li>');

            });

            }
            
            $('#result .series .' + point["id"] + ' ul').append('<h6>Standard Features</h6>');

            $.each(point["features"], function(a, b) {

              $('#result .series .' + point["id"] + ' ul').append('<li>' + b + '</li>');

            });



          });

      })

  }

})(jQuery);
