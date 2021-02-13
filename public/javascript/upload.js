$(document).ready(resizeTextareaHeight);
$(window).resize(resizeTextareaHeight);

function resizeTextareaHeight(){
    var height = $(window).height() - 300;
    $('textarea').css('height', height + "px");
}