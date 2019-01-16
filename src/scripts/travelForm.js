import data from "./data";
import eventListeners from "./eventListeners"
import travelList from "./travelList";

const travelForm = {
    newPlaceOfInterest() {
        let container = document.querySelector(".output");

        // create container that will hold all of the form elements
        let formContainer = document.createElement("div");

        // create each form element
        let newPointName = document.createElement("input");
        let newPointDescription = document.createElement("textarea");
        let newPointCost = document.createElement("input");
        let newPointPlace = document.createElement("select");

        // create labels for each form element
        let newPointLabel = document.createElement("label");
        let newDescriptionLabel = document.createElement("label");
        let newCostLabel = document.createElement("label");
        let placeLabel = document.createElement("label");

        // button that will allow the new place to be added
        let saveButton = document.createElement("button");

        // add classes and IDs for eventual styling and value access
        formContainer.classList.add("form--container");
        saveButton.classList.add("save--button");
        newPointName.setAttribute("id", "new--input--name");
        newPointDescription.setAttribute("id", "new--input--des");
        newPointCost.setAttribute("id", "new--input--cost");
        newPointPlace.setAttribute("id", "new--input--place")


        // set the text for the form labels and button
        newPointLabel.textContent = "Name:";
        newDescriptionLabel.textContent = "Description:";
        newCostLabel.textContent = "Cost:";
        placeLabel.textContent = "Place";
        saveButton.textContent = "Save";


        // create dropdown list options for the Places
        newPointPlace.setAttribute("name", "places");
        let placeName = "places";
        data.getData(placeName)
            .then(allPlaces => {
                allPlaces.forEach(place => {
                    let item = document.createElement("option");
                    let name = place.name;
                    let placeId = place.id
                    item.setAttribute("value", placeId);
                    item.textContent = name;

                    newPointPlace.appendChild(item);
                })
            })

        // add the form elements to the form container
        formContainer.appendChild(newPointLabel);
        formContainer.appendChild(newPointName);
        formContainer.appendChild(newDescriptionLabel);
        formContainer.appendChild(newPointDescription);
        formContainer.appendChild(newCostLabel);
        formContainer.appendChild(newPointCost);
        formContainer.appendChild(placeLabel);
        formContainer.appendChild(newPointPlace);
        formContainer.appendChild(saveButton);

        // append form contianer to the page
        container.appendChild(formContainer);
    },
    editForm(interestId, interestToEdit){

        let editNameField = document.createElement("p");
        let editDescriptionField = document.createElement("p");
        let editCostField = document.createElement("p")
        let editPlaceField = document.createElement("p")

        let editPointName = document.createElement("input");
        let editPointDescription = document.createElement("textarea");
        let editPointCost = document.createElement("input");
        let editPointPlace = document.createElement("select");

        let editPointLabel = document.createElement("label");
        let editDescriptionLabel = document.createElement("label");
        let editCostLabel = document.createElement("label");
        let editplaceLabel = document.createElement("label");

        editPointLabel.textContent = "Name:";
        editDescriptionLabel.textContent = "Description:";
        editCostLabel.textContent = "Cost:";
        editplaceLabel.textContent = "Place";

        let editPlaceName = "places"
        data.getData(editPlaceName)
            .then(allPlaces => {
                allPlaces.forEach(place => {
                    let item = document.createElement("option");
                    let name = place.name;
                    let placeId = place.id
                    item.setAttribute("value", placeId);
                    item.textContent = name;

                    editPointPlace.appendChild(item);
                })
            })

        let updateButton = document.createElement("button");
        updateButton.textContent = "Update";

        let editPlaceId = interestToEdit.place.id

        updateButton.addEventListener("click", () => {
            let editedInterest = {
                name: editPointName.value,
                description: editPointDescription.value,
                cost: editPointCost.value,
                placeId: editPlaceId
            }
            data.putData(interestId, editedInterest)
                .then(()=> {
                    travelList.addToDOM()
            })
        })

        editPlaceField.appendChild(editplaceLabel);
        editPlaceField.appendChild(editPointPlace);
        editNameField.appendChild(editPointLabel);
        editNameField.appendChild(editPointName);
        editDescriptionField.appendChild(editDescriptionLabel);
        editDescriptionField.appendChild(editPointDescription);
        editCostField.appendChild(editCostLabel);
        editCostField.appendChild(editPointCost);

        let editForm = document.querySelector(`#div--${interestId}`);
        while(editForm.firstChild){
            editForm.removeChild(editForm.firstChild);
        }
        editForm.appendChild(editPlaceField);
        editForm.appendChild(editNameField);
        editForm.appendChild(editDescriptionField);
        editForm.appendChild(editCostField);
        editForm.appendChild(updateButton);
    }
}

export default travelForm;