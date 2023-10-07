export default function Pokemon({ pokemon, className = '', ...props }) {
    const getPokemonType = (types_obj) => {
        let types = [];

        for (let i = 0; i < types_obj.length; i++) {
            types.push(types_obj[i].name);
        }

        return types.join(', ');
    };

    return (
        <>
            <div {...props} className={`bg-orange-400 p-10 flex flex-col items-center justify-center font-medium text-center text-sm text-gray-700 ` + className}>
                <img className="pokemon-img mb-5" src={'/images/pokemons/' + pokemon.image} />
                <h2 className="m-0"><strong>Name:</strong> {pokemon.name}</h2>
                <p className="m-0"><strong>Type:</strong> {getPokemonType(pokemon.types)}</p>
            </div>

            <style>{`
            .pokemon-img {
                max-width: 100px;
            }
            `}</style>
        </>
    );
}
