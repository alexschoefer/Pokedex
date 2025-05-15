
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
                        <img onclick="openPokemonOverlayDetails(${index})" class="pokemon-img" src="${pokemonData[index].sprites.other['official-artwork'].front_default}" alt="pokemon-img">
                    </div>
                    <div class="pokemon-type">
                        ${typesHTML}
                    </div>
            </div>
        `;
    }


    function getPokemonOverlayTemplate(index) {
        const typesHTML = pokemonData[index].types.map(t => {
            return `<img class="${t.type.name}" src="./assets/icons/${t.type.name}.svg" alt="${t.type.name}">`;
        }).join('');

        return `
            <div class="pokemon-overlay">
                <div class="pokemon-card-overlay">
                    <div class="close-button-container">
                        <img onclick="closePokemonOverlayDetails()" id="overlay-close-button" src="./assets/icons/delete.png" alt="close-button">
                    </div>
                    <div class="pokemon-information">
                        <span>#${pokemonData[index].id}</span>
                        <h1>${pokemonData[index].name.toUpperCase()}</h1>
                    </div>
                    <div class="${pokemonData[index].types[0].type.name} pokemon-img-overlay">
                        <img src="${pokemonData[index].sprites.other['official-artwork'].front_default}" alt="pokemon-img">
                    </div>
                     <div class="pokemon-type">
                        ${typesHTML}
                    </div>
                    <div class="pokemon-properties">
                        <div class="pokemon-main-facts ${pokemonData[index].types[0].type.name}">
                                <h2>main facts</h2>
                            <div>
                                <span>Height: ${(pokemonData[index].height/10).toFixed(1).concat(" m")}<span>
                                <span>Weight: ${(pokemonData[index].weight/10).toFixed(1).concat(" kg")}</span>
                                <span>Base experience: ${pokemonData[index].base_experience}</span>
                            </div>
                        </div>
                        <div class="pokemon-details">
                            <div>
                                <h2 id="stats">stats</h2>
                            </div>
                                                    <div>
                                <h2>evo chain</h2>
                            </div>
                        </div>
                        <div class="base_stats_container">
                            <table>
                                    <tr>
                                        <td>hp</td>
                                        <td>${pokemonData[index].stats[0].base_stat}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>attack</td>
                                        <td>${pokemonData[index].stats[1].base_stat}</td>
                                    </tr>
                                                                        <tr>
                                        <td>defense</td>
                                        <td>${pokemonData[index].stats[2].base_stat}</td>
                                    </tr>
                                                                        <tr>
                                        <td>special-attack</td>
                                        <td>${pokemonData[index].stats[3].base_stat}</td>
                                    </tr>
                                    <tr>
                                        <td>special-defense</td>
                                        <td>${pokemonData[index].stats[4].base_stat}</td>
                                    </tr>
                                    <tr>
                                        <td>speed</td>
                                        <td>${pokemonData[index].stats[5].base_stat}</td>
                                    </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `
    }