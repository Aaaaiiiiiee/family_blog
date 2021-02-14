$(document).ready(init);
$(window).resize(resizeImgWidth);

function init(){
    resizeImgWidth();
    changeImage();
    $($('img')[0]).css('display', 'block');
}

function resizeImgWidth(){
    var width = $(window).height();
    if(width >= 1100){
        $('img').css('max-width', 1100 + "px");
    } else{
        $('img').css('max-width', width + 'px');
    }
}

function changeImage(){
    var allImgtag = $('img');

    var pre_index, index = 0;

    var timer = setInterval(()=>{
        if(index == allImgtag.length - 1){
            pre_index = allImgtag.length - 1;
            index = 0;
        } else{
            pre_index = index;
            index += 1;
        }

        $(allImgtag[pre_index]).css('display', 'none');
        $(allImgtag[pre_index]).fadeOut(200, ()=>{
            $(allImgtag[index]).css('display', 'block');
            $(allImgtag[index]).fadeIn(200);
        });
    }, 5000);
}