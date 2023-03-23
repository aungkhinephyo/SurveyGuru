<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class SurveyQuestion extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function answers(): BelongsToMany
    {
        return $this->belongsToMany(SurveyAnswer::class, 'survey_question_answers', 'survey_question_id', 'survey_answer_id')
            ->withPivot(['answer']);
    }
}
