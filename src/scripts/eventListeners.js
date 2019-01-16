import data from "./data"
import travelList from "./travelList";

const eventListeners = {
    saveButtonEvent(){
        let saveButton = document.querySelector(".save--button");

        saveButton.addEventListener("click", function() {
            let type = "interests";

            let obName = document.querySelector("#new--input--name").value;
            let obDesciption = document.querySelector("#new--input--des").value;
            let obCost = document.querySelector("#new--input--cost").value;
            let obPlace = document.querySelector("#new--input--place").value;
            console.log(obName, obDesciption, obCost, obPlace)

            let newPOIObject = {
                name: obName,
                description: obDesciption,
                cost: obCost,
                placeId: obPlace
            };

            data.postData(type, newPOIObject);
            travelList.addToDOM()
        })
    }
}

export default eventListeners;