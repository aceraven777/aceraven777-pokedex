import axios from 'axios';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import DropdownSelect from '@/Components/DropdownSelect';
import Pokemon from '@/Components/Pokemon';
import React, {Component} from 'react'

export default class Pokemons extends Component {
	constructor() {
		super();

		this.state = {
            pokemons: [],

            name: '',
            type: 'All',
            page: 1,
            lastPage: null,

            ajaxController: null,
        };
	}

    componentDidMount() {
        this.getPokemons();
     }

    getPokemons = () => {
        // If previous ajax is still in-progress, abort the previous ajax
        if (this.state.ajaxController !== null) {
            this.state.ajaxController.abort();
        }

        const tempAjaxController = new AbortController();

        this.setState({
            'ajaxController': tempAjaxController,
        });

        axios.get(route('pokemons.index'), {
            signal: tempAjaxController.signal,
            params: {
                page: this.state.page,
                name: this.state.name,
                type: this.state.type,
            }
        }).then((response) => {
            this.setState({
                'lastPage': response.data.last_page,
                'pokemons': [...this.state.pokemons, ...response.data.data],
            });
        }).finally(() => {
            this.setState({
                'ajaxController': null, 
            });
        });
    }

    nameChanged = (e) => {
        this.setState({
            'pokemons': [],
            'page': 1,
            'name': e.target.value
        });

        setTimeout(() => {
            this.getPokemons();
        }, 0);
    }

    typeChanged = (e) => {
        this.setState({
            'pokemons': [],
            'page': 1,
            'type': e.target.value
        });
        
        setTimeout(() => {
            this.getPokemons();
        }, 0);
    }

    nextPage = (e) => {
        this.setState({
            'page': this.state.page + 1,
        });
        
        setTimeout(() => {
            this.getPokemons();
        }, 0);
    }

    nextButton() {
        // If there's next page
        if (this.state.page < this.state.lastPage) {
            return (
                <PrimaryButton onClick={this.nextPage}>See More Pokemons</PrimaryButton>
            );
        }

        // Hide button if there are no more pokemons to show
        return null;
    }

    bottomSection() {
        if (this.state.pokemons.length == 0) {
            return (
                <>
                    <h1 className="mt-16">No pokemons found.</h1>
                </>
            );
        }

        return (
            <>
                <div className="mt-16 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {this.state.pokemons.map((pokemon, index) => {
                            return (
                                <Pokemon key={index} pokemon={pokemon} />
                            );
                        })}
                    </div>
                </div>

                {this.state.ajaxController === null ?
                        this.nextButton()
                    : (
                        <img src="/images/loader.svg" />
                    )
                }
            </>
        );
    }

	render() {
		return (
			<>
                <form className="sm:flex sm:justify-center sm:items-center" onSubmit={(e) => {e.preventDefault();}}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-end">
                        <div>
                            <InputLabel htmlFor="pokemon-name">
                                Search by Pokemon Name
                            </InputLabel>
                            <TextInput
                                id="pokemon-name"
                                name="name"
                                onChange={this.nameChanged}
                                value={this.state.name}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="pokemon-type">
                                Search by Pokemon Type
                            </InputLabel>
                            <DropdownSelect
                                id="pokemon-type"
                                name="type"
                                onChange={this.typeChanged}
                                options={this.props.pokemonTypes}
                                value={this.state.type}
                            />
                        </div>
                    </div>
                </form>

                {this.bottomSection()}
            </>
		);
	}
}