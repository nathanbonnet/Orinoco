import _ from 'lodash';
import './../style.scss';


const url = new URL(window.location.href);
const id = url.searchParams.get("id");
console.log(id);
function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json()
}

fetch('http://localhost:3000/api/teddies/')
    .then(status)
    .then(json)
    .then(function(data) {
        console.log(data);
        toto(data);
    }).catch(function(error) {
        console.log(error);
        bloc.innerHTML = '<h1 style="color:red">une erreur est survenue sur le serveur</h1>'
    })
;

function toto(response){
    let tata = document.createElement("p");
    tata.innerHTML = response.colors;
    b.append(tata);
}


console.log("confirmation.js");