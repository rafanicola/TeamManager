
$("#phone").mask("(99) 99999-9999");

document.getElementById("deletePlayer").addEventListener('click', confirmDeletion)
function confirmDeletion(event){
    if(confirm("Dejesa excluir o atleta do sistema? Caso confirme, a ação não poderá ser desfeita!")){
        alert("Registro removido com sucesso!");
    }else{
        event.preventDefault();
    }
}

document.forms.namedItem("formAtletas").addEventListener("submit", emptyFields);
function emptyFields(event){

    var playerName = document.getElementById("playerName");
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");
    var birthDate = document.getElementById("birthDate");

    if(playerName.value == "" || phone.value == "" || email.value == "" || birthDate.value == ""){
        alert("Preencha os campos obrigatórios");
        event.preventDefault();
        
        $(playerName).addClass("isInvalid");
        $(phone).addClass("isInvalid");
        $(email).addClass("isInvalid")
        $(birthDate).addClass("isInvalid");

        setTimeout(() => {
            $(playerName).removeClass("isInvalid");
            $(phone).removeClass("isInvalid");
            $(email).removeClass("isInvalid")
            $(birthDate).removeClass("isInvalid");
        }, 2000);
    }else{
        alert("Salvo com sucesso!");
    }
}

const oReq = new XMLHttpRequest();

$("#editPlayer").click(function () { 

    oReq.addEventListener("load", function(){
        console.log(this.responseText);
        
    })
    oReq.open("GET", "http://localhost:3000/adm/equipes");
    oReq.send();
    
    console.log(oReq);
});