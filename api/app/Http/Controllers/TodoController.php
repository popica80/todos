<?php

namespace App\Http\Controllers;

use App\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Todo::where('completed', $request->query('completed'))
            ->where('user_id', auth('api')->id())
            ->latest()
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|min:3',
            'category' => 'required'
        ]);

        $todo = new Todo();
        $todo->title = $request->input('title');
        $todo->user_id = auth('api')->id();
        $todo->category_id = $request->input('category');
        $todo->completed = 0;
        $todo->save();

        return $todo->fresh();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Todo $todo)
    {
        if ($todo->user_id !== auth('api')->id()) {
            return response()->json(['message' => 'Unauthorized action.'], 403);
        }
        $todo->completed = !$todo->completed;
        $todo->save();

        return $todo;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Todo $todo)
    {
        if ($todo->user_id !== auth('api')->id()) {
            return response()->json(['message' => 'Unauthorized action.'], 403);
        }
        if (!$todo->delete()) {
            return response()->json(['message' => 'could not delete', 422]);
        }
        return response()->json('', 204);
    }
}
