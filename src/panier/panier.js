import _ from 'lodash';
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
        for (let item of panier) {
            let teddy = teddies.find(element => element._id === item.id)
            console.log("teddy", teddy);
            let tata = document.createElement("tr");
            b.append(tata);
            let toto = document.createElement("td");
            let titi = document.createElement("td");
            let price = document.createElement("td");
            let icon = document.createElement("td");
            let img = document.createElement("img");
            let ligne_supp = document.createElement("td");
            let ligne_ajout = document.createElement("td");
            let supprimer = document.createElement("button");
            let ajouter = document.createElement("button");
            tata.append(toto);
            tata.append(titi);
            tata.append(price);
            tata.append(icon);
            tata.append(ligne_supp);
            tata.append(ligne_ajout);
            icon.append(img);
            ligne_supp.append(supprimer)
            ligne_ajout.append(ajouter)
            titi.innerHTML = item.color;
            toto.innerHTML = teddy.name;
            price.innerHTML = teddy.price + "€";
            img.src = teddy.imageUrl;
            ajouter.innerHTML = "ajouter";
            supprimer.setAttribute("class", "btn btn-danger");
            ajouter.setAttribute("class", "btn btn-primary");
            supprimer.innerHTML = "supprimer";
            img.setAttribute("class", "col-5")
            tata.setAttribute("class", "border");
            toto.setAttribute("class", "pl-2 pr-2");
            titi.setAttribute("class", "pl-2 pr-2");
            icon.setAttribute("class", "w-25")
        }
    }
    console.log(panier);
}


