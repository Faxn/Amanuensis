function getAllChars(){
    $.ajax({
        url: 'http://192.168.1.116:8080/characters',
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

function getCharData(sel){
    var id = sel.options[sel.selectedIndex].value; 
    if (id=='') {
        console.log("you're not allowed to get nothing!");
        return;
    }
    console.log("about to get char data");
    theUrl = 'http://192.168.1.116:8080/charbyid?id='+id;
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

function putNewChar() {
    console.log("meow");
    theUrl = 'http://192.168.1.116:8080/addchar';
    theData = 'name=Bobbins';
    $.ajax({
        url: theUrl,  //this will be different
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
    console.log("meow meow");
}

function quack() {
    console.log('quack');
}
/*
$('#addGuy').bind('click', putNewChar());
$('#otherAddGuy').bind('click', putNewChar());
*/
getAllChars();