(function(window) { // IIFE pour le module de T'Chat
    
    function resizeTchat () {
        var wh = $(window).height();
        var ih = $("#message").outerHeight();
        
        $("#tchat > ol").height(wh - ih - 20);
    }
    
    var theToken = null; // Le token pour discuter sur le tchat
    var urlBase  = 'http://localhost/formation/dev9/tp1-tchat/backend/';
    
    window.tchat = {
        init: function () {
            resizeTchat(); // Redim du tchat en fonction de l'écran
            $(window).on('resize', resizeTchat); // Si l'écran est bougé, adapter le tchat aussi
        },
        recalcMarginForBeauty: function (li) {
            
            if (li === undefined) {
                $list = $('#tchat > ol > li');
            } else {
                $list = $(li);
            }
            
            $list.each(function () {
                $(this).children('.message').css('margin-left',  ($(this).children('.fullname').outerWidth() -1)  + 'px');
                $(this).children('.message').css('margin-right', ($(this).children('.date')    .outerWidth() -1) + 'px');
            });
        },
        login: function (prenom, nom, callbackWhenTokenIsReady) {
            $.ajax(urlBase + "getLoginToken.php?" + jQuery.param({prenom: prenom, nom: nom}), { // URL base + fichier PHP + parametre GET (prenom, nom)
                method: 'get',
                dataType: 'json',
                success: function (json) {
                    theToken = json.resultDetails.token;
                    callbackWhenTokenIsReady(theToken);
                },
                error: function () {
                    dd('bouhou ~_~');
                }
            });
        },
        
        post: function (message) {
            $.ajax(urlBase + "postMessage.php?" + jQuery.param({token: theToken}), { // URL base + fichier PHP + parametre GET (token)
                method: 'POST',
                data: {
                    message: message
                },
                dataType: 'json',
                success: function (/*json*/) {
                    //dd(json);
                },
                error: function () {
                    dd('bouhou ~_~');
                }
            });
        },
        
        getMessages: function (lastReceivedId, callback) {
            $.ajax(urlBase + "getMessages.php?" + jQuery.param({token: theToken, lastReceivedId: lastReceivedId}), { // URL base + fichier PHP + parametre GET (token, lastReceivedId)
                method: 'GET',
                dataType: 'json',
                success: function (json) {
                    callback(json.resultDetails);
                },
                error: function () {
                    dd('bouhou ~_~\'');
                }
            });
        }
    };
    
})(window);


function searchNewMessages(lastSearchId) {
    window.tchat.getMessages(lastSearchId, function (rows) {
        $.each(rows, function (key, row) {
            lastSearchId = row.id_message; // Mémoriser le dernier ID de message connu
            ajouterMessage(row.prenom, row.nom, row.message, row.date);
        });
    });
    
    // On relance la recherche pour dans 500ms
    setTimeout(function () {
        searchNewMessages(lastSearchId);
    }, 500);
}
function ajouterMessage (prenom, nom, message, date) {
    $li       = $("<li>");
    $fullname = $("<div>");
    $date     = $("<div>");
    $message  = $("<div>");
    
    $fullname.addClass('fullname');
    $date    .addClass('date');
    $message .addClass('message');
    
    var dateBeauty = new Date(date);
    
    $fullname.html("<span class='prenom'>" + prenom + "</span> <span class='nom'>" + nom + "</span>");
    $date    .html(dateBeauty.getDate() + "/" + (dateBeauty.getMonth()+1) + "/" + dateBeauty.getFullYear() + " " + dateBeauty.getHours() + ":" + dateBeauty.getMinutes() + ":" + dateBeauty.getSeconds());
    $message .html(message);
    
    $li.append($fullname);
    $li.append($date);
    $li.append($message);
    
    $("#tchat > ol").prepend($li);
    
    window.tchat.recalcMarginForBeauty($li);
}


jQuery(function () {
    window.tchat.init();
    window.tchat.recalcMarginForBeauty();
    
    window.tchat.login('olivier', 'lonzi ', function () {
        // Token is ready
        
        
        $('#message').on('keypress', function(event) {
            if(event.keyCode == 13) { // Touche Entrer
                window.tchat.post($(this).val());
                $(this).val("").focus();
            }
        });
        
        // Lancer la recherche des messages régulières
        searchNewMessages(0);
    });
});
