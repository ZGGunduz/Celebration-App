import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-819f6-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")


const buttonEl = document.getElementById("publish-button")
const endorsementEl = document.getElementById("endorsements")
const sectionEl = document.getElementById("section")


/* Step 1: EndUser - UI interaction: We need to get the value that user entered, and push the database.
Therefore, we can store and process the data */

buttonEl.addEventListener("click", function() {
    let inputValue = endorsementEl.value
    push(endorsementsInDB, inputValue)
    endorsementEl.value = ""
    
})

/* Step 2: User - Database Interaction: Through using onValue() function, we provide the snapshots of every update. And database keeps updated.
And if a value of textarea is generated, it needs to be pushed to the database */

onValue(endorsementsInDB, function(snapshot) {
    let itemsArray = Object.entries(snapshot.val())
    sectionEl.innerHTML = ""
    for(let i = 0; i < itemsArray.length; i++){
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let itemValue = currentItem[1]
        appendElement(currentItem)
    }
}) 

/* Step 3: We store and processed the data in the Database. Now, we need to configure and manipulate in the document we are working on it. We need to create an innerHTML, and manipulate the document as we add the items. */

/* First, we need to create a function that creates div elements */

function appendElement(item){
    let itemID = item[0]
    let itemValue = item[1]
    let newDiv = document.createElement("div")
    newDiv.textContent = itemValue
    newDiv.className = "new-endorsement";
    sectionEl.appendChild(newDiv)
}