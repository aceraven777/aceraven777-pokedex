import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import DropdownSelect from '@/Components/DropdownSelect';
import Pokemon from '@/Components/Pokemon';
import Pagination from '@/Components/Pagination';
import { Head, useForm } from '@inertiajs/react';

export default function Pokedex({ appName, filters, pokemons, pokemonTypes }) {
    const { data, setData, errors, put, reset, processing } = useForm({
        name: filters.name,
        type: filters.type,
    });

    const nameChanged = (e) => {
        setData('name', e.target.value);
    };

    const typeChanged = (e) => {
        setData('type', e.target.value);
    };

    return (
        <>
            <Head title={'Welcome to ' + appName} />

            <div className="relative min-h-screen">
                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <form className="sm:flex sm:justify-center sm:items-center" action={route('home.index')}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end">
                            <div>
                                <InputLabel htmlFor="pokemon-name">
                                    Search by Pokemon Name
                                </InputLabel>
                                <TextInput
                                    id="pokemon-name"
                                    name="name"
                                    onChange={nameChanged}
                                    value={data.name}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="pokemon-type">
                                    Search by Pokemon Type
                                </InputLabel>
                                <DropdownSelect
                                    id="pokemon-type"
                                    name="type"
                                    onChange={typeChanged}
                                    options={pokemonTypes}
                                    value={data.type}
                                />
                            </div>

                            <div>
                                <PrimaryButton submit='submit'>Search</PrimaryButton>
                            </div>
                        </div>
                    </form>

                    <div className="mt-16">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                            {pokemons.data.map((pokemon, index) => {
                                return (
                                    <Pokemon key={index} pokemon={pokemon} />
                                );
                            })}
                        </div>
                    </div>

                    <Pagination class="mt-6" links={pokemons.links} />
                </div>
            </div>
        </>
    );
}
