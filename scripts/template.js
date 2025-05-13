
    function getPokemonCardTemplate(pokemonData, index) {
        // Diese Funktion geht durch alle Typen eines Pokémon (z. B. grass, poison) und erstellt für jeden ein <img>-Element als HTML-String. 
        // Mit .join('') werden die einzelnen Strings zu einem einzigen zusammengefügt, der dann im Template verwendet werden kann.

        const typesHTML = pokemonData[index].types.map(t => {
            return `<img class="${t.type.name}" src="./assets/icons/${t.type.name}.svg" alt="${t.type.name}">`;
        }).join('');
    
        return `
            <div class="pokemon-card">
                    <div class="pokemon-information">
                        <span>#${pokemonData[index].id}</span>
                        <h1>${pokemonData[index].name.toUpperCase()}</h1>
                    </div>
                    <div class="pokemon-img-container ${pokemonData[index].types[0].type.name}">
                        <img class="pokemon-img" src="${pokemonData[index].sprites.other['official-artwork'].front_default}" alt="pokemon-img">
                    </div>
                    <div class="pokemon-type">
                        ${typesHTML}
                    </div>
            </div>
        `;
    }
