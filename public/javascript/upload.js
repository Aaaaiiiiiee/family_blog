$(document).ready(resizeTextareaHeight);
$(window).resize(resizeTextareaHeight);

function resizeTextareaHeight(){
    var height = $(window).height() - 310;
    $('textarea').css('height', height + "px");
}