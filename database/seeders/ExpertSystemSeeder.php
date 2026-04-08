<?php

namespace Database\Seeders;

use App\Models\Fact;
use App\Models\Rule;
use Illuminate\Database\Seeder;

class ExpertSystemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Insert Facts
        $factF31 = Fact::create([
            'code' => 'F31',
            'description' => 'Pemain belakang melakukan smash dari area depan (melewati garis serang).',
            'category' => 'Attacking Phase',
        ]);

        $factF32 = Fact::create([
            'code' => 'F32',
            'description' => 'Bola berada sepenuhnya di atas ketinggian net saat dilakukan serangan.',
            'category' => 'Attacking Phase',
        ]);

        $factF01 = Fact::create([
            'code' => 'F01',
            'description' => 'Satu tim memainkan bola sebanyak 4 sentuhan sebelum mengirimkannya ke area lawan.',
            'category' => 'Ball Contacts',
        ]);

        $factF56 = Fact::create([
            'code' => 'F56',
            'description' => 'Tim melakukan sentuhan keempat setelah bola hasil block kembali ke area sendiri.',
            'category' => 'Ball Contacts',
        ]);

        // Insert Rules and their Conditions
        // Rule: R16 (Attack Hit Fault) requires BOTH F31 and F32
        $ruleR16 = Rule::create([
            'code' => 'R16',
            'goal_name' => 'Attack Hit Fault (Back-Row)',
            'output_description' => 'Pemain belakang melakukan serangan ilegal dari area depan.',
        ]);
        
        $ruleR16->ruleConditions()->createMany([
            ['fact_id' => $factF31->id],
            ['fact_id' => $factF32->id],
        ]);

        // Rule: R01a (Four Hits) requires F01
        $ruleR01a = Rule::create([
            'code' => 'R01a',
            'goal_name' => 'Four Hits',
            'output_description' => 'Terjadi pelanggaran karena tim melakukan lebih dari tiga kali sentuhan bola dalam satu rally.',
        ]);
        
        $ruleR01a->ruleConditions()->create(['fact_id' => $factF01->id]);

        // Rule: R01b (Four Hits) requires F56
        $ruleR01b = Rule::create([
            'code' => 'R01b',
            'goal_name' => 'Four Hits',
            'output_description' => 'Terjadi pelanggaran karena tim melakukan lebih dari tiga kali sentuhan bola dalam satu rally.',
        ]);
        
        $ruleR01b->ruleConditions()->create(['fact_id' => $factF56->id]);
    }
}
