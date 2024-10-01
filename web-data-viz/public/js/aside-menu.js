document.addEventListener("DOMContentLoaded", () => {
    const menuHamburguer = document.getElementById('menu-hamburguer');
    const navLinks = document.getElementById('navLinks');
    
    // Alterna a classe "active" no menu de navegação
    menuHamburguer.addEventListener('click', () => {
    console.log("EU ESTOU OBSERVANDO..")
    navLinks.classList.toggle('active');
    menuHamburguer.classList.toggle('open');
});
})