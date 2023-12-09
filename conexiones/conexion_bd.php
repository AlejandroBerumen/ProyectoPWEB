<?php
    class ConexionBD{
        private $conexion;
        private $host ="localhost:3306";
        private $usuario = "junkai";
        private $contraseña = "tsuka23";
        private $bd = "fotografia";

        public function __construct() {
            $this->conexion = mysqli_connect(
                $this->host, 
                $this->usuario, 
                $this->contraseña, 
                $this->bd
            );
            if(!$this->conexion){
                die("Error en conexion a BD: " . mysqli_connect_error());
            } else{
                //echo 'exito';
            }
        }
        public function getConexion(){
            return $this->conexion;
        }
    }
?>