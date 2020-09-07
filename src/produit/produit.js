import _ from 'lodash';
import './../style.scss';

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
console.log(id);
// window.localStorage.clear();

let b = document.body;
let checkbox = document.getElementById("bloc_colors");
let ajout = document.getElementById("ajout");

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

fetch('http://localhost:3000/api/teddies/' +id)
    .then(status)
    .then(json)
    .then(function(data) {
        console.log(data);
        toto(data);
    }).catch(function(error) {
        console.log(error);
    })
;

function toto(response){
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
    let test = document.createElement("a");
    let button = document.createElement("button");
    ajout.append(test);
    test.append(button);
    button.setAttribute("class", "btn btn-primary");
    button.innerHTML = "ajouter au panier";
    button.addEventListener('click', (e) => {
        const panierJSON = localStorage.getItem("panier");
        let panier = [];
        if (panierJSON !== null) {
            panier = JSON.parse(panierJSON);
        }
        panier.push({
            id,
            color: document.querySelector('#bloc_colors input[name="colors"]:checked').value
        })
        localStorage.setItem("panier", JSON.stringify(panier));
        console.log(e);
    })
}