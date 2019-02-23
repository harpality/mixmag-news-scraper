$(document).ready(function(){
    $('.modal').modal();
    $('.save-comment').click(function(){
        let comment = $("#userComment").val()
        let thisId = $(this).attr('data-id'); 
        console.log(comment, thisId)
        $("#userComment").val("");
    })

});
