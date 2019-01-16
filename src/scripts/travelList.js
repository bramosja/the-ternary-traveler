import travelForm from "./travelForm"
import data from "./data";
import eventListeners from "./eventListeners";

const travelList = {
    addToDOM(){
        let outputContainer = document.querySelector(".output");
        outputContainer.innerHTML = ""

        let docFrag = document.createDocumentFragment();

        // create page title
        let titleSection = document.createElement("header");
        let title = document.createElement("h1");
        title.textContent = "Points of Interest";
        titleSection.appendChild(title);

        // append title to document fragment
        docFrag.appendChild(titleSection);

        outputContainer.appendChild(docFrag);
        // add point of interest form to the top of the page
        travelForm.newPlaceOfInterest()

        let fragment = document.createDocumentFragment();

        let pageContainer = document.createElement("div");
        pageContainer.classList.add("dataContainer");

        let placeString = "places"

        data.getData(placeString)
            .then(allPlaces => {
                allPlaces.forEach(place => {
                    let outputInfo = document.querySelector(".dataContainer")

                    // Grab information that will be used as text content and id
                    let placeId = place.id;
                    let placeName = place.name;

                    // create the headings for the places and assign text
                    let placeEl = document.createElement("h2");
                    placeEl.textContent = placeName;

                    // create the div that will hold the heading and the respective POIs
                    let placeCont = document.createElement("div");
                    placeCont.setAttribute("id", `place--${placeId}`);

                    placeCont.appendChild(placeEl);
                    outputInfo.appendChild(placeCont);
                })
            })

        let interests = "interests?_expand=place"

        data.getData(interests)
            .then(allInterests => {
                allInterests.forEach(interest => {
                    let documentFragment = document.createDocumentFragment();

                    let interestDiv = document.createElement("div");
                    interestDiv.setAttribute("id", `div--${interest.id}`)

                    let interestPlace = interest.place.id;
                    let interestName = interest.name;
                    let interestDescription = interest.description;
                    let interestCost = interest.cost;
                    let interestId = interest.id

                    let interestPlaceEl = document.createElement("h4");
                    let interestDescriptionEl = document.createElement("p");
                    let interestCostEl = document.createElement("p");
                    let editButton = document.createElement("button");

                    editButton.setAttribute("id", interestId)
                    editButton.addEventListener("click", () => {
                        let editContainerId = event.target.parentNode.id;
                        let editId = editContainerId.split("--")[1];
                        let dataCode = `interests?id=${editId}&_expand=place`
                        data.getData(dataCode)
                            .then(() => {
                                travelForm.editForm(interestId, interest)
                            })
                    })
                    editButton.textContent = "Edit";
                    interestPlaceEl.textContent = interestName;
                    interestDescriptionEl.textContent = interestDescription;
                    interestCostEl.textContent = interestCost;

                    interestDiv.appendChild(interestPlaceEl);
                    interestDiv.appendChild(interestDescriptionEl);
                    interestDiv.appendChild(interestCostEl);
                    interestDiv.appendChild(editButton);

                    documentFragment.appendChild(interestDiv);

                    let appendLoc = document.querySelector(`#place--${interestPlace}`);
                    appendLoc.appendChild(documentFragment);
                })
            })

        fragment.appendChild(pageContainer);
        outputContainer.appendChild(fragment);
    }
}

export default travelList;