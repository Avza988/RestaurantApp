//newsletter handling 
const form = document.querySelector('form');
const emailInput = document.querySelector('#email');

form.addEventListener('submit', function(event){
    event.preventDefault();

    const emailValue = emailInput.value.trim();

    if (!isValidEmail(emailValue)){
        alert('Please eneter a valid email address');
        emailInput.focus();
    }else{
        form.submit();
    }
});

function isValidEmail(email){
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}