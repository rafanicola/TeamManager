var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){
    if(xhr.readyState = 1){
        console.log(xhr)
    }
}

xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1")

xhr.send()