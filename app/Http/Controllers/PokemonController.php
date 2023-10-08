<?php

namespace App\Http\Controllers;

use App\Models\Pokemon;
use Illuminate\Http\Request;

class PokemonController extends Controller
{
    public function index(Request $request)
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

        return $query->with('types')->paginate(30)->withQueryString();
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
