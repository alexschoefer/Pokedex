function getPokemonCardTemplate(pokemonData,index) {
    return `
        <div class="pokemon-card">
            <div class="pokemon-information">
                <span>#${pokemonData[index].id}</span>
                <h1>${pokemonData[index].name}</h1>
            </div>
            <div class="pokemon-img-container">
                <img class="pokemon-img" src="${pokemonData[index].sprites.other['official-artwork'].front_default}" alt="pokemon-img">
            </div>
            
        </div>
    
    `
}