// session
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var empresa = sessionStorage.FK_EMPRESA; 

    console.log(email, empresa)

    if(email == undefined || empresa == undefined){
        window.location ="../index.html"
    }
    
  


    }


function limparSessao() {
    sessionStorage.clear();
    window.location = "../index.html";
}






