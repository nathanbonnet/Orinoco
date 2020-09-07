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
            let toto = document.createElement("tb");
            let titi = document.createElement("tb");
            b.append(tata);
            tata.append(toto);
            tata.append(titi);
            toto.innerHTML = item.color;
            titi.innerHTML = item.id;
            tata.setAttribute("class", "border");
            toto.setAttribute("class", "pl-2 pr-2");
            titi.setAttribute("class", "pl-2 pr-2");
        }
    }
    console.log(panier);
}


