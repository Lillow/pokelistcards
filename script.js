const poke_container = document.getElementById('poke_container');
const pokemons_number = 151;
const colors = {
    fire: '#f08030',
    grass: '#22c02a',
    electric: '#f8d030',
    water: '#6890f0',
    ground: '#e0b668',
    rock: '#b8a038',
    fairy: '#f09ad9',
    poison: '#a040a0',
    bug: '#9cb820',
    dragon: '#7038f8',
    psychic: '#f75787',
    flying: '#9096f0',
    fighting: '#c03028',
    normal: '#a8a8a8',
    ghost: '#705898',
    steel: '#6d8f9c',
    dark: '#504843',
    ice: '#98d8d8'
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemons_number; i++) {
        await getPokemon(i);
    }
};

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
};

function gradient(color1, color2) {
    // lógica para criar gradient (incompleta)

    return color1;
}

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const poke_types = pokemon.types.map((type) => type.type.name);
    const type = main_types.find((type) => poke_types.indexOf(type) > -1);
    let type2 = main_types.find((type) => poke_types.indexOf(type) > 0);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];
    const color2 = colors[type2];

    if (type2 == null || type2 == type) {
        type2 = '';

        pokemonEl.style.backgroundColor = color;
    } else {
        pokemonEl.style.backgroundColor = gradient(color, color2);
        type2 = ' | ' + type2;
    }

    const pokeInnerHTML = `
        <div class="img-container">
        <img src="${pokemon.sprites.other.home.front_default}"/>
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
                .toString()
                .padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
            <small class="type">${type2}</span></small>
        </div>
    `;

    pokemonEl.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokemonEl);
}

fetchPokemons();
