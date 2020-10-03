

import _, { add } from 'lodash';
import './../style.scss';

let tableau_produit = document.getElementById("tableau-produit");
console.log("panier.js");
let storage = JSON.parse(localStorage.getItem("panier"))
let panier = storage ? storage : [];
fetch('http://localhost:3000/api/teddies/')
    .then(response => response.json())
    .then(teddies => {
        displayCart(teddies);
    }).catch(function(error) {
        console.log(error);
    })
;


// function price(teddy) {
//     let total = 0;
//     total += teddy.price;
//     let prix_total = document.createElement("p");
//     tableau_produit.append(prix_total);
//     prix_total.innerHTML = "prix total: " +total+ "€"
// }


function displayCart(teddies) {
    for (let item of panier) {
        console.log(item.id);
        let teddy = teddies.find(element => element._id === item.id)
        teddy.quantity = item.quantity;
        teddy.selectedColor = item.color;
        displayLine(teddy, "tablePanier");
        // price(teddy);
    };
    addListeners()
    acheter();
}



function displayLine(teddy, target) {
    let Line = `
        <tr class="border d-flex align-items-center justify-content-around">
            <td class="pl-2 pr-2">
                ${teddy.name}
            </td>
            <td class="pl-2 pr-2">
                ${teddy.selectedColor}
            </td>
            <td id="tableau-price">
                ${teddy.price}
            </td>
            <td class="col-12 col-md-5">
                <img src="${teddy.imageUrl}" class="w-25">
            </td>
            <td>
                <button id="button-supprimer" data-target-id="${teddy._id}" data-target-color="${teddy.selectedColor}" class="btn btn-danger bouton-supprimer" click="test">
                    -
                </button>
            </td>
            <td id="teddy_${teddy._id}" class="bg-secondary d-flex justify-content-center rounded-circle pt-md-2 pb-md-2 pl-1 pr-1 pl-md-3 pr-md-3">
                ${teddy.quantity}
            </td>
            <td>
                <button id="button-ajouter" class="btn btn-primary bouton-ajouter" data-target-id="${teddy._id}" data-target-color="${teddy.selectedColor}">
                    +
                </button>
            </td>
        </tr>`;
    document.getElementById(target).innerHTML += Line;
}

function addListeners() {
    console.log(document.querySelectorAll(".bouton-ajouter"));
    [].forEach.call(document.querySelectorAll(".bouton-ajouter"), function(el) {
        console.log(el)
        el.addEventListener('click', function() {
            console.log("button_ajouter")
            addItem(el.dataset.targetId, el.dataset.targetColor)
        })
    }),
    [].forEach.call(document.querySelectorAll(".bouton-supprimer"), function(el) {
        console.log(el)
        el.addEventListener('click', function() {
            console.log("button_ajouter")
            deleteItem(el.dataset.targetId, el.dataset.targetColor)
        })
    })
}

function acheter(){
    document.getElementById("button").addEventListener("click", function(){
        var inputName = document.getElementById("name").value;
        var inputEmail = document.getElementById("email").value;
        // Afficher la valeur
        console.log(inputName);
        console.log(inputEmail);
        lien.setAttribute("href", "confirmation.html?name=" +inputName + "&email="  +inputEmail);
    });
}

function addItem(id, color, teddies) {
    let item = panier.find(elt => elt.id === id && elt.color === color)
    // console.log(item)
    // console.log(panier, id)
    // let teddy = teddies.find(element => element > 10);
    // console.log(teddy);
    console.log(panier)
    item.quantity += 1;
    document.getElementById("teddy_" +id).innerHTML = item.quantity;
    localStorage.setItem("panier", JSON.stringify(panier));
    // console.log(item);
}

function deleteItem(id, color) {
    let item = panier.find(elt => elt.id === id && elt.color === color)
    console.log(item)
    console.log(panier, id)
    item.quantity -= 1;
    if (item.quantity <= 0) {
        item.quantity = 0;
    }
    console.log(panier);
    document.getElementById("teddy_" +id).innerHTML = item.quantity;
    localStorage.setItem("panier", JSON.stringify(panier));
}