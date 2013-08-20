function getAllChars(){
    $.ajax({
        url: '/characters',
        dataType: 'json',
        type: 'GET',  //get is technically default, but I'm throwing this in there anyway

        success: function(result){
            var charData = new Array();
            charData = result;
            $.each(charData, function(i, item) {
                $('#charlist').append('<li>'+charData[i].name+'</li>');
                $('#charchoose').append('<option value="'+charData[i]._id+'">'+charData[i].name+'</option>');
            });
        } // success over        
    });
}

function getCharList(){
    $.ajax({
        url: '/characters',
        dataType: 'json',
        type: 'GET',  //get is technically default, but I'm throwing this in there anyway

        success: function(result){
            var charData = new Array();
            charData = result;
            $.each(charData, function(i, item) {
                $('#char2mod').append('<option value="'+charData[i]._id+'">'+charData[i].name+'</option>');
            });
        } // success over        
    });
}


function getCharData(sel){
    var id = sel.options[sel.selectedIndex].value; 
    if (id=='') {
        console.log("you're not allowed to get nothing!");
        return;
    }
    console.log("about to get char data");
    theUrl = '/charbyid?id='+id;
    $('#charstats').empty(); //toss out the previously rendered char stats

    $.ajax({
        url: theUrl,  //this will be different
        dataType: 'json',
        type: 'GET',  //get is technically default, but I'm throwing this in there anyway

        success: function(result){
            var charStats = new Array();
            charStats = result;
            $.each(charStats, function(i, item) {
                $('#charstats').append(charStats[i]+'<>');
            });
        } // success over        
    });
}

function addNewChar() {
    console.log("meow");
    theUrl = '/addchar';
    theData = 'name=Bobbins';
    $.ajax({
        url: theUrl,  
        type: 'POST',
        data: theData,
        success: function(result){
            console.log("ha HAAAA!");
        },
        error: function(oh, noes, stuff){
            console.log(oh);
            console.log(noes);
            console.log(stuff);
        }
    });
}

function getAllModData() {
    //code
}

function getModList() {
    theUrl = '/modifiers';
    $.ajax({
        url: theUrl,  
        type: 'GET',
        dataType: 'json',
        success: function(result){
            var modData = new Array();
            modData = result;
            $.each(modData, function(i, item) {
                $('#mod2char').append('<option value="'+modData[i]._id+'">'+modData[i].stat+'</option>');
            });
        }
    });
}

$(function() {
    $('.error').hide();  
    $("#char_gen_button").click(function() {  
        $('.error').hide();  
        var name = $("input#name").val();  
        if (name == "") {  
            $("label#name_error").show();  
            $("input#name").focus();  
            return false;  
        } else {
            console.log("name is not blank, continuing to ajax");
            theData="name="+name;
            $.ajax({
                type: "POST",
                url: '/addchar',
                data: theData,
                success: function(){
                    $('#char_creation').html("<div id='message'></div>");  
                    $('#message').html("<h2>Character created!</h2>")  
                    .append("<p>Now fill in the stats!</p><p>you might need to refresh the page to see it though</p>")  
                    .hide()     
                },
                error: function() {
                    alert("character creation request did not go through to the server!  Yell at Blake!");
                }
            });
        }
    });  
});  

$(function() {
    $("#charaddmod").click(function() {
        console.log("trying to add mod!");
        var modID = $("#mod2char").val();
        var charID = $("#char2mod").val();
        $.ajax({
            url: '/applymod',  
            type: 'POST',
            data: {modid: modID, charid: charID},
            success: function(result){
                alert("request successful!");
            },
            error: function(oh, noes, stuff){
                alert("request failed!  Yell at Blake!");
            }
        });
    });
});
    
$(function() {
    $('.error').hide();  
    $("#mod_gen_button").click(function() {  
        $('.error').hide();  
        var name = $("input#modname").val();
        var type = $("input#modtype").val();
        var stack = $("input#modstack").is(':checked');
        var value = $("input#modvalue").val();
        var note = $("input#modnote").val();
        theData = new Object()
        
        console.log(stack);
        if (name == "") {  
            $("label#modname_error").show();  
            $("input#modname").focus();  
            return false;  
        }
        if (value == "") {  
            $("label#modvalue_error").show();  
            $("input#modvalue").focus();  
            return false;
        }    
        console.log("name is not blank, continuing to ajax");
        theData="name="+name; //stat
        
        $.ajax({
            type: "POST",
            url: '/addmod',
            data: {
                stat: name,
                type: type,
                stacking: stack,
                value: value,
                note: note
            },
            success: function(){
                $('#char_creation').html("<div id='message'></div>");  
                $('#message').html("<h2>Character created!</h2>")  
                .append("<p>Now fill in the stats!</p><p>you might need to refresh the page to see it though</p>")  
                .hide()     
            },
            error: function() {
                alert("character creation request did not go through to the server!  Yell at Blake!");
            }
        });
    });  
});

function quack() {
    console.log('quack');
}

getAllChars();
getCharList();
getModList();
