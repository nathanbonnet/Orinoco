import _ from 'lodash';
import './../style.scss';
let b = document.body;
let bloc = document.createElement("div");
bloc.setAttribute("id", "toto");
bloc.setAttribute("class", "d-flex justify-content-center")
b.append(bloc);

let test = document.getElementById("test");
test.append(bloc)
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

function toto(response) {
    for (var i in response) {
        let lien = document.createElement("a");
        let blocIcon = document.createElement("div");
        let blocInfo = document.createElement("div");
        let icon = document.createElement("img");
        let price = document.createElement("p");
        let name = document.createElement("p");
        icon.src = response[i].imageUrl;
        price.innerHTML = response[i].price + " €";
        name.innerHTML = response[i].name + " :";
        blocInfo.append(price);
        blocInfo.append(name);
        blocIcon.append(icon);
        lien.append(blocIcon);
        lien.append(blocInfo);
        bloc.append(lien);
        console.log(response[i]);
        icon.setAttribute("id", "icon");
        lien.setAttribute("href", "produit.html?id=" + response[i]._id);
        lien.setAttribute("id", "lien");
        blocIcon.setAttribute("id", "blocIcon");
        blocInfo.setAttribute("id", "blocInfo");
        price.setAttribute("id", "price")
    }
}