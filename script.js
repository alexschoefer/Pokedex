let pokemons = [];
let pokemonData = [];
let limit = 20;

async function init() {
    showLoadingSpinner();
    preventScroll();
    await getPokemonsByFetch(limit);
    await getPokemonsDataByFetch();
    renderPokemonCards();
    setTimeout(() => {
        hideLoadingSpinner();
        allowScroll();
    }, 2000);
}

async function getPokemonsByFetch(limit) {
    try {
        let Basic_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;
        let response = await fetch(Basic_URL);
        let data = await response.json();
        pokemons = data.results;
    } catch (error) {
        console.error("Error by loading pokemons", error);
    }
}

async function getPokemonsDataByFetch() {
    for (let index = 0; index < pokemons.length; index++) {
        try {
            let response = await fetch(pokemons[index].url);
            let dataPokemon = await response.json();
            pokemonData.push(dataPokemon);
        } catch (error) {
            console.error("Error by loading pokemon data", error);
        }
    }
}

async function renderPokemonCards() {
    let contentRef = document.getElementById('main-content');
    contentRef.innerHTML = "";
    for (let index = 0; index < pokemonData.length; index++) {
        const pokemon = pokemonData[index];
        const pokemonTypes = getPokemonTypeIcons(pokemon);
        contentRef.innerHTML += getPokemonCardTemplate(pokemon, pokemonTypes);
    }
}

function getPokemonTypeIcons(pokemon) {
    return pokemon.types.map(t => {
        return `<img class="${t.type.name}" src="./assets/icons/${t.type.name}.svg" alt="${t.type.name}">`;
    }).join('');
}

async function loadMorePokemons() {
    const button = document.getElementById('load-more-btn');
    button.disabled = true;
    showLoadingSpinner();
    preventScroll();
    const offset = pokemonData.length;

    try {
        let Basic_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        let response = await fetch(Basic_URL);
        let data = await response.json();
        pokemons = data.results;

        await getPokemonsDataByFetch();
        renderPokemonCards();
    } catch (error) {
        console.error("Error by loading pokemons", error);
    } finally {
        hideLoadingSpinner();
        allowScroll();
        button.disabled = false;
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
    preventScroll();
    const pokemonTypes = getPokemonTypeIcons(pokemonData[index]);
    pokemonOverlayRef.innerHTML += getPokemonOverlayTemplate(pokemonTypes, index);
    let pokemon = pokemonData[index].name;
    getEvoChainByFetch(pokemon);
    pokemonOverlayRef.onclick = function (event) {
        if (event.target.id === 'pokemon-overlay') {
            closePokemonOverlayDetails();
        }
    };
}

function openPokemonOverlayDetailsByName(name) {
    const index = pokemonData.findIndex(p => p.name === name);
    if (index !== -1) {
        openPokemonOverlayDetails(index);
    }
}

function bubblingPropagation(event) {
    event.stopPropagation();
}

function closePokemonOverlayDetails() {
    let pokemonOverlayRef = document.getElementById('pokemon-overlay');
    pokemonOverlayRef.classList.add('d_none');
    allowScroll();
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
        const pokemonName = flatChain[index];
        const pokemon = pokemonData.find(p => p.name == pokemonName);
        let template = getEvoChainTemplate(pokemon);
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
        document.getElementById('load-more-btn').classList.add('d_none');
        document.getElementById('btn-reset').classList.remove('d_none');
    } else if(searchValue.length == 0){
        renderPokemonCards();
        document.getElementById('load-more-btn').classList.remove('d_none');
        document.getElementById('btn-reset').classList.add('d_none');
    }
}

function renderFilteredPokemons(filteredList) {
    const contentRef = document.getElementById('main-content');
    contentRef.innerHTML = "";

    if (filteredList.length === 0) {
        contentRef.innerHTML = `<p class="no-search-results">No Pokémon found.</p>`;
        return;
    } else {
        filteredList.forEach((pokemon) => {
            const pokemonTypes = getPokemonTypeIcons(pokemon);
            contentRef.innerHTML += getPokemonCardTemplate(pokemon, pokemonTypes);
        });
    }
}

function resetSearch() {
    document.getElementById('input-search').value = '';
    renderPokemonCards();
    document.getElementById('load-more-btn').classList.remove('d_none');
    document.getElementById('btn-reset').classList.add('d_none');
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

function preventScroll() {
    let preventScrollRef = document.getElementById('main-content');
    preventScrollRef.classList.add('no-scroll');
}

function allowScroll() {
    let allowScrollRef = document.getElementById('main-content');
    allowScrollRef.classList.remove('no-scroll');
}