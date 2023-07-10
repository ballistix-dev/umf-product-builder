(function($) {

  var DATA_COMPARE,
    DATA_MODELS,
    DATA_SERIES,
    PLUGIN_VERSION = '1.6.5',
    PLUGIN_URL = window.location.origin + '/wp-content/plugins/umf-product-builder';

  $.getJSON( PLUGIN_URL + "/data/series.json?ver="+ PLUGIN_VERSION, function(data) {
    DATA_SERIES = data;
  });

  $.getJSON( PLUGIN_URL + "/data/models.json?ver="+ PLUGIN_VERSION, function(data) {
    DATA_MODELS = data;
  });

  $.getJSON( PLUGIN_URL + "/data/compare.json?ver=" + PLUGIN_VERSION , function(data) {

    var temp = "";

    DATA_COMPARE = data;

    array_brand = data.reduce(function (r, a) {
      r[a.brand] = r[a.brand] || [];
      r[a.brand].push(a);
      return r;
    }, Object.create(null));

    temp += '<h5><small>Step 1</small>Select current brand:</h5>';

    temp += '<ul class="accordion-tabs">';

    $.each(array_brand, function(index, value) {

      temp += '<li class="tab-header-and-content">';

      temp += '<a href="javascript:void(0)" class="tab-link">' + index + '</a>';

      temp += '<div class="tab-content">';

      temp += '<h5><small>Step 2</small>Select your current model:</h5>';

      temp += '<ul class="models-list">';

        $.each(value, function(x, y) {
          
          temp += '<li><a href="#" data-model_number="'+ y['model_number'] +'" data-comparable_models="'+ y['comparable_models'] + '"';

          if (y['option_model'] !== undefined) temp += ' data-option_model="'+ y['option_model'] + '"';
          
          temp += '>';

          if(y['brand']) temp += y['brand'];
          if(y['model_number']) temp += ' ' + y['model_number'];
          if(y['name']) temp += ' ' + y['name'];
          
          temp += '</a></li>';
          
        });

        temp += '</ul>';

      temp += '</div>';

      temp += '</li>';

    });

    temp += '</ul>';

    $('#comparable').html( temp );

    $("#comparable .accordion-tabs").children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();

  });

  function getBaseUrl() {
    var getUrl = window.location;
    return getUrl.protocol + "//" + getUrl.host + getUrl.pathname.split('/')[1];
  }

  function get_result( value, option_model ) {

  
    $('#result').addClass('loading');
    $('#result .data').hide();
    $('#result .image').hide();
    $('#result .augmented-reality').hide();

    let temp = '';

    var comparable_models = value.split(/[ ,]+/) ;

    const result = DATA_MODELS.find(item => item.model_number.search( comparable_models[0] ) !== -1);
    const series = DATA_SERIES.find(item => item.series.search( result['series'] ) !== -1);

    setTimeout(function() {

      temp += '<h4 class="title">' + result["name"] + '</h4>';
      
      if (result ["additional"]) {
        temp += '<h5>Additional Features</h5>';
        temp += '<ul class="features">';
        $.each( result ["additional"], function(index, value) {
          temp += '<li><strong>' + value + '</strong></li>';
        });
        temp += '</ul>';

      }
      
      temp += '<h5>Standard Features</h5>';
      temp += '<ul class="features">';
      $.each( result ["features"], function(index, value) {
        temp += '<li>' + value + '</li>';
      });
      temp += '</ul>';

      temp += '<a class="product_information" target="_blank" href="'+result ["product_information"]+'">Download product information</a>';


      if ( comparable_models.length > 1 ) {

        temp += '<h5>Other Comparable Models</h5>';
        temp += '<ul class="other_comparable_models">';

        for (let index = 1; index < comparable_models.length; index++) {

          const compare = DATA_COMPARE.find(item => item.model_number.search( comparable_models[index]  ) !== -1);

          temp += '<li><a href="#" data-model_number="'+ compare['model_number'] +'" data-comparable_models="'+ compare['comparable_models'] +'" data-option_model="'+ compare['option_model'] +'">';

          if(compare['brand']) temp += compare['brand'];
          if(compare['model_number']) temp += ' ' + compare['model_number'];
          if(compare['name']) temp += ' ' + compare['name'];
          temp += '</a></li>';
        }
        temp += '</ul>';
      }

      

      // if (option_model !== undefined) {

      //   console.log( option_model );
        
      //   const opt_model = DATA_COMPARE.find(item => item.model_number.search( option_model ) !== -1);

      //   temp += '<h5>You may want to consider</h5>';

      //   temp += '<li><a href="#" data-model_number="'+ opt_model['model_number'] +'" data-comparable_models="'+ opt_model['comparable_models'] +'">';
        
      //   if(opt_model['brand']) temp += opt_model['brand'];
      //     if(opt_model['model_number']) temp += ' ' + opt_model['model_number'];
      //     if(opt_model['name']) temp += ' ' + opt_model['name'];
      //     temp += '</a></li>';
      
      //     temp += '</ul>';
      // }


      $('#result .data').html(temp).show();
      if (series["variant"].length === 0) {
        $('#result .image').show();
        $('#result .image').html( '<img src="' + result["image"] + '">');
      } else {
        $('#result .augmented-reality').show();
        $('bitreel-model-viewer').attr('modelname', series["variant"][0][0]);
        var slide = document.querySelector("bitreel-model-viewer").shadowRoot.querySelector(".slides")
        $(slide).empty();
        $.each(series["variant"], function(index, value) {
          str = value[1].replace(/\s+/g, '-').toLowerCase();
          $(slide).append('<button class="slide selected" onclick="switchSrc(this, &apos;' + value[0] + '&apos;)" style="background-image: url(' + PLUGIN_URL + '/img/swatch/swatch_' + str + '.png); background-position: center 10px; background-color: transparent; border-radius: 0; border: none !important; justify-content: center;"><span class="text-wrap" style="display: block; align-self: flex-end; height: 35px;"><span class="color-option">' + value[1] + '</span></span></button>');
        });
      }
      $('#result').removeClass('loading');
    }, 1000)

  }

  $('body').on('click', '.models-list a', function( event ) {
    event.preventDefault();
    $('.models-list').find('.selected').removeClass('selected');
    $(this).addClass('selected');
    get_result( $(this).attr('data-comparable_models'), $(this).attr('data-option_model') );
  });

  $('body').on('click', '.accordion-tabs .tab-link', function(event) {
    event.preventDefault();
    $('#result .data').hide();
    $('#result .image').hide();
    $('#result .augmented-reality').hide();
  });

  $('body').on('click', '.other_comparable_models a', function(event) {

    console.log( $(this).attr('data-comparable_models') );

    event.preventDefault();
    $('.models-list').find('.selected').removeClass('selected');
    get_result( $(this).attr('data-comparable_models'),  $(this).attr('data-option_model') );
  });

})(jQuery);
