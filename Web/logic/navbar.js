// El elemento de navbar arriba a la derecha (las tres barritas)
const hamburgerMenu = document.querySelector("#hamburger-menu");

//el propio overlay entero del navbar
const overlay = document.querySelector("#nav_overlay");

//Pestañas de navegación
const nav1 = document.querySelector("#nav_index");
const nav2 = document.querySelector("#nav_juego");
const nav3 = document.querySelector("#nav_descripcion");
const nav4 = document.querySelector("#nav_desarrollo");
const nav5 = document.querySelector("#nav_multimedia");
const nav6 = document.querySelector('#nav_referencias');
const navItems = [nav1, nav2, nav3, nav4, nav5, nav6];



// Escuchador del click del navbar
hamburgerMenu.addEventListener("click", toggleNav);

//Si hay un click, por cada elemento del navbar (las 6 opciones de pestañas), se cierran 
navItems.forEach((nav) => {
    nav.addEventListener("click", toggleNav);
});



//función a realizar por el escuchador
function toggleNav() {

    //si esta desplegado:
    if (overlay.classList.contains("active")) {
        // Si el menú está abierto, lo cerramos
        overlay.classList.remove("active");
        // Delizamos el overlay grande
        overlay.classList.replace("deslizamiento_izquierda", "deslizamiento_derecha");
        // Deslizamos cada elemento del overlay
        navAnimation("out", "in");
    }
    //si no está desplegado:
    else {
        // Si el menú está cerrado, lo abrimos
        overlay.classList.add("active");
        // Deslizamos el overlay grande
        overlay.classList.replace("deslizamiento_derecha", "deslizamiento_izquierda");
        // Deslizamos cada elemento del overlay (cada sección)
        navAnimation("in", "out");
    }
}

// Función para delizar cada elemento del overlay (cambiamos la animación de "in" a "out")
function navAnimation(val1, val2) {
    navItems.forEach((nav, i) => {
        // ESTAS ANIMACIÓNES CORRESPONDEN CON LAS QUE ESTÁN EN  NAVBAR.CSS
        nav.classList.replace(`slide-${val1}-${i + 1}`, `slide-${val2}-${i + 1}`);
    });
}