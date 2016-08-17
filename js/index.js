var invalidemails = "info@jubeljahr2000.de,office@kath.jungschar.atder,info@jubeljahr2000.de";
function extractEmails (text) {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

function getEmailsFromText(text) {
    var emails = extractEmails(text),
        emailList = [];
    $.each(emails, function(index, email){
        if(invalidemails.indexOf(email) === -1) {
            validateEmails(email);
            emailList.push(email.trim().toLowerCase());
        }
    });

    return emailList.join("\n");
}

function validateEmails(email) {
    //pubkey-
    var countFalse = 0;
    $.ajax({
        type: "GET",
        url: 'https://api.mailgun.net/v2/address/validate?callback=?',
        data: { 
            address: email, 
            api_key: 'pubkey-63824d07bccc68fce2564ac14ace9b93' 
        },
        async: false,
        dataType: "jsonp",
        crossDomain: true,
        success: function(data, status_text) {
            //clearTimeout(timeoutID);

            //element.mailgunLastSuccessReturn = data;
            //if (options && options.success) {
                //options.success(data, options.e);
            //}
            if(!data.is_valid) {
                countFalse++;
                console.log(data.address);
            }
        },
        error: function(request, status_text, error) {
            /*clearTimeout(timeoutID);
            error_message = 'Error occurred, unable to validate address.';

            if (options && options.error) {
                options.error(error_message, options.e);
            }
            else {
                if (console) console.log(error_message);
            }*/
            console.log(error_message);
        }
    });
}

$(function () {
    $("#getemails").click(function() {
        $("#emails").val(getEmailsFromText($("#textemails").val()));
    });

    var clipboard = new Clipboard("#copy");
    clipboard.on('success', function(e) {
        e.clearSelection();
    });
});