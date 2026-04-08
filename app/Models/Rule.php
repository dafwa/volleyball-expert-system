<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Rule extends Model
{
    protected $fillable = [
        'code',
        'goal_name',
        'output_description',
    ];

    /**
     * Get the rule conditions associated with the rule.
     */
    public function ruleConditions(): HasMany
    {
        return $this->hasMany(RuleCondition::class);
    }

    /**
     * Checks if a given array of fact IDs satisfies ALL of its RuleConditions.
     * Simulates an AND logical gate for Forward Chaining.
     *
     * @param int[] $providedFactIds
     * @return bool
     */
    public function isSatisfiedBy(array $providedFactIds): bool
    {
        $requiredFactIds = $this->ruleConditions()->pluck('fact_id')->toArray();
        
        if (empty($requiredFactIds)) {
            return false; // A rule without conditions cannot be satisfied in this context
        }

        return count(array_intersect($requiredFactIds, $providedFactIds)) === count($requiredFactIds);
    }
}
