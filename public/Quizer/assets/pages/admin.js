const content = document.querySelectorAll('.content') ;
var courrentContent = content[0] ; 

const changeContent = (newIndex) => {
    courrentContent.classList.add("d-none") ; 
    courrentContent = content[newIndex - 1] ; 
    courrentContent.classList.remove("d-none");
}
console.log(content) ;