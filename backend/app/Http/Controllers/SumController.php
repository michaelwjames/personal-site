<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Sum;

class SumController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'value' => 'required|string',
        ]);

        $sum = Sum::create([
            'value' => $validated['value'],
        ]);

        return response()->json($sum, 201);
    }
}
