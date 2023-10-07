<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Pokemon;
use App\Models\Type;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $pokedex = $this->readFile();
        $this->truncateTables();

        $types = [];

        foreach ($pokedex as $pokemon) {
            $image_name = str_pad($pokemon['id'], 3, '0', STR_PAD_LEFT) . '.png';

            $pokemon_obj = Pokemon::create([
                'name' => $pokemon['name']['english'],
                'image' => $image_name,
            ]);

            $types = array_merge($types, $pokemon['type']);
            $types = array_unique($types);

            foreach ($pokemon['type'] as $type) {
                if (! isset($types[$type])) {
                    $types[$type] = Type::create([
                        'name' => $type,
                    ]);
                }

                $pokemon_obj->types()->attach($types[$type]->id);
            }
        }
    }

    protected function readFile()
    {
        $path = public_path('pokedex.json');

        if (!\File::exists($path)) {
            throw new \Exception("Invalid File");
        }

        return json_decode(\File::get($path), true);
    }

    protected function truncateTables()
    {
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        \DB::table('pokemon_type')->truncate();
        Type::truncate();
        Pokemon::truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
