

import _, { add } from 'lodash';
import './../style.scss';

let storagePrice = JSON.parse(localStorage.getItem("price"))
let price = storagePrice ? storagePrice : [];

let prix_total = document.createElement("p");
let tableau_produit = document.getElementById("tableau-produit");
tableau_produit.append(prix_total);
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
        let teddy = teddies.find(element => element._id === item.id)
        teddy.quantity = item.quantity;
        teddy.selectedColor = item.color;
        displayLine(teddy, "tablePanier");
        total += teddy.price * teddy.quantity;
    };
    addListeners(teddies);
    acheter();
    prixTotal(total)
}

function prixTotal(total) {
    prix_total.innerHTML = "prix total: " +total+ "€";
    localStorage.setItem("price", JSON.stringify(total));
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

function addListeners(teddies) {
    [].forEach.call(document.querySelectorAll(".bouton-ajouter"), function(el) {
        el.addEventListener('click', function() {
            console.log(el.dataset.targetColor)
            addItem(el.dataset.targetId, el.dataset.targetColor, parseInt(el.dataset.targetPrice))
        })
    }),
    [].forEach.call(document.querySelectorAll(".bouton-supprimer"), function(el) {
        el.addEventListener('click', function(event) {
            deleteItem(el.dataset.targetId, el.dataset.targetColor, parseInt(el.dataset.targetPrice), event)
            price -= parseInt(el.dataset.targetPrice);
        })
    })
}

function acheter(){
    document.getElementById("button").addEventListener("click", function(event){
       let error = document.getElementById("error");
        event.preventDefault();
        checkSubmit()

        function checkSubmit() {
            var inputName = document.getElementById("name");
            var inputNom = document.getElementById("nom");
            var inputAdresse = document.getElementById("adresse");
            var inputVille = document.getElementById("ville");
            var inputEmail = document.getElementById("email");

            if(checkEmpty(inputName) && checkEmpty(inputNom) && checkEmpty(inputAdresse) && checkEmpty(inputVille) && checkEmpty(inputEmail) && checkEmail(inputEmail)) {
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
                            console.log(elt, "test")
                            localStorage.setItem("toto", JSON.stringify(elt.orderId));
                            window.location.replace("confirmation.html");
                        }).catch(function(error) {
                            console.log(error.response);
                    });
                    let button = document.getElementById("button");
                    button.disabled = false;
                }else {
                    let button = document.getElementById("button");
                    button.disabled = true;
                }
        }

        checkForm()

        function checkEmpty(input) {
            if(input.value === "") {
                error.textContent = `${input.name} est vide`;
                error.setAttribute("class", "btn btn-danger")
                return false
            }else {
                error.textContent = ``;
                error.setAttribute("class", "")
                return true
            }
        }

        function checkEmail(input) {
            let regex = /\S+@\S+\.\S+/;
            if(!regex.test(input.value)) {
                error.textContent = `le format de l'email n'est pas correct`;
                return false
            }else {
                error.textContent = ``;
                return true
            }
        }

        function checkForm() {
            document.getElementById("name").addEventListener('keyup', (e) => {
                checkEmpty(e.target);
                checkSubmit()
            })
            document.getElementById("nom").addEventListener('keyup', (e) => {
                checkEmpty(e.target);
                checkSubmit()
            })
            document.getElementById("adresse").addEventListener('keyup', (e) => {
                checkEmpty(e.target);
                checkSubmit()
            })
            document.getElementById("ville").addEventListener('keyup', (e) => {
                checkEmpty(e.target);
                checkSubmit()
            })
            document.getElementById("email").addEventListener('keyup', (e) => {
                checkEmpty(e.target);
                checkEmail(e.target);
                checkSubmit()
            })
            document.getElementById("button").addEventListener('submit', (e) => {
                e.preventDefault();
                checkForm();
            })
        }
        
    });


        // let contact = {
        //     firstName: inputName,
        //     lastName: inputNom,
        //     address: inputAdresse,
        //     city: inputVille,
        //     email: inputEmail
        // }
        // localStorage.setItem("contact", JSON.stringify(contact));

        // let products = panier.map(elt => elt.id);

        // fetch('http://localhost:3000/api/teddies/order', {
        //     method: "POST",
        //     body: JSON.stringify({contact, products}),
        //     headers: {"Content-type": "application/json; charset=UTF-8"}
        //     })
        //     .then(response => response.json())
        //     .then(elt => {
        //         console.log(elt, "test")
        //         localStorage.setItem("toto", JSON.stringify(elt.orderId));
        //         window.location.replace("confirmation.html");
        //     }).catch(function(error) {
        //         console.log(error.response);
        // });

        
        // else if (inputEmail != verificationEmail) {
        //     errorEmail.innerHTML = "Adresse e-mail non valide"
        //     errorEmail.setAttribute("class", "btn btn-warning")
        // }else {
        //     errorEmail.innerHTML = ""
        //     errorEmail.setAttribute("class", "")
        // }

        // var inputName = document.getElementById("name").value;
        // if(inputName == "") {
        //     errorName.innerHTML = "le champs est vide"
        //     errorName.setAttribute("class", "btn btn-danger")
        // }else {
        //     errorName.innerHTML = ""
        //     errorName.setAttribute("class", "")
        // }
        // var inputNom = document.getElementById("nom").value;
        // if(inputNom == "") {
        //     errorNom.innerHTML = "le champs est vide"
        //     errorNom.setAttribute("class", "btn btn-danger")
        // }else {
        //     errorNom.innerHTML = ""
        //     errorNom.setAttribute("class", "")
        // }
        // var inputAdresse = document.getElementById("adresse").value;
        // if(inputAdresse == "") {
        //     errorAdresse.innerHTML = "le champs est vide"
        //     errorAdresse.setAttribute("class", "btn btn-danger")
        // }else {
        //     errorAdresse.innerHTML = ""
        //     errorAdresse.setAttribute("class", "")
        // }
        // var inputVille = document.getElementById("ville").value;
        // if(inputVille == "") {
        //     errorVille.innerHTML = "le champs est vide"
        //     errorVille.setAttribute("class", "btn btn-danger")
        // }else {
        //     errorVille.innerHTML = ""
        //     errorVille.setAttribute("class", "")
        // }
        // var inputEmail = document.getElementById("email").value;
        // if(inputEmail == "") {
        //     errorEmail.innerHTML = "le champs est vide"
        //     errorEmail.setAttribute("class", "btn btn-danger")
        // }else {
        //     errorEmail.innerHTML = ""
        //     errorEmail.setAttribute("class", "")
        // }
}

function addItem(id, color, prix) {
    let item = panier.find(elt => elt.id === id && elt.color === color);
    item.quantity += 1;
    console.log(id, color);
    document.getElementById("teddy_" +id+"_"+color).innerHTML = item.quantity;
    document.getElementById("tableau-price-total_" +id+"_"+color).innerHTML= item.quantity * prix + "€";
    localStorage.setItem("panier", JSON.stringify(panier));
    total += prix
    prixTotal(total);
}

function deleteItem(id, color, prix, event) {
    let item = panier.find(elt => elt.id === id && elt.color === color)
    console.log(item)
    console.log(panier, id, price)
    item.quantity -= 1;
    if (item.quantity < 1) {
        item.quantity = 1;
        let itemIndex = panier.indexOf(element => element.id === id && element.color === color);
        panier.splice(itemIndex, 1);
        localStorage.setItem('panier',JSON.stringify(panier));
        event.target.parentNode.parentNode.parentNode.parentNode.innerHTML = "";
        displayCart(listeProduits);
    }
    console.log(panier);
    document.getElementById("tableau-price-total_" + id+"_"+color).innerHTML= item.quantity * prix + "€";
    document.getElementById("teddy_" +id+"_"+color).innerHTML = item.quantity;
    localStorage.setItem("panier", JSON.stringify(panier));
    total -= prix
    prixTotal(total);
}
