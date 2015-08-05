$(function(){
	'use strict';

	$('#android').addClass('selected');
	$('.androidLogo').attr('src', 'images/botSelected.svg');
	$('.detector').attr('data-name', 'android');

	/**
	 * Handle the convertor
	 */

	// Define Arrays for Android & iOS
	var bucketsAndroid = [
	    { name:'LDPI', id:'ldpi', density:0.75 },
	    { name:'Base / MDPI', id : 'base', density:1 },
	    { name:'HDPI', id:'hdpi', density:1.5 },
	    { name:'Retina / XHDPI', id:'retina', density:2 },
	    { name:'XXHDPI', id:'xxhdpi', density:3 },
	    { name:'XXXHDPI', id:'xxxhdpi', density:4 }
	];

	var bucketsiOS = [
	    { name:'Base-1x', id:'1', density: 1 },
	    { name:'Retina-2x', id: '2', density: 2 },
	    { name:'Retina-3x', id:'3', density: 3 }
	];

	var converterCalculator = function(bucketsObj, bucketsContainer){
			$(bucketsObj).each(function(i) {
				var bucket = $('<ul>').addClass('bucket bucket-'+bucketsObj[i].id),
					bucketName = $('<li>').addClass('name'),
					bucketWidth = $('<li>').addClass('width'),
					bucketWidthInput = $('<input>',{type: 'text', pattern: '[0-9]*', id:'bucketWidth_' + i,
										name:'width[]', value:'0', autocomplete : 'off', maxlength: 5}),
					bucketWidthLabel = $('<label>').attr('for', 'bucketWidth_'+i).html('0');

				bucketName.appendTo(bucket).html(bucketsObj[i].name + ' <span>' + bucketsObj[i].density + 'x</span>');
				bucketWidth.appendTo(bucket);
				bucketWidthInput.appendTo(bucketWidth);
				bucketWidthLabel.appendTo(bucketWidth);

				// Disable all inputs but numbers
				bucketWidthInput.on('keydown', function(e) {
					if((e.keyCode !== 8)&& (e.keyCode !== 9) && !( e.keyCode >= 48 &&
						e.keyCode <= 57 ) && !( e.keyCode >= 96 && e.keyCode <= 105 )){
							e.preventDefault();
					}
				});

				bucketWidthInput.on('keyup', function(e) {
					var input = $(this),
						base = input.val().replace(/[A-Za-z$-]/g, '') / bucketsObj[i].density;

					if((e.keyCode === 8) || (e.keyCode === 9) || ( e.keyCode >= 48 && e.keyCode <= 57 ) ||
		   			   (e.keyCode >= 96 && e.keyCode <= 105 )){
							$('input[name=\'width[]\']').each(function(a){

							// Perform calc to all but currently selected input fiels
							if(i !== a){
								$(this).val(Math.ceil(base * bucketsObj[a].density));

								// Change to label according to input value
								$('label[for=\'' + $(this).attr('id') + '\']')
								.html(Math.ceil(base * bucketsObj[a].density));
							}
						});
					} else {
						e.preventDefault();
					}
				});
				$(bucketsContainer).append(bucket);

				// Select the input when clicked
				bucketWidthInput.on('click', function() {
					$(this).select();
				});

				// Give foucs to the base size
				if(bucketsObj[i].id === 'base'){
					bucketWidthInput.focus();
				}
			});
	};

	/**
	 * Handle toggeling the views
	 */

	var toggleView = function(e){
		e.preventDefault();

		if($(this).attr('id') === 'ios'){
			$('.flipper').addClass('rotate');
			$('#android').removeClass('selected');
			$('#ios').addClass('selected');
			$('.appleLogo').attr('src', 'images/appleSelected.svg');
			$('.androidLogo').attr('src', 'images/bot.svg');
			$('.detector').attr('data-name', 'ios');

			$('.buckets-ios label').each(function(index, elm) {
				$(this).text('0');
			});
		}
		if($(this).attr('id') === 'android'){
			$('.flipper').removeClass('rotate');
			$('#ios').removeClass('selected');
			$('#android').addClass('selected');
			$('.appleLogo').attr('src', 'images/apple.svg');
			$('.androidLogo').attr('src', 'images/botSelected.svg');
			$('.detector').attr('data-name', 'android');

			$('.buckets-android label').each(function(index, elm) {
				$(this).text('0');
			});
		}
	};

	converterCalculator(bucketsAndroid, '.buckets-android');
	converterCalculator(bucketsiOS, '.buckets-ios');

	$('[data-link="flipBtn"]').on('click', toggleView);
});


