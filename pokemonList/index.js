const searchId = document.getElementById("searchName")
const btn = document.getElementById("search")
const addBtn = document.getElementById("addData")
const delBtn = document.getElementById("deleteData")
const pokemonName = document.getElementById("name")
const img = document.getElementById("pokemonSprite")
const listData = document.getElementById("listData")
const list = []

btn.addEventListener("click", fetchData)
addBtn.addEventListener("click", addList)
delBtn.addEventListener("click", delList)

async function fetchData() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${searchId.value}`)
    if (!response.ok) {
        pokemonName.textContent = "沒有這隻神奇寶貝"
        img.src = ""
        img.style.display = "none"
        throw new Error("抓不到這支id")
    }
    try {
        const data = await response.json()
        const pokemonSprite = await data.sprites.versions["generation-viii"]["brilliant-diamond-shining-pearl"].front_default;
        pokemonName.textContent = data.name
        img.src = pokemonSprite
        img.style.display = "block"

    } catch (error) {
        console.error(error);
    }
}

function addList() {
    if (img.style.display === "none") {
        pokemonName.textContent = "沒有神奇寶貝可以新增"
        return
    }
    try {
        list.push({ pokemonName: pokemonName.textContent, imgUrl: img.src })
        render()
    } catch (error) {
        console.error(error);
    }
}

function delList() {
    list.pop()
    render()
}



function render() {
    let htmlStr = ''
    list.forEach(function (item) {
        htmlStr = htmlStr + `<div class="data">
            <div>
                <p>${item.pokemonName}</p>
                <img src="${item.imgUrl}" alt="pokemon sprite" style="display: block">
            </div>
        </div>`
    })
    listData.innerHTML = htmlStr
}
