

import _, { add } from 'lodash';
import './../style.scss';
// const url = new URL(window.location.href);
// const id = url.searchParams.get("id");
// console.log(id);

// const panierJSON = localStorage.getItem("panier");
// let panier = [];
// if (panierJSON !== null) {
//     panier = JSON.parse(panierJSON);
// }
// console.log(panier)
// panier.forEach(produit => {
//     // var request = new XMLHttpRequest();
//     // request.onreadystatechange = function() {
//     //     if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//     //         var response = JSON.parse(this.responseText);
            
//     //         console.log(response, produit.color);
//     //     }
//     // }
//     // request.open("GET", "http://localhost:3000/api/teddies/" +produit.id);
//     // request.send();
// });




console.log("panier.js");
let b = document.getElementById("main")

fetch('http://localhost:3000/api/teddies/')
    .then(status)
    .then(json)
    .then(function(data) {
        element(data);
    }).catch(function(error) {
        console.log(error);
    })
;

function element(teddies){
    const panierJSON = localStorage.getItem("panier");
    let panier = [];
    if (panierJSON !== null) {
        panier = JSON.parse(panierJSON);
        let total = 0;
        let prixTotal = document.createElement("p");
        prixTotal.id = "totalPrice";
        b.append(prixTotal);
        for (let item of panier) {
            let teddy = teddies.find(element => element._id === item.id)
            console.log("teddy", teddy);
            function addPrice() {
                let priceUnitaire = teddy.price;
                let prixCumule = priceUnitaire * item.quantity;
                tableau_price.innerHTML = prixCumule + "€";

                return prixCumule;
            }
            let tableau = document.createElement("tr");
            b.append(tableau);
            let tableau_name = document.createElement("td");
            let tableau_color = document.createElement("td");
            let tableau_price = document.createElement("td");
            let bloc_tableau_img = document.createElement("td");
            let tableau_img = document.createElement("img");
            let bloc_tableau_supprimer = document.createElement("td");
            let tableau_quantite = document.createElement("td");
            let bloc_tableau_ajouter = document.createElement("td");
            let button_supprimer = document.createElement("button");
            let button_ajouter = document.createElement("button");
            tableau.append(tableau_name);
            tableau.append(tableau_color);
            tableau.append(tableau_price);
            tableau.append(bloc_tableau_img);
            tableau.append(bloc_tableau_supprimer);
            tableau.append(tableau_quantite);
            tableau.append(bloc_tableau_ajouter);
            bloc_tableau_img.append(tableau_img);
            bloc_tableau_supprimer.append(button_supprimer)
            bloc_tableau_ajouter.append(button_ajouter)
            tableau_color.innerHTML = item.color;
            tableau_name.innerHTML = teddy.name;
            tableau_quantite.innerHTML = item.quantity;
            tableau_price.innerHTML = teddy.price + "€";
            total += teddy.price;
            tableau_img.src = teddy.imageUrl;
            button_ajouter.innerHTML = "+";
            button_supprimer.innerHTML = "-";
            button_supprimer.setAttribute("class", "btn btn-danger");
            button_supprimer.setAttribute("click", "test");
            button_ajouter.setAttribute("class", "btn btn-primary");
            button_supprimer.addEventListener("click", function(){
                item.quantity -= 1
                tableau_quantite.innerHTML = item.quantity;
                localStorage.setItem("panier", JSON.stringify(panier));
                total -= addPrice();
                document.getElementById("totalPrice").textContent = total;
            });
            button_ajouter.addEventListener("click", (e) => {
                item.quantity += 1
                tableau_quantite.innerHTML = item.quantity;
                localStorage.setItem("panier", JSON.stringify(panier));
                total += addPrice();
                document.getElementById("totalPrice").textContent = total;
                console.log(item);
            });
            bloc_tableau_img.setAttribute("class", "col-12 col-md-5")
            tableau.setAttribute("class", "border d-flex align-items-center justify-content-around");
            tableau_name.setAttribute("class", "pl-2 pr-2");
            tableau_color.setAttribute("class", "pl-2 pr-2");
            tableau_img.setAttribute("class", "w-25");
            tableau_quantite.setAttribute("class", "bg-secondary d-flex justify-content-center rounded-circle pt-md-2 pb-md-2 pl-1 pr-1 pl-md-3 pr-md-3");
        }
        prixTotal.innerHTML = "prix total: " +total+ "€";
    }
    acheter();
    console.log(panier);
}

function acheter(){
    document.getElementById("button").addEventListener("click", function(){
        var input = document.getElementById("name").value;
        var toto = document.getElementById("email").value;
        // Afficher la valeur
        console.log(input);
        console.log(toto);
        lien.setAttribute("href", "confirmation.html?name=" +input + "&email="  +toto);
    });
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
