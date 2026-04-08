<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use App\Models\Fact;
use App\Models\Rule;
use App\Models\RuleCondition;

class KnowledgeBaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Disable foreign key checks to allow truncation
        Schema::disableForeignKeyConstraints();

        DB::table('rule_conditions')->truncate();
        DB::table('rules')->truncate();
        DB::table('facts')->truncate();

        Schema::enableForeignKeyConstraints();

        // 1. Parse facts.csv
        $factsFile = database_path('seeders/data/facts.csv');
        if (($handle = fopen($factsFile, 'r')) !== false) {
            $header = fgetcsv($handle); // Skip header

            while (($data = fgetcsv($handle)) !== false) {
                if (count($data) >= 3 && !empty(trim($data[0]))) {
                    Fact::create([
                        'code' => trim($data[0]),
                        'description' => trim($data[1]),
                        'category' => trim($data[2]),
                    ]);
                }
            }
            fclose($handle);
        }

        // Cache facts memory map for ultra-fast Rule mapping
        $factsMap = Fact::pluck('id', 'code')->toArray();

        // 2. Parse rules.csv
        $rulesFile = database_path('seeders/data/rules.csv');
        if (($handle = fopen($rulesFile, 'r')) !== false) {
            $header = fgetcsv($handle); // Skip header

            while (($data = fgetcsv($handle)) !== false) {
                if (count($data) >= 4 && !empty(trim($data[0]))) {
                    $ruleCode = trim($data[0]);
                    $logicString = trim($data[1]);
                    $goalName = trim($data[2]);
                    $outputDescription = trim($data[3]);

                    // Provide standard inference trim (IF prefixes)
                    $logicString = preg_replace('/^IF\s+/i', '', $logicString);
                    $logicString = trim($logicString);

                    if (str_contains($logicString, ' OR ')) {
                        // ==== OR LOGIC ====
                        // Needs independent rules for OR logic parsing in Forward Chaining architectures
                        $factCodes = explode(' OR ', $logicString);
                        $suffixChar = 'a'; // Begin suffix loop (R01a, R01b, etc.)

                        foreach ($factCodes as $factCode) {
                            $factCode = trim($factCode);
                            if (isset($factsMap[$factCode])) {
                                $rule = Rule::create([
                                    'code' => $ruleCode . $suffixChar++,
                                    'goal_name' => $goalName,
                                    'output_description' => $outputDescription,
                                ]);

                                RuleCondition::create([
                                    'rule_id' => $rule->id,
                                    'fact_id' => $factsMap[$factCode],
                                ]);
                            }
                        }
                    } else {
                        // ==== AND / SINGLE LOGIC ====
                        // Single Rule that gates ALL evaluated logic requirements under one ID
                        $factCodes = explode(' AND ', $logicString);
                        
                        $rule = Rule::create([
                            'code' => $ruleCode,
                            'goal_name' => $goalName,
                            'output_description' => $outputDescription,
                        ]);

                        foreach ($factCodes as $factCode) {
                            $factCode = trim($factCode);
                            if (isset($factsMap[$factCode])) {
                                RuleCondition::create([
                                    'rule_id' => $rule->id,
                                    'fact_id' => $factsMap[$factCode],
                                ]);
                            }
                        }
                    }
                }
            }
            fclose($handle);
        }
    }
}
