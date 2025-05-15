let pokemons = [];
let pokemonData = [];
let limit = 20;

async function init() {
    await getPokemonsByFetch(limit);
    await getPokemonsDataByFetch();
    renderPokemonCards();
}

async function getPokemonsByFetch(limit) {
    try {
        let Basic_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;
        let response = await fetch(Basic_URL);
        let data = await response.json();        
        pokemons = data.results;       
    } catch (error) {
        console.error("Error by loading pokemons");       
    }
}

async function getPokemonsDataByFetch() {    
    for (let index = 0; index < pokemons.length; index++) {
        let response = await fetch(pokemons[index].url);
        let dataPokemon = await response.json();
        pokemonData.push(dataPokemon);
    }
}

// Alternativ tryCatch Block

// async function getPokemonsDataByFetch() {
//     try {
//         for (let index = 0; index < pokemons.length; index++) {
//             let response = await fetch(pokemons[index].url);
//             let dataPokemon = await response.json();
//             pokemonData.push(dataPokemon);
//         }
//     } catch (error) {
//         console.error("Fehler beim Laden der Pokémon-Daten:", error);
//     }
// }

async function renderPokemonCards() {
    let contentRef = document.getElementById('main-content');
    contentRef.innerHTML = "";
    for (let index = 0; index < pokemonData.length; index++) {
      contentRef.innerHTML += getPokemonCardTemplate(pokemonData, index); 
    }
}


async function loadMorePokemons() {
        limit + 20;
    try {
        let Basic_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${limit}`;
        let response = await fetch(Basic_URL);
        let data = await response.json();        
        pokemons = data.results;
        getPokemonsDataByFetch();
        renderPokemonCards();   
    } catch (error) {
        console.error("Error by loading pokemons");       
    }
}

function openPokemonOverlayDetails(index) {
     let pokemonOverlayRef = document.getElementById('pokemon-overlay');
     pokemonOverlayRef.innerHTML = ""; 
     pokemonOverlayRef.classList.remove('d_none');
     document.body.classList.add('no-scroll');
     pokemonOverlayRef.innerHTML += getPokemonOverlayTemplate(index);
}

function bubblingPropagation(event) {
    event.stopPropagation();
}

function closePokemonOverlayDetails() {
    let pokemonOverlayRef = document.getElementById('pokemon-overlay');
    pokemonOverlayRef.classList.add('d_none');
    document.body.classList.remove('no-scroll');
}