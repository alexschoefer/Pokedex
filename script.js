let pokemons = [];
let pokemonData = [];
let limit = 20;

async function init() {
    showLoadingSpinner();
    document.body.classList.add('no-scroll');
    await getPokemonsByFetch(limit);
    await getPokemonsDataByFetch();
    renderPokemonCards();
    setTimeout(() => {
        hideLoadingSpinner();
        document.body.classList.remove('no-scroll');
    }, 2000);
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

async function renderPokemonCards() {
    let contentRef = document.getElementById('main-content');
    contentRef.innerHTML = "";
    for (let index = 0; index < pokemonData.length; index++) {
        contentRef.innerHTML += getPokemonCardTemplate(pokemonData, index);
    }
}

async function loadMorePokemons() {
    showLoadingSpinner();
    document.body.classList.add('no-scroll');
    offset = pokemonData.length;
    try {
        let Basic_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        let response = await fetch(Basic_URL);
        let data = await response.json();
        pokemons = data.results;
        await getPokemonsDataByFetch();
        renderPokemonCards();
    } catch (error) {
        console.error("Error by loading pokemons");
    }
    setTimeout(() => { hideLoadingSpinner();
        document.body.classList.remove('no-scroll');
    }, 2000);
}

async function getEvoChainByFetch(pokemon) {
    try {
        const Basic_URL_EvoChain = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`;
        let response = await fetch(Basic_URL_EvoChain);
        let speciesData = await response.json();
        let evoChainUrl = speciesData.evolution_chain.url;
        getEvoChainData(evoChainUrl);
    } catch (error) {
        console.error("Error by loading pokemon species data:", error);
    }

}

async function getEvoChainData(evoChainUrl) {
    const flatChain = [];
    try {
        const response = await fetch(evoChainUrl);
        const data = await response.json();
        let current = data.chain;
        while (current) {
            flatChain.push(current.species.name);
            if (current.evolves_to.length > 0) {
                current = current.evolves_to[0];
            } else {
                current = null;
            }
        }
    } catch (error) {
        console.error("Fehler beim Holen der Evolutionskette:", error);
    }
    renderEvoChain(flatChain);
}

function openPokemonOverlayDetails(index) {
    let pokemonOverlayRef = document.getElementById('pokemon-overlay');
    pokemonOverlayRef.innerHTML = "";
    pokemonOverlayRef.classList.remove('d_none');
    document.body.classList.add('no-scroll');
    pokemonOverlayRef.innerHTML += getPokemonOverlayTemplate(index);
    let pokemon = pokemonData[index].name;
    getEvoChainByFetch(pokemon);
    pokemonOverlayRef.onclick = function (event) {
        if (event.target.id === 'pokemon-overlay') {
            closePokemonOverlayDetails();
        }
    };
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
    getPokemonStatsRef.classList.add('d_none');
    getEvoChainContentRef = document.getElementById('evo-chain-container');
    getEvoChainContentRef.classList.remove('d_none');
    getStatRef = document.getElementById('stats');
    getStatRef.classList.remove(`${pokemonData[index].types[0].type.name}-underline`);
}

function renderEvoChain(flatChain) {
    let evoChainRef = document.getElementById('evo-chain-container');
    evoChainRef.innerHTML = "";
    for (let index = 0; index < flatChain.length; index++) {
        let template = getEvoChainTemplate(flatChain[index]);
        evoChainRef.innerHTML += template;

        if (index < flatChain.length - 1) {
            evoChainRef.innerHTML += getArrowTemplate();
        }
    }
}

function switchFromEvoChainToStats(index) {
    getEvoChainRef = document.getElementById('evo-chain');
    getEvoChainRef.classList.remove(`${pokemonData[index].types[0].type.name}-underline`);
    getPokemonStatsRef = document.getElementById('pokemon-stats-container');
    getPokemonStatsRef.classList.remove('d_none');
    getEvoChainContentRef = document.getElementById('evo-chain-container');
    getEvoChainContentRef.classList.add('d_none');
    getStatRef = document.getElementById('stats');
    getStatRef.classList.add(`${pokemonData[index].types[0].type.name}-underline`);
}

function filterAndSearchPokemons() {
    const searchValue = document.getElementById('input-search').value.toLowerCase();
    if (searchValue.length >= 3) {
        let filteredPokemons = pokemonData.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchValue)
        );
        renderFilteredPokemons(filteredPokemons);
    } else {
        renderPokemonCards();
    }
}

function startPokemonNavigaton(index) {
    if (index == pokemonData.length) {
        index = (index + pokemonData.length) % pokemonData.length;
    } else if (index < 0) {
        index = (index + pokemonData.length) % pokemonData.length;
    }
    openPokemonOverlayDetails(index);
}

function showLoadingSpinner() {
    document.getElementById('loading-spinner').classList.remove('d_none');
}

function hideLoadingSpinner() {
    document.getElementById('loading-spinner').classList.add('d_none');
}