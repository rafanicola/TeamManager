
document.forms.namedItem("formEquipes").addEventListener("submit", emptyFields);

function emptyFields(event){
    var teamName = document.getElementById("teamName");
    var clubName = document.getElementById("clubName");
    
    if(teamName.value === "" || clubName.value === ""){
        alert("Preencha os campos obrigatórios!");
        //preventDefault bloqueia o método de ser submetido.
        event.preventDefault();

        $("#teamName").addClass("isInvalid");
        $("#clubName").addClass("isInvalid");

        setTimeout(function(){
            $("#teamName").removeClass("isInvalid");
            $("#clubName").removeClass("isInvalid");
        }, 3000);
        
    }else{
        alert("Salvo com sucesso");
    }
}
