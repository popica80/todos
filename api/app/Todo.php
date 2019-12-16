<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $with = ['user', 'category'];

    public function category()
    {
        return $this->belongsTo(Category::class)->select('id', 'name');
    }

    public function user()
    {
        return $this->belongsTo(User::class)->select('id', 'name');
    }
}
