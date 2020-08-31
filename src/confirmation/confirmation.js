import _ from 'lodash';
import './../style.scss';

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
console.log(id);
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        
        console.log(response);
    }
}
request.open("GET", "http://localhost:3000/api/teddies/" +id);
request.send();


console.log("confirmation.js");