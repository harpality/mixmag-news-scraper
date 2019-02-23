$(document).ready(function(){
    $('.modal').modal();
    $('.save-comment').click(function(){
        let thisId = $(this).attr('data-id'); 
        let comment = $(`#modal${thisId} #userComment`).val()
        console.log(comment, thisId)
        $(`#modal${thisId} #userComment`).val("");
    })

});

// $('#try').click(function() {
//     $("#userComment").val("");
// })