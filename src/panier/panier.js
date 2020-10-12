

import _, { add } from 'lodash';
import './../style.scss';

let storagePrice = JSON.parse(localStorage.getItem("price"))
let price = storagePrice ? storagePrice : [];

let tableau_produit = document.getElementById("tableau-produit");
console.log("panier.js");
let storage = JSON.parse(localStorage.getItem("panier"))
let panier = storage ? storage : [];
let listeProduits = [];
fetch('http://localhost:3000/api/teddies/')
    .then(response => response.json())
    .then(teddies => {
        listeProduits = teddies;
        displayCart(teddies);
    }).catch(function(error) {
        console.log(error);
    })
;

function displayCart(teddies) {
    let total = 0;
    for (let item of panier) {
        console.log(item.id);
        let teddy = teddies.find(element => element._id === item.id)
        teddy.quantity = item.quantity;
        teddy.selectedColor = item.color;
        displayLine(teddy, "tablePanier");
        total += teddy.price;
    };
    let prix_total = document.createElement("p");
    tableau_produit.append(prix_total);
    prix_total.innerHTML = "prix total: " +total+ "€"
    localStorage.setItem("price", JSON.stringify(total));
    addListeners(teddies);
    acheter();
}



function displayLine(teddy, target) {
    let Line = `
        <tr class="border d-flex align-items-center justify-content-around">
            <td class="pl-2 col-md-1 col-2 pr-2">
                ${teddy.name}
            </td>
            <td class="pl-2 col-md-1 col-2 pr-2">
                ${teddy.selectedColor}
            </td>
            <td id="tableau-price">
                ${teddy.price}€
            </td>
            <td id="tableau-price-total_${teddy._id}_${teddy.selectedColor}">
                ${teddy.price * teddy.quantity}€
            </td>
            <td class="col-3 col-md-1 d-flex justify-content-center">
                <img src="${teddy.imageUrl}" class="img-tableau">
            </td>
            <td>
                <button id="button-supprimer" data-target-id="${teddy._id}" data-target-price="${teddy.price}" data-target-color="${teddy.selectedColor}" class="btn btn-danger bouton-supprimer" click="test">
                    -
                </button>
            </td>
            <td id="teddy_${teddy._id}_${teddy.selectedColor}" class="bg-secondary d-flex justify-content-center rounded-circle pt-md-2 pb-md-2 pl-1 pr-1 pl-md-3 pr-md-3">
                ${teddy.quantity}
            </td>
            <td>
                <button id="button-ajouter" class="btn btn-primary bouton-ajouter" data-target-price="${teddy.price}" data-target-id="${teddy._id}" data-target-color="${teddy.selectedColor}">
                    +
                </button>
            </td>
        </tr>`;
    document.getElementById(target).innerHTML += Line;
}

function addPrice(teddies) {
    let teddy = teddies.map(elt => elt.price);
    console.log(teddies)
    let priceUnitaire = teddy.price;
    let prixCumule = priceUnitaire * item.quantity;
    price.innerHTML = prixCumule + "€";

    return prixCumule;
}

function addListeners(teddies) {
    console.log(teddies);
    console.log(document.querySelectorAll(".bouton-ajouter"));
    [].forEach.call(document.querySelectorAll(".bouton-ajouter"), function(el) {
        console.log(el)
        el.addEventListener('click', function() {
            console.log(el.dataset.targetColor)
            addItem(el.dataset.targetId, el.dataset.targetColor, parseInt(el.dataset.targetPrice))
        })
    }),
    [].forEach.call(document.querySelectorAll(".bouton-supprimer"), function(el) {
        console.log(el)
        el.addEventListener('click', function(event) {
            console.log("button_ajouter")
            deleteItem(el.dataset.targetId, el.dataset.targetColor, parseInt(el.dataset.targetPrice), event)
            price -= parseInt(el.dataset.targetPrice);
            console.log(price)
        })
    })
}

function acheter(){
    document.getElementById("button").addEventListener("click", function(){
        var inputName = document.getElementById("name").value;
        var inputNom = document.getElementById("nom").value;
        var inputAdresse = document.getElementById("adresse").value;
        var inputVille = document.getElementById("ville").value;
        var inputEmail = document.getElementById("email").value;
        // Afficher la valeur
        console.log(inputNom);
        console.log(inputEmail);

        console.log(panier)

        let contact = {
                firstName: inputName,
                lastName: inputNom,
                address: inputAdresse,
                city: inputVille,
                email: inputEmail
            }
        localStorage.setItem("contact", JSON.stringify(contact));
        
        let products = panier.map(elt => elt.id);

        fetch('http://localhost:3000/api/teddies/order', {
        method: "POST",
        body: JSON.stringify({contact, products}),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(elt => {
            console.log(elt)
            localStorage.setItem("teddy.price", JSON.stringify(elt.orderId));
            // window.location.replace("confirmation.html");
        }).catch(function(error) {
            console.log(error);
        });
    });
}

function addItem(id, color, prix) {
    let item = panier.find(elt => elt.id === id && elt.color === color);
    item.quantity += 1;
    console.log(id, color);
    document.getElementById("teddy_" +id+"_"+color).innerHTML = item.quantity;
    document.getElementById("tableau-price-total_" +id+"_"+color).innerHTML= item.quantity * prix + "€";
    localStorage.setItem("panier", JSON.stringify(panier));
}

function deleteItem(id, color, prix, event) {
    let item = panier.find(elt => elt.id === id && elt.color === color)
    console.log(item)
    console.log(panier, id, price)
    item.quantity -= 1;
    if (item.quantity <= 0) {
        item.quantity = 0;
        let itemIndex = panier.indexOf(element => element.id === id && element.color === color);
        panier.splice(itemIndex, 1);
        event.target.parentNode.parentNode.parentNode.parentNode.innerHTML = "";
        displayCart(listeProduits);
    }
    console.log(panier);
    document.getElementById("tableau-price-total_" + id+"_"+color).innerHTML= item.quantity * prix + "€";
    document.getElementById("teddy_" +id+"_"+color).innerHTML = item.quantity;
    localStorage.setItem("panier", JSON.stringify(panier));
}
