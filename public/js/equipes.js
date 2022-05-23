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


// var editButtonSize = document.getElementsByName("editTeam").length;

// for(var i = 0; i < editButtonSize ; i++){
    
//     document.getElementsByName("editTeam")[i].addEventListener('click', function(){
//         console.log(this);

//         let xhr = new XMLHttpRequest();
//         xhr.open("GET", 'https://reqres.in/api/users');

//         xhr.responseType = 'json';
//         xhr.onload = function(){
//             const data = xhr.response;
//             console.log(data)
//         }
//         xhr.send();
//     })
// }



