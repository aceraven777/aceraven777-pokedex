import Pokemons from '@/Components/Pokemons';
import { Head } from '@inertiajs/react';

export default function Pokedex({ appName, pokemonTypes }) {
    return (
        <>
            <Head title={'Welcome to ' + appName} />

            <div className="relative min-h-screen">
                <div className="max-w-7xl mx-auto p-6 lg:p-8 text-center">
                    <Pokemons pokemonTypes={pokemonTypes} />
                </div>
            </div>
        </>
    );
}
