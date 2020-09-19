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
        toto(data);
    }).catch(function(error) {
        console.log(error);
    })
;

function toto(teddies){
    const panierJSON = localStorage.getItem("panier");
    let panier = [];
    if (panierJSON !== null) {
        panier = JSON.parse(panierJSON);
        let total = 0;
        let prixTotal = document.createElement("p");
        b.append(prixTotal);
        for (let item of panier) {
            let teddy = teddies.find(element => element._id === item.id)
            console.log("teddy", teddy);
            function addPrice() {
                let priceUnitaire = teddy.price;
                let prixCumule = priceUnitaire * item.quantity;
                price.innerHTML = prixCumule + "€";

                return prixCumule;
            }
            let tata = document.createElement("tr");
            b.append(tata);
            let toto = document.createElement("td");
            let titi = document.createElement("td");
            let price = document.createElement("td");
            let icon = document.createElement("td");
            let img = document.createElement("img");
            let ligne_supp = document.createElement("td");
            let quantity = document.createElement("td");
            let ligne_ajout = document.createElement("td");
            let supprimer = document.createElement("button");
            let ajouter = document.createElement("button");
            tata.append(toto);
            tata.append(titi);
            tata.append(price);
            tata.append(icon);
            tata.append(ligne_supp);
            tata.append(quantity);
            tata.append(ligne_ajout);
            icon.append(img);
            ligne_supp.append(supprimer)
            ligne_ajout.append(ajouter)
            titi.innerHTML = item.color;
            toto.innerHTML = teddy.name;
            quantity.innerHTML = item.quantity;
            price.innerHTML = teddy.price + "€";
            total += teddy.price;
            img.src = teddy.imageUrl;
            ajouter.innerHTML = "+";
            supprimer.innerHTML = "-";
            supprimer.setAttribute("class", "btn btn-danger");
            supprimer.setAttribute("click", "test");
            ajouter.setAttribute("class", "btn btn-primary");
            supprimer.addEventListener("click", function(){
                item.quantity -= 1
                quantity.innerHTML = item.quantity;
                localStorage.setItem("panier", JSON.stringify(panier));
                total -= addPrice();
            });
            ajouter.addEventListener("click", (e) => {
                item.quantity += 1
                quantity.innerHTML = item.quantity;
                localStorage.setItem("panier", JSON.stringify(panier));
                total += addPrice();
                console.log(item);
            });
            img.setAttribute("class", "col-12 col-md-5")
            tata.setAttribute("class", "border d-flex align-items-center justify-content-around");
            toto.setAttribute("class", "pl-2 pr-2");
            titi.setAttribute("class", "pl-2 pr-2");
            icon.setAttribute("class", "w-25");
            quantity.setAttribute("class", "bg-secondary d-flex justify-content-center rounded-circle pt-md-2 pb-md-2 pl-1 pr-1 pl-md-3 pr-md-3");
        }
        prixTotal.innerHTML = total;
    }
    document.getElementById("button").addEventListener("click", function(){
        var input = document.getElementById("name").value;
        var toto = document.getElementById("email").value;
        // Afficher la valeur
        console.log(input);
        console.log(toto);
        lien.setAttribute("href", "confirmation.html?name=" +input + "&email="  +toto);
    });
    console.log(panier);
}