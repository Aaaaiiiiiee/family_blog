const height = window.innerHeight|| document.documentElement.clientHeight|| 
document.body.clientHeight;

document.querySelector('textarea').style.height = (height-40) + "px";
console.log(document.querySelector('textarea').style.height);