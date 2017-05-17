<?php

class Json {
  const RESULT_OK  = "OK";
  const RESULT_NOK = "ERREUR";
  
  public $resultCode;
  public $resultMessage;
  public $resultDetails = null;
  
  public function __construct($code, $message) {
    $this->resultCode    = $code;
    $this->resultMessage = $message;
  }
}