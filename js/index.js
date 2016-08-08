function extractEmails (text) {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

function getEmailsFromText(text) {
    var emails = extractEmails(text),
        emailList = [];
    $.each(emails, function(index, email){
        emailList.push(email.trim().toLowerCase());
    });

    return emailList.join(",");
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