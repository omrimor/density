$(function(){
	'use strict';

	/**
	 * Handle the convertor
	 */

	// Define Arrays for Android & iOS
	var buckets = [
	    { name:'LDPI', id:'ldpi', density:0.75 },
	    { name:'MDPI / Base', id : 'base', density:1 },
	    { name:'HDPI', id:'hdpi', density:1.5 },
	    { name:'XHDPI / Retina', id:'retina', density:2 },
	    { name:'XXHDPI', id:'xxhdpi', density:3 },
	    { name:'XXXHDPI', id:'xxxhdpi', density:4 }
	];

	var converterCalculator = function(bucketsObj, bucketsContainer){
			$(bucketsObj).each(function(i) {
				var bucket = $('<ul>').addClass('bucket bucket-'+bucketsObj[i].id),
					bucketName = $('<li>').addClass('name'),
					bucketWidth = $('<li>').addClass('width'),
					bucketWidthInput = $('<input>',{type: 'text', pattern: '[0-9]*', id:'bucketWidth_' + i,
										name:'width[]', value:'0', autocomplete : 'off', maxlength: 5}),
					bucketWidthLabel = $('<label>').attr('for', 'bucketWidth_'+i).html('0');

				bucketName.appendTo(bucket).html(bucketsObj[i].name +
					'  <span>' + 'x' + bucketsObj[i].density + '</span>');
				bucketWidth.appendTo(bucket);
				bucketWidthInput.appendTo(bucketWidth);
				bucketWidthLabel.appendTo(bucketWidth);

				// Disable all inputs but numbers
				bucketWidthInput.on('keydown', function(e) {
					if((e.keyCode !== 8) && (e.keyCode !== 9) && !( e.keyCode >= 48 &&
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
							}
							// Change to label according to input value
							$('label[for=\'' + $(this).attr('id') + '\']')
							.html(Math.ceil(base * bucketsObj[a].density));
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

	converterCalculator(buckets, '.buckets');
});


