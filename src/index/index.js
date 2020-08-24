import _ from 'lodash';
import './../style.scss';

let b = document.body;
let bloc = document.createElement("div");
bloc.setAttribute("id", "toto");
b.append(bloc);

let test = document.getElementById("test");
test.append(bloc)

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        for (var i in response) {
            let lien = document.createElement("a");
            let blocIcon = document.createElement("div");
            let icon = document.createElement("img");
            let price = document.createElement("p");
            icon.src = response[i].imageUrl;
            price.innerHTML = response[i].price + " €";
            blocIcon.append(price);
            blocIcon.append(icon);
            lien.append(blocIcon);
            bloc.append(lien);
            console.log(response[i]);
            icon.setAttribute("id", "icon");
            lien.setAttribute("href", "produit.html");
            lien.setAttribute("id", "lien");
            blocIcon.setAttribute("id", "blocIcon");
            price.setAttribute("id", "price")
        } 
        console.log(response);
    }
}
request.open("GET", "http://localhost:3000/api/teddies");
request.send();

console.log("index.js");