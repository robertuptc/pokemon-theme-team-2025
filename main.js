let button = document.getElementById('pokemon')

button.addEventListener('click', async(e) => {
    e.preventDefault();
    let mainPokemon = getMainPokemon(e);
    let similarPokemons = getSimilarPokemon(mainPokemon);
    let loadMainPokemon = loadPokemon(mainPokemon);
    let loadSimilar = loadSimiarPokemons(similarPokemons)
} )


let getMainPokemon = async(e, pokeNames=null) => {
    let randomNum = Math.floor(Math.random() * (1025 - 1))

    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNames ? pokeNames : randomNum}`)
    let dataForm = await data.json()

    let types = dataForm['types']
    let type = () => {
        let randNum = Math.floor(Math.random() * ((types.length) - 0))
        return types[randNum]['type']['name']
    } 
    let pokemonData = {
        'name':  dataForm['name'],
        'image': dataForm['sprites']['front_default'],
        'type': type()
    }
    return pokemonData
}


const getSimilarPokemon = async(pokemonData) => {
    let data = await pokemonData
    let dataTwo = await fetch(`https://pokeapi.co/api/v2/type/${data['type']}`)
    let dataTwoForm = await dataTwo.json()
    let dataSameTypes = dataTwoForm['pokemon']
    
    let similarPokeList = []
    for (let i = 0; i < 4; i++) {
        let randomNum = Math.floor(Math.random() * ((dataSameTypes.length - 1) - 1))
        let pokeName = dataSameTypes[randomNum]['pokemon']['name']
        let pokeData = await getMainPokemon(pokeName)
        similarPokeList.push(pokeData)
    }
    return similarPokeList

}


const loadPokemon = async(pokemonData) => {
    let data = await pokemonData
    let h1 = document.getElementById('main-poke-name')
    h1.innerHTML = data['name']
    let h3 = document.getElementById('poke-type')
    h3.innerHTML = `Type: ${data['type']}`
    let img = document.getElementById('main-poke-image')
    img.src = data['image']

}

const loadSimiarPokemons = async(pokeData) => {
    let data = await pokeData

    for (i = 0; i < data.length; i++) {
        let div = document.getElementById('container-similar-poke')
        let h1 = document.createElement('h1')
        h1.innerHTML = data[i]['name']
        div.appendChild(h1)

        let img = document.createElement('img')
        img.src = data[i]['image']
        div.appendChild(img)
    }

}