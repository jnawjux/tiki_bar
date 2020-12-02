// General function to clear tabs and sections for tab interface
function clearActive() {
    Array.from(document.getElementsByClassName("tab-select")).forEach(tab => {tab.classList.remove("is-active")})
    Array.from(document.getElementsByClassName('items-section')).forEach(sec => {sec.classList.add("is-hidden")})
}


// Functions for individual tabs
const juiceTab = document.getElementById('juice-tab')

juiceTab.addEventListener("click", function() {
    clearActive()
    juiceTab.classList.add("is-active")
    document.getElementById("juice").classList.remove("is-hidden")
})

const syrupTab = document.getElementById('syrup-tab')

syrupTab.addEventListener("click", function() {
    clearActive()
    syrupTab.classList.add("is-active")
    document.getElementById("syrup").classList.remove("is-hidden")
})

const rumTab = document.getElementById('rum-tab')

rumTab.addEventListener("click", function() {
    clearActive()
    rumTab.classList.add("is-active")
    document.getElementById("rum").classList.remove("is-hidden")
})

const liquorTab = document.getElementById('liquor-tab')

liquorTab.addEventListener("click", function() {
    clearActive()
    liquorTab.classList.add("is-active")
    document.getElementById("liquor").classList.remove("is-hidden")
})

const fruitLiqTab = document.getElementById('fruit-liq-tab')

fruitLiqTab.addEventListener("click", function() {
    clearActive()
    fruitLiqTab.classList.add("is-active")
    document.getElementById("fruit-liq").classList.remove("is-hidden")
})

const bittersTab = document.getElementById('bitters-tab')

bittersTab.addEventListener("click", function() {
    clearActive()
    bittersTab.classList.add("is-active")
    document.getElementById("bitters").classList.remove("is-hidden")
})


// Current ingredient, drink section, buttons, exactness selector
const drinks = document.getElementById('drinkBox')
const currentIngredients = document.getElementById('currentIngredients')
const allButtons = document.getElementsByTagName("button")
const exSelect = document.getElementById("exSelect")

// Function to update buttons when re-launching app
async function loadState() {
    let currentActive = await eel.get_ingredients()()
    Array.from(allButtons).forEach(b => {
        currentActive.forEach(activeIng => {
            if (b.textContent == activeIng) {
                b.classList.toggle("on-hand")
            }
        })
        
    })
}



// Function for removing children
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Function for updating ingredient list
async function updateOnHand(button) {
    let current = await eel.update_ingredients(button.textContent)()
    console.log(current)
    
}

// Function for getting current exactness setting
function howExact() {
    let exact = 0
    let options = document.getElementsByTagName("option")
    Array.from(options).forEach(op => {if (op.selected) {exact = parseInt(op.textContent)}})
    return exact
}

// Function for updating drinks that can be made
async function makeIt(exact) {
    let data = await eel.what_can_i_make(exact)()
    drinks.textContent = "" //if (drinks.hasChildNodes()) {removeAllChildNodes(drinks)}
    data.forEach(d => {
            let newDrink = document.createElement('div')
            let title = document.createElement('h2')
            let ingredients = document.createElement('p')
            let page = document.createElement('span')
            newDrink.classList.add('drink', 'animate__animated', 'animate__bounceIn')
            title.classList.add('drink-title')
            page.classList.add('is-italic')
            title.innerText = d.name
            ingredients.innerText = d.ingredients + "\n"
            page.innerText = d.steps
            newDrink.appendChild(title)
            newDrink.appendChild(ingredients)
            newDrink.appendChild(page)
            drinks.appendChild(newDrink)})
}

// Add functions for button to update ingredients and update drinks

Array.from(allButtons).forEach(b => 
    {b.addEventListener("click", 
        function() {
            b.classList.toggle("on-hand")
            updateOnHand(b)
            makeIt(howExact())
            })})


// Add function to exactness to update when changed
exSelect.addEventListener("change", 
        function() {
            makeIt(howExact())
    }
)