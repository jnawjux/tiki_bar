
// General function to clear tabs and sections for tab interface
function clearActive() {
    Array.from(document.getElementsByClassName("tab-select")).forEach(tab => {tab.classList.remove("is-active")})
    Array.from(document.getElementsByClassName('ingredient-section')).forEach(sec => {sec.classList.add("is-hidden")})
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


// Current ingredient and drink section
const drinks = document.getElementById('drinkBox')
const currentIngredients = document.getElementById('currentIngredients')


// Function for removing children
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


// Buttons

const allButtons = document.getElementsByTagName("button")

Array.from(allButtons).forEach(b => 
    {b.addEventListener("click", 
        function() {
            b.classList.toggle("is-success")
            let postUrl = 'http://127.0.0.1:8000/on_hand/' + b.textContent.replace(" ", "%20")
            fetch(postUrl, {method: "POST"})
                .then(res => res.json())
                .then(data =>  currentIngredients.innerText = data.join(", "))
            let exact = 0
            let exSelect = document.getElementById("exSelect")
            let options = document.getElementsByTagName("option")
            Array.from(options).forEach(op => {if (op.selected) {exact = parseInt(op.textContent)}})
            let getUrl = 'http://127.0.0.1:8000/can_make/' + exact
            fetch(getUrl)
                .then(res => res.json())
                .then(data => {
                    drinks.textContent = "" //if (drinks.hasChildNodes()) {removeAllChildNodes(drinks)}
                    console.log(data)
                    data.forEach(d => {
                            let newDrink = document.createElement('div')
                            let title = document.createElement('h2')
                            let ingredients = document.createElement('p')
                            let page = document.createElement('span')
                            newDrink.classList.add('drink')
                            title.classList.add('is-size-3')
                            page.classList.add('is-italic')
                            title.innerText = d.name
                            ingredients.innerText = d.ingredients + "\n"
                            page.innerText = d.steps
                            newDrink.appendChild(title)
                            newDrink.appendChild(ingredients)
                            newDrink.appendChild(page)
                            drinks.appendChild(newDrink)})
                    }
                    )
            })})


