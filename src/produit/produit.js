import _ from 'lodash';
import './../style.scss';

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
console.log(id);

let b = document.body;
let checkbox = document.getElementById("checkbox");
let ajout = document.getElementById("ajout");
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
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
            check.setAttribute("type", "checkbox");
        }
        let test = document.createElement("a");
        let button = document.createElement("button");
        ajout.append(test);
        test.append(button);
        test.setAttribute("href", "panier.html?id=" + response._id);
        button.setAttribute("class", "btn btn-primary");
        button.innerHTML = "ajouter au panier";
    }
}
request.open("GET", "http://localhost:3000/api/teddies/" +id);
request.send();


class panier {
    constructor(name, price, colors) {
        this.name = name;
        this.price = price;
        this.colors = colors;
    }
}

const test = new panier("test", "300", "gris");
console.log(test);

this.setContacts(contacts)

console.log("produit.js");