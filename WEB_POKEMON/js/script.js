const urlPokeIPI = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=12`;
var last = urlPokeIPI;
var follow = urlPokeIPI;
const pokemonContainer = document.getElementById('pokemon-container');

//Función para traer el listado de pokemon
const fetchPokemons = async (url) => {
    url = url != null ? url : "" 
    if (url.includes("null") || url == "") {
        url = urlPokeIPI
    }
    const response = await fetch(url);
    const data = await response.json();
    last = data.previous;
    follow = data.next;
    return data.results;
}

//Función para traer los detalles de un pokemon
async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    return await response.json();
}

async function displayPokemons(url) {
    const pokemons = await fetchPokemons(url);
    const divCards = pokemonContainer.querySelectorAll('.pokemon-card');
    divCards.forEach(div => div.remove());
    //Traer los detalles de cada pokemon y crear la respectiva card
    for (const pokemon of pokemons) {
        const details = await fetchPokemonDetails(pokemon.url);
        details.name = details.name.toUpperCase();
        createPokemonCard(details);
    }
}

function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    card.innerHTML = `
        <div class="card-header">
            <h2>${pokemon.name}</h2>
        </div>
        <div class="card-body">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>ID: ${pokemon.id}</p>
            <p>Altura: ${pokemon.height}</p>
            <p>Peso: ${pokemon.weight}</p>
        </div>
    `;

    pokemonContainer.appendChild(card);
}
const back = () => {
    displayPokemons(last);
};
const forward = () => {
    displayPokemons(follow);
}; 
//Llamar al método que carga el listado
displayPokemons();