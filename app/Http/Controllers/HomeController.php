<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $pokemonTypes = Type::all()->pluck('name', 'id');
        $pokemonTypes->prepend('All', 0);

        return Inertia::render('Pokedex', [
            'appName' => config('app.name'),
            'pokemonTypes' => $pokemonTypes,
        ]);
    }
}
