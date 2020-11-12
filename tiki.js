
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

// Buttons

const allButtons = document.getElementsByTagName("button")

Array.from(allButtons).forEach(b => {b.addEventListener("click", function() {
    b.classList.toggle("is-success")
    fetch('http://127.0.0.1:8000/on_hand/', {
        method: 'POST',
        body: JSON.stringify(b.textContent)
    }).then(res => res.json())
    .then(data =>  console.log(data))
})})

