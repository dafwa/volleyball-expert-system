<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Fact extends Model
{
    protected $fillable = [
        'code',
        'description',
        'category',
    ];

    /**
     * Get the rule conditions associated with the fact.
     */
    public function ruleConditions(): HasMany
    {
        return $this->hasMany(RuleCondition::class);
    }
}
