
function getPokemonCardTemplate(pokemon, pokemonTypes) {
    return `
            <div class="pokemon-card">
                    <div class="pokemon-information">
                        <span>#${pokemon.id}</span>
                        <h1>${pokemon.name.toUpperCase()}</h1>
                    </div>
                    <div class="pokemon-img-container ${pokemon.types[0].type.name}">
                        <img onclick="openPokemonOverlayDetailsByName('${pokemon.name}')" class="pokemon-main-img" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="pokemon-img">
                    </div>
                    <div class="pokemon-type">
                        ${pokemonTypes}
                    </div>
            </div>
        `;
}


function getPokemonOverlayTemplate(pokemonTypes,index) {
    return `
            <div class="pokemon-overlay">
                <div onclick="bubblingPropagation(event)" class="pokemon-card-overlay">
                    <div class="close-button-container">
                        <img onclick="closePokemonOverlayDetails()" id="overlay-close-button" src="./assets/icons/delete.png" alt="close-button">
                    </div>
                    <div class="pokemon-information">
                        <span>#${pokemonData[index].id}</span>
                        <h1>${pokemonData[index].name.toUpperCase()}</h1>
                    </div>
                    <div class="${pokemonData[index].types[0].type.name} pokemon-img-overlay">
                        <img class="navigaton-arrow" src="./assets/icons/left-arrow.png" alt="arrow-left" onclick="startPokemonNavigaton(${index - 1})">
                        <img class="pokemon-img" src="${pokemonData[index].sprites.other['official-artwork'].front_default}" alt="pokemon-img">
                        <img class="navigaton-arrow" src="./assets/icons/right-arrow.png" alt="arrow-right" onclick="startPokemonNavigaton(${index + 1})">
                    </div>
                     <div class="pokemon-type">
                        ${pokemonTypes}
                    </div>
                    <div class="pokemon-properties">
                        <div class="pokemon-main-facts ${pokemonData[index].types[0].type.name}">
                                <h2>main facts</h2>
                            <div>
                                <span>Height: ${(pokemonData[index].height / 10).toFixed(1).concat(" m")}</span>
                                <span>Weight: ${(pokemonData[index].weight / 10).toFixed(1).concat(" kg")}</span>
                                <span>Base experience: ${pokemonData[index].base_experience}</span>
                            </div>
                        </div>
                        <div class="pokemon-details">
                            <div>
                                <h2 onclick="switchFromEvoChainToStats(${index})" id="stats" class="${pokemonData[index].types[0].type.name}-underline">stats</h2>
                            </div>
                            <div>
                                <h2 onclick="switchFromStatsToEvoChain(${index})" id="evo-chain">evo chain</h2>
                            </div>
                        </div>
                    </div>

                       <div class="pokemon-stats-container" id="pokemon-stats-container">
                            <div class="pokemon-stats">
                                <div class="stat-name">hp</div>
                                <div class="stat-value">${pokemonData[index].stats[0].base_stat}</div>
                                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar ${pokemonData[index].types[0].type.name}" style="width: ${(pokemonData[index].stats[0].base_stat / 250) * 100}%"></div>
                                </div>
                            </div>

                            <div class="pokemon-stats">
                                <div class="stat-name">attack</div>
                                <div class="stat-value">${pokemonData[index].stats[1].base_stat}</div>
                                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar ${pokemonData[index].types[0].type.name}" style="width: ${(pokemonData[index].stats[1].base_stat / 250) * 100}%"></div>
                                </div>
                            </div>

                            <div class="pokemon-stats">
                                <div class="stat-name">defense</div>
                                <div class="stat-value">${pokemonData[index].stats[2].base_stat}</div>
                                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar ${pokemonData[index].types[0].type.name}" style="width: ${(pokemonData[index].stats[2].base_stat / 250) * 100}%"></div>
                                </div>
                            </div>

                            <div class="pokemon-stats">
                                <div class="stat-name">special-attack</div>
                                <div class="stat-value">${pokemonData[index].stats[3].base_stat}</div>
                                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar ${pokemonData[index].types[0].type.name}" style="width: ${(pokemonData[index].stats[3].base_stat / 250) * 100}%"></div>
                                </div>
                            </div>

                            <div class="pokemon-stats">
                                <div class="stat-name">special-defense</div>
                                <div class="stat-value">${pokemonData[index].stats[4].base_stat}</div>
                                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar ${pokemonData[index].types[0].type.name}" style="width: ${(pokemonData[index].stats[4].base_stat / 250) * 100}%"></div>
                                </div>
                            </div>

                            <div class="pokemon-stats">
                                <div class="stat-name">speed</div>
                                <div class="stat-value">${pokemonData[index].stats[5].base_stat}</div>
                                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar ${pokemonData[index].types[0].type.name}" style="width: ${(pokemonData[index].stats[5].base_stat / 250) * 100}%"></div>
                                </div>
                            </div>
                        </div>
                        <div id="evo-chain-container" class="evo-chain-container d_none"></div>
                    </div>
                </div>
            </div>
        `
}

function getEvoChainTemplate(pokemon) {
        return `
                <div class="evo-chain">
                    <img class="evo-chain-pokemon-img" src="${pokemon.sprites.other['official-artwork'].front_default}">
                    <div class="evo-chain-pokemon-name">${pokemon.name}</div>
                </div>
            `;
    }


function getArrowTemplate() {
    return `
            <div class="evo-chain-arrow">
                <img src="./assets/icons/right.png" alt="Evolves to" class="evo-arrow-img">
            </div>
        `;
}

