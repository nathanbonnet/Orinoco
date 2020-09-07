import _ from 'lodash';
import './../style.scss';

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
console.log(id);

const panierJSON = localStorage.getItem("panier");
let panier = [];
if (panierJSON !== null) {
    panier = JSON.parse(panierJSON);
}
console.log(panier)
panier.forEach(produit => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            
            console.log(response, produit.color);
        }
    }
    request.open("GET", "http://localhost:3000/api/teddies/" +produit.id);
    request.send();
});



console.log("panier.js");