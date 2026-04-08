<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RuleCondition extends Model
{
    protected $fillable = [
        'rule_id',
        'fact_id',
    ];

    /**
     * Get the rule that owns the condition.
     */
    public function rule(): BelongsTo
    {
        return $this->belongsTo(Rule::class);
    }

    /**
     * Get the fact that owns the condition.
     */
    public function fact(): BelongsTo
    {
        return $this->belongsTo(Fact::class);
    }
}
