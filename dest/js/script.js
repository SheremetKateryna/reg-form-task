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

// Hover effect on Postal postcode informative tooltip

var question = $('.icon__question');

question.hover(function(){
    question.next('.tooltip_inform')
             .css('visibility','visible')
             .animate(
                {
                  opacity: 1.0
                },
                1500
    );;
    $('.tooltip_inform').text('We don`t use postal postcodes to cantact members directly');
  }, 
    function(){
        question.next('.tooltip_inform').animate(
            {
              opacity: 0
            },
            1000
        );;
});

// Function to show tooltip 

function showLabel(el, message) {
    el.addClass('form_field__error')
      .next('.tooltip').css('visibility','visible').animate(
    {
      opacity: 1.0
    },
    2500
  );
    el.next('.tooltip').text(message);
}

// Function to hide tooltip

function hideLabel(el) {
    el.next('.tooltip').animate(
    {
      opacity: 0
    },
    1000
  );
  el.removeClass('form_field__error');
}

// Error messages

let message='This field can not be empty';
let messageYear='You must be at least 18 year old';
let messageEmail='Please include an @ in the email address';

// Validation form

year.change(function(){
var age = $("#year option:selected").text();
    if (currentYear - +age > 17) {
        hideLabel(year);
    } else {
        showLabel(year, messageYear);
    }
});

var email = $('#email');
var postcode = $('#postcode');
var password = $('#password');
var submit = $('#submit');

email.blur(function(){
    var input=$(this);
    var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.val() == '') {
        showLabel(email, message);
    } else if (pattern.test(input.val())) {
        hideLabel(email);
    } else {
        showLabel(email, messageEmail);
    }
});

postcode.blur(function(){
    var input=$(this);
    if (input.val() != ''){
        hideLabel(postcode);
    } else {
        showLabel(postcode, message);
    }
});

password.blur(function(){
    var input=$(this);
    if(input.val() != ''){
        password.next('.tooltip').css('visibility','hidden');
        password.removeClass('form_field__error');
    } else {
        showLabel(password, message);
    }
});

// After Form Submitted Validation

var form = $('#form');

form.on('click', '#submit', function(e) {
    if (form[0].checkValidity()){
        console.log('Form is valid');
    } else {
         e.preventDefault();
            if (currentYear - +$('#year option:selected').text() <= 17) {
            showLabel(year, messageYear);
            }
            if (email.val() == '') {
                showLabel(email, message);
            }
            if (password.val() == '') {
                showLabel(password, message);
            }
            if (postcode.val() == '') {
                showLabel(postcode, message);
            }
    }
});