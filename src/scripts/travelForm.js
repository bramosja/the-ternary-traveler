import data from "./data";

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
        let placeLabel = document.createElement("label")

        // button that will allow the new place to be added
        let saveButton = document.createElement("button")

        // add classes for eventual styling
        formContainer.classList.add("form--container")
        saveButton.classList.add("save--button")

        // set the text for the form labels and button
        newPointLabel.textContent = "Name:";
        newDescriptionLabel.textContent = "Description:";
        newCostLabel.textContent = "Cost:";
        placeLabel.textContent = "Place";
        saveButton.textContent = "Save"

        // create dropdown list options for the Places
        newPointPlace.setAttribute("name", "places");
        let placeName = "places";
        data.getData(placeName)
            .then(allPlaces => {
                allPlaces.forEach(place => {
                    let item = document.createElement("option");
                    let name = place.name;
                    item.setAttribute("value", name);
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
    }
}

export default travelForm;