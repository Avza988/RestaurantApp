function openModal(){
    document.getElementById("myModal").style.display ="block";
}

function closeModal(){
    document.getElementById("myModal").style.display ="none";
}

$(document).ready(function(){
    $("#newsletter-form").submit(function(event) {
        event.preventDefault();

        var email = $("#email").val().trim();
        var newsletter = $("#checkbox").is(":checked");

        if(!isValidEmail(email)){
            showMessage("Please enter a valid email address." ,"error");
            return;
        }

        function isValidEmail(email){
            var emailRegex = /\S+@\S+\.\S+/;
            return emailRegex.test(email);
        }

        $.ajax({
            url: '/submit-form.js',
            type: 'POST',
            data:{
                email: email,
                newsletter: newsletter
            },

            success: function(success){
                showMessage("Thank you for subscribing!" ,"success");
                $("#newsletter-form")[0].reset();
            },

            error: function(error){
                showMessage("An error occurrred . Please try again later." ,"error");
                console.log(error.responseText);
            }
        });
    });

    function showMessage(message, type){
        var messageContainer = $("#message-container");
        messageContainer.text(message);

        messageContainer.removeClass().addClass(type);

        setTimeout(function(){
            window.location.reload();
        }, 50000);
    }
});