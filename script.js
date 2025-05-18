let pokemons = [];
let pokemonData = [];
let evoChain = [];
let evoChainData = [];
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
        offset = pokemonData.length;
    try {
        let Basic_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        let response = await fetch(Basic_URL);
        let data = await response.json();        
        pokemons = data.results;
        getPokemonsDataByFetch();
        renderPokemonCards();   
    } catch (error) {
        console.error("Error by loading pokemons");       
    }
}

async function getEvoChainByFetch(pokemon) {
    try {
        const Basic_URL_EvoChain = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`;
        let response = await fetch(Basic_URL_EvoChain);
        let speciesData = await response.json();
        let evoChainUrl = speciesData.evolution_chain.url;
        getEvoChainData(evoChainUrl); 
    } catch (error) {
        console.error("Fehler beim Holen der Species-Daten:", error);      
    }

}

async function getEvoChainData(evoChainUrl) {
    try {
        //Laden der aktuellen Evolutionskette
        const response = await fetch(evoChainUrl);
        //Die Antwort vom Server wird in ein JavaScript-Objekt (data) umgewandelt.
        const data = await response.json();
        
        // Leeres Array anlegen, in dem wir später alle Pokémon-Namen der Kette sammeln.
        const flatChain = [];
        let current = data.chain;
        
        while (current) {
            //Die Evolutionskette beginnt beim ersten Pokémon (data.chain.species.name ist z. B. "pichu").
            flatChain.push(current.species.name);
            if (current.evolves_to.length > 0) {
                current = current.evolves_to[0];
                console.log(current);
                
            } else {
                current = null;
            }
        }

        console.log("Flache Evolutionskette:", flatChain);
    } catch (error) {
        console.error("Fehler beim Holen der Evolutionskette:", error);
    }
}


function openPokemonOverlayDetails(index) {
     let pokemonOverlayRef = document.getElementById('pokemon-overlay');
     pokemonOverlayRef.innerHTML = ""; 
     pokemonOverlayRef.classList.remove('d_none');
     document.body.classList.add('no-scroll');
     pokemonOverlayRef.innerHTML += getPokemonOverlayTemplate(index);
     let pokemon = pokemonData[index].name;
     console.log(pokemon);
     
    getEvoChainByFetch(pokemon);
}

function bubblingPropagation(event) {
    event.stopPropagation();
}

function closePokemonOverlayDetails() {
    let pokemonOverlayRef = document.getElementById('pokemon-overlay');
    pokemonOverlayRef.classList.add('d_none');
    document.body.classList.remove('no-scroll');
}

function switchFromStatsToEvoChain(index) {
    getEvoChainRef = document.getElementById('evo-chain');
    getEvoChainRef.classList.add(`${pokemonData[index].types[0].type.name}-underline`);
    getPokemonStatsRef = document.getElementById('pokemon-stats-container');
    getPokemonStatsRef.classList.add('d_none')
    getStatRef = document.getElementById('stats');
    getStatRef.classList.remove(`${pokemonData[index].types[0].type.name}-underline`);
    getEvoChainTemplate();
}


function switchFromEvoChainToStats(index) {
    getEvoChainRef = document.getElementById('evo-chain');
    getEvoChainRef.classList.remove(`${pokemonData[index].types[0].type.name}-underline`);
    getPokemonStatsRef = document.getElementById('pokemon-stats-container');
    getPokemonStatsRef.classList.remove('d_none')
    getStatRef = document.getElementById('stats');
    getStatRef.classList.add(`${pokemonData[index].types[0].type.name}-underline`);
}
