<?php

namespace App\Http\Controllers;

use App\Models\Pokemon;
use App\Models\Type;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        $pokemons = $this->getPokemons($request);
        
        $pokemonTypes = Type::all()->pluck('name', 'id');
        $pokemonTypes->prepend('All', 0);

        return Inertia::render('Pokedex', [
            'appName' => config('app.name'),
            'filters' => [
                'name' => $request->input('name'),
                'type' => $request->input('type'),
            ],
            'pokemons' => $pokemons,
            'pokemonTypes' => $pokemonTypes,
        ]);
    }

    protected function getPokemons(Request $request)
    {
        $query = Pokemon::select('pokemon.*');

        $name = trim($request->input('name'));
        if ($name) {
            $query->where('pokemon.name', 'LIKE', "%{$name}%");
        }

        $type = (int) $request->input('type');
        if ($type) {
            $query->join('pokemon_type', function ($join) use ($type) {
                $join->on('pokemon.id', '=', 'pokemon_type.pokemon_id')
                     ->where('pokemon_type.type_id', $type);
            });
        }

        return $pokemons = $query->with('types')->paginate(30)->withQueryString();
    }
}
