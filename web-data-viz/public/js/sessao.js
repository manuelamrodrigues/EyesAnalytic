// session
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var empresa = sessionStorage.FK_EMPRESA; 

    var b_usuario = document.getElementById("b_usuario");
    var b_empresa = document.getElementById("b_empresa"); 

    if (email != null && nome != null && empresa != null) {
        b_usuario.innerHTML = nome;
        b_empresa.innerHTML = empresa; 
    } else {
        window.location = "../login.html";
    }
}


function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}


function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}


function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}


function armazenarSessao(usuario) {
    sessionStorage.EMAIL_USUARIO = usuario.email;
    sessionStorage.NOME_USUARIO = usuario.nome;
    sessionStorage.EMPRESA_USUARIO = usuario.empresa; 
}

