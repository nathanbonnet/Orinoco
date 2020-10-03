import _ from 'lodash';
import './../style.scss';

//permet de recuperer les information passé dans l'url
const url = new URL(window.location.href);
const id = url.searchParams.get("id");
console.log(id);

// window.localStorage.clear();

let blocNotif = document.getElementById("bloc-notif");
let checkbox = document.getElementById("checkbox-colors");
let ajout = document.getElementById("bloc-right");

console.log("produit.js");

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

function createNotif(){
    let notif = document.createElement("div");
    notif.id = "my-notif";
    let message = document.createElement("p");
    blocNotif.append(notif);
    notif.append(message);
    notif.setAttribute("class", "alert bg-success position-absolute notification col-3");
    message.setAttribute("class", "text-white")
    message.innerHTML = "le produit à bien été ajouté au panier";
    setTimeout(deleteNotif, 2000);
}

function deleteNotif(){
        blocNotif.innerHTML = "";
}



fetch('http://localhost:3000/api/teddies/' +id)
    .then(status)
    .then(json)
    .then(function(data) {
        console.log(data);
        affichageProduit(data);
    }).catch(function(error) {
        console.log(error);
    })
;

function affichageProduit(response){
    let icon = document.getElementById("icon");
    let price = document.getElementById("price");
    price.innerHTML = response.price + " €";
    icon.src = response.imageUrl;
    icon.setAttribute("id", "icon_produit");
    console.log(response);
    for (var i = 0; i < response.colors.length; i++) {
        let check = document.createElement("input");
        let color = document.createElement("p");
        checkbox.append(check);
        checkbox.append(color);
        color.innerHTML = response.colors[i];
        check.setAttribute("type", "radio");
        check.setAttribute("name", "colors");
        check.setAttribute("value", response.colors[i]);
    }
    ajouter()
}

function ajouter() {
    let lien = document.createElement("a");
    let button_ajout = document.createElement("button");
    ajout.append(lien);
    lien.append(button_ajout);
    button_ajout.setAttribute("class", "btn btn-primary mt-3");
    button_ajout.innerHTML = "ajouter au panier";
        button_ajout.addEventListener('click', (e) => {
            const panierJSON = localStorage.getItem("panier");
            let panier = [];
            if (panierJSON !== null) {
                panier = JSON.parse(panierJSON);
            }
            addToCart(panier,{
                id,
                color: document.querySelector('#checkbox-colors input[name="colors"]:checked').value
            })
            localStorage.setItem("panier", JSON.stringify(panier));
            console.log(e);
        })
}

function addToCart(panier, product){
    let cartProduct = panier.find(element => element.id === product.id && element.color === product.color);
    if(cartProduct === undefined) {
        let newProduct = product;
        newProduct.quantity = 1;
        panier.push(product)
    }else {
        cartProduct.quantity += 1
    }
    createNotif();
};
