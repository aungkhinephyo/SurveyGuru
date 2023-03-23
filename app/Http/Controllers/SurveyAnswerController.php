<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyQuestion;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isJson;

class SurveyAnswerController extends Controller
{
    public function index(Survey $survey, Request $request)
    {
        $questionIds = $survey->questions->pluck('id')->toArray();

        $columns = $survey->questions->pluck('question')->toArray();
        array_unshift($columns, '#');

        $rows = array_map(fn ($id) => 'question' . $id, $questionIds);
        array_unshift($rows, 'id');

        $length = count($survey->answers);
        $data = [];

        for ($i = 0; $i < $length; $i++) {
            $data[] = ['id' => $i + 1];
        }

        foreach ($questionIds as $questionId) {
            $question = SurveyQuestion::findOrFail($questionId);
            $questionNumber = 'question' . $question->id;
            $answers = $question->answers;

            for ($i = 0; $i < $length; $i++) {
                $data[$i][$questionNumber] = $answers[$i]->pivot->answer;
            }
        }

        return [
            'columns' => $columns,
            'rows' => $rows,
            'data' => $data,
        ];
    }
}
