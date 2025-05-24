<?php

namespace Backend\Models;

class Usuario {
    public $id;
    public $nombre;
    public $apaterno;
    public $amaterno;
    public $direccion;
    public $telefono;
    public $ciudad;
    public $estado;
    public $usuario;
    public $password;
    public $rol;



public function __construct(
    $id = null, $nombre, $apaterno, $amaterno, $direccion, $telefono, $ciudad, $estado, $usuario, $password, $rol
) {
    $this->id = $id;
    $this->nombre = $nombre;
    $this->apaterno = $apaterno;
    $this->amaterno = $amaterno;
    $this->direccion = $direccion;
    $this->telefono = $telefono;
    $this->ciudad = $ciudad;
    $this->estado = $estado;
    $this->usuario = $usuario;
    $this->password = $password;
    $this->rol = $rol;
}

}

