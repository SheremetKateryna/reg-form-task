// Add year to options

var $year = $('#year');
var now = new Date()
var currentYear = now.getFullYear();

for (var i = currentYear; i>=1919; i--){
    var option = "<option>" + i + "</option>";
    $(option).appendTo($year);
}

// Checkbox switching 

$('.form_checkbox').on('click', function() {
        $('.form_checkbox').removeClass('form_checkbox__active');
        $(this).find('.form_checkbox-radio')
               .prop("checked", true)
               .closest('.form_checkbox')
               .toggleClass('form_checkbox__active');
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

var messageInfo='We don`t use postal postcodes to contact members directly';
var messageEmpty='This field can not be empty';
var messageYear='You must be at least 18 year old';
var messageEmail='Please include an @ in the email address';

// Hover effect on Postal postcode informative tooltip

var $question = $('.icon__question');

$question.hover(function(){
    showLabel($question, messageInfo);
  }, 
    function(){
        hideLabel($question);
});

// Validation on empty text field when loses focus

var $postcode = $('#postcode');
var $password = $('#password');

function emptyValidation (el) {
    el.blur(function(){
    let $input=$(this);
    if ($input.val() != ''){
        hideLabel(el);
    } else {
        showLabel(el, messageEmpty);
    }
});
}

emptyValidation($postcode);
emptyValidation($password);

// Validation year

$year.change(function(){
    var age = $("#year option:selected").text();
    if (currentYear - +age > 17) {
        hideLabel($year);
    } else {
        showLabel($year, messageYear);
    }
});

// Validation email

var $email = $('#email');

$email.blur(function(){
    let $input=$(this);
    var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if ($input.val() == '') {
            showLabel($email, messageEmpty);
        } else if (pattern.test($input.val())) {
            hideLabel($email);
        } else {
            showLabel($email, messageEmail);
       }
});

// After Form Submitted Validation

var $form = $('#form');

$form.on('click', '#submit', function(e) {
    if ($form[0].checkValidity()){
        console.log('Form is valid');
    } else {
         e.preventDefault();
         var age = $("#year option:selected").text();
            if (currentYear - +age <= 17) {
            showLabel($year, messageYear);
            }
            if ($email.val() == '') {
                showLabel($email, messageEmpty);
            }
            if ($password.val() == '') {
                showLabel($password, messageEmpty);
            }
            if ($postcode.val() == '') {
                showLabel($postcode, messageEmpty);
            }
    }
});
