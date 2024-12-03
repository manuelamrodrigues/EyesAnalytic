// session
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var empresa = sessionStorage.FK_EMPRESA; 

    console.log(email, empresa)

    if(email == undefined || empresa == undefined){
        window.location ="../index.html"
    }
    
    if(empresa == undefined){
        window.location ="./dashboard/dash-especialista-seguranca.html"
    }


    }


function limparSessao() {
    sessionStorage.clear();
    window.location = "../index.html";
    sessionStorage.clear();
    
    window.location = "./dashboard/dash-especialista-seguranca.html";
}






