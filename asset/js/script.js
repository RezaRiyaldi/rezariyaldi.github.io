const navbar = document.querySelector('.navs')
window.onscroll = () => {
    if (window.scrollY > 100) {
        navbar.classList.add('nav-active')
    }else{
        navbar.classList.remove('nav-active')
    }
}

const hamburger = document.querySelector(".burger")
const navMenu = document.querySelector(".nav-menu") 

hamburger.addEventListener("click", mobileMenu)
function mobileMenu(){
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
}

AOS.init()