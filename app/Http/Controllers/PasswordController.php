<?php

namespace App\Http\Controllers;

use App\Password;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PasswordController extends Controller
{
    /**
     * PasswordController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(['passwords' => auth()->user()->passwords]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return response()->json(['message' => 'This method is not supported'], 403);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $pass = \App\Password::create([
            'user_id' => auth()->user()->id,
            'name' => request('name'),
            'value' => request('value'),
            'username' => request('username')
        ]);

        return response()->json(['password' => $pass]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = \App\Password::find($id);

        if ($item == null || $item->user_id != auth()->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return response()->json($item);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return response()->json(['message' => 'This method is not supported'], 403);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $pass = \App\Password::find($id);
        if ($pass == null) {
            return response()->json(['message' => 'Not found'], 404);
        }

        if ($pass->user_id != auth()->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        if (request('name') != null) {
            $pass->name = request('name');
        }

        if (request('value') != null) {
            $pass->value = request('value');
        }

        if (request('username') != null) {
            $pass->value = request('username');
        }

        $pass->save();

        return response()->json(['message' => 'Successfully updated password']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = \App\Password::find($id);

        if ($item == null || $item->user_id != auth()->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $item->delete();
        return response()->json(['message' => 'Successfully deleted password']);
    }
}
