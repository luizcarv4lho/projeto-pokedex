/*Ao atualizar o browser, o browser ira definir as variaveis abaixo */
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 5
let offset = 0;







function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

        

        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
        
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        ${pokemon.statsNames.map((statsNames) => `<li id="statsNames" class="type ${statsNames}">${statsNames}</li>`).join('')}
                        ${pokemon.stats.map((stat) => `<li id="stats" class="type ${stat}">${stat}</li>`).join('')}
                    </ol>
        
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
        
                </div>
            </li>
            `).join('')//Pegou a lista de pokemons, mapeia a lista(converte) para uma lista de li e o Join concatena essas lista sem separador nenhum e concatena ao html pelo inner html

        pokemonList.innerHTML += newHtml
    })
}



loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtRecordsWithNextPage = offset + limit

    if (qtRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }

})




