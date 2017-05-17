<?php
  require "config.php";
  
  $token   = $_GET['token']    ?? null;
  $message = $_POST['message'] ?? null;
  
  $stmt = $db->prepare("SELECT id_user FROM users WHERE token = ? LIMIT 1");
  $stmt->execute(array($token));
  
  if ($stmt->rowCount() == 0) {
    $json = new Json(Json::RESULT_NOK, 'Token Invalide');
  } else if (strlen($message) < 5) {
    $json = new Json(Json::RESULT_NOK, 'Message trop court');
  } else if (strlen($message) > 250) {
    $json = new Json(Json::RESULT_NOK, 'Message trop long');
  } else {
    $id_user = $stmt->fetchColumn(0);
    
    $stmt = $db->prepare("INSERT INTO messages (id_user, date, message) VALUES (?, ?, ?)");
    $stmt->execute(array($id_user, date('Y-m-d H:i:s'), $message));
    
    $json = new Json(Json::RESULT_OK, 'Message validé');
  }
  
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: http://divl');
  echo json_encode($json);