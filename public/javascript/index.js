window.onload = function(){
    init();
}

function init() {
    var currentPagePath = window.location.pathname.split('/')[1];

    var navLists = document.querySelectorAll('nav>a');

    for (let i = 0; i < navLists.length; i++) {
        var navStr = navLists[i].innerHTML;
        if (navStr.toLowerCase() == currentPagePath
            || navStr === 'Home' && currentPagePath === 'index'
        ) {
            navLists[i].setAttribute('class', 'nav-link active');
            navLists[i].setAttribute('aria-current', 'page');
        } else {
            navLists[i].setAttribute('class', 'nav-link');
            navLists[i].setAttribute('aria-current', '');
        }
    }
}