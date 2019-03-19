// Add year to options

var year = $('#year');
var now = new Date()
var currentYear = now.getFullYear();

for (var i = currentYear; i>=1919; i--){
    var option = "<option>" + i + "</option>";
    $(option).appendTo(year);
}

// Checkbox switching 

$('.form_checkbox').on('click', function() {
        $('.form_checkbox').removeClass('form_checkbox__active');
        $(this).find('.form_checkbox-radio')
               .prop("checked", true)
               .closest('.form_checkbox')
               .toggleClass('form_checkbox__active');
    });

// add inform tooltip to Postal postcode

$('.icon__question').hover(function(){
     $('.tooltip_inform').css('visibility','visible');
     $('.tooltip_inform').text('We don`t use postal postcodes to cantact members directly');
  }, 
  function(){
  $('.tooltip_inform').css('visibility','hidden');
});


// Validation form

var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;
var email = $('#email');
var postcode = $('#postcode');
var password = $('#password');
var submit = $('#submit');

email.blur(function(){
    if(email.val() != ''){
        if(email.val().search(pattern) == 0){
            $(this).next('.tooltip').css('visibility','hidden');
            $('#submit').attr('disabled', false);
            email.removeClass('form_field__error').addClass('ok');
    }else{
        $(this).next('.tooltip').css('visibility','visible');
        $(this).next('.tooltip').text('Please include an @ in the eemail address');
        $('#submit').attr('disabled', true);
        email.addClass('form_field__error');
    }
    }else{
        $(this).next('.tooltip').css('visibility','visible');
        $(this).next('.tooltip').text('This field can not be empty');
        email.addClass('form_field__error');
        $('#submit').attr('disabled', true);
    }
});

postcode.blur(function(){
    if(postcode.val() != ''){
        $(this).next('.tooltip').css('visibility','hidden');
        $('#submit').attr('disabled', false);
        postcode.removeClass('form_field__error').addClass('ok');
    }else{
        $(this).next('.tooltip').css('visibility','visible');
        $(this).next('.tooltip').text('This field can not be empty');
        postcode.addClass('form_field__error');
        $('#submit').attr('disabled', true);
    }
});

password.blur(function(){
    if(password.val() != ''){
        $(this).next('.tooltip').css('visibility','hidden');
        $('#submit').attr('disabled', false);
        password.removeClass('form_field__error').addClass('ok');
    }else{
        $(this).next('.tooltip').css('visibility','visible');
        $(this).next('.tooltip').text('This field can not be empty');
        password.addClass('form_field__error');
        $('#submit').attr('disabled', true);
    }
});

year.change(function(){
var age = $("#year option:selected").text();
    if(currentYear - +age > 17) {
        $(this).next('.tooltip').css('visibility','hidden');
        $(this).next('#submit').attr('disabled', false);
        year.removeClass('form_field__error').addClass('ok');
    } else {
        $(this).next('.tooltip').css('visibility','visible');
        $(this).next('.tooltip').text('You must be at least 18 year old');
        year.addClass('form_field__error');
        $('#submit').attr('disabled', true);
}
});

 
var yearSelected = $("#year option:selected").text();
submit.click(function() {
if ($('.form')[0].checkValidity()){
    console.log("Form is valid")
} else {
    if (email.val() == "") {
        $('.tooltip').css('visibility','visible');
        $('.tooltip').text('This field can not be empty');
    }
    if (password.val() == "") {
        $('.tooltip').css('visibility','visible');
        $('.tooltip').text('This field can not be empty');
    }
    if (postcode.val() == "") {
        $('.tooltip').css('visibility','visible');
        $('.tooltip').text('This field can not be empty');
    }
    if (yearToday - +yearSelected < 19) {
        $('.tooltip').css('visibility','visible');
        $('.tooltip').text('You must be at least 18 year old');
    }
}
});

