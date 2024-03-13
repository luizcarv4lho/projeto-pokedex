
const pokeApi = {}



function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    const stats = pokeDetail.stats.map((statsPokemons) => statsPokemons.base_stat)
    const [stat] = stats

    pokemon.stats = stats
    pokemon.stat = stat

    const statsNames = pokeDetail.stats.map((statsNamePokemons) => statsNamePokemons.stat.name)
    const [statName] = statsNames

    pokemon.statsNames = statsNames
    pokemon.statName = statName

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())   
        .then(convertPokeApiDetailToPokemon) 
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results) //jsonBody está recebendo o Array de resultados; //!!!!!!!! O QUE VAI PARA O SEGUNDO THEN É SEMPRE O RETORNO DO PRIMEIRO!!!!!!!!!!!!
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    
}


