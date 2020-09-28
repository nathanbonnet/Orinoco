import _ from 'lodash';
import './../style.scss';

let body = document.body;
let bloc = document.createElement("div");
bloc.setAttribute("id", "toto");
bloc.setAttribute("class", "d-flex justify-content-center")
body.append(bloc);

let blocElement = document.getElementById("bloc-element");
blocElement.append(bloc)

fetch('http://localhost:3000/api/teddies/')
    .then(status)
    .then(json)
    .then(function(data) {
        console.log(data);
        element(data);
    }).catch(function(error) {
        console.log(error);
        bloc.innerHTML = '<h1 style="color:red">une erreur est survenue sur le serveur</h1>'
    })
;

function element(response) {
    for (var i in response) {
        let lienDuProduit = document.createElement("a");
        let blocImage = document.createElement("div");
        let blocInfoProduit = document.createElement("div");
        let image = document.createElement("img");
        let prix = document.createElement("p");
        let name = document.createElement("p");
        image.src = response[i].imageUrl;
        prix.innerHTML = response[i].price + " €";
        name.innerHTML = response[i].name + " :";
        blocInfoProduit.append(prix);
        blocInfoProduit.append(name);
        blocImage.append(image);
        lienDuProduit.append(blocImage);
        lienDuProduit.append(blocInfoProduit);
        bloc.append(lienDuProduit);
        console.log(response[i]);
        image.setAttribute("id", "icon");
        lienDuProduit.setAttribute("href", "produit.html?id=" + response[i]._id);
        lienDuProduit.setAttribute("id", "lien");
        blocImage.setAttribute("id", "blocIcon");
        blocInfoProduit.setAttribute("id", "blocInfo");
        prix.setAttribute("id", "price")
    }
}

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