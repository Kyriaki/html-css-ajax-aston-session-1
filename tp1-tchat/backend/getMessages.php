<?php
  require "config.php";
  
  $token          = $_GET['token']          ?? null;
  $lastReceivedId = $_GET['lastReceivedId'] ?? 0;
  
  $stmt = $db->prepare("SELECT id_user FROM users WHERE token = ? LIMIT 1");
  $stmt->execute(array($token));
  
  if ($stmt->rowCount() == 0) {
    $json = new Json(Json::RESULT_NOK, 'Token Invalide');
  } else {
    $stmt = $db->prepare("SELECT id_message, date, message, prenom, nom
                            FROM messages
                      INNER JOIN users USING (id_user)
                           WHERE token = ? AND id_message > ?
                        ORDER BY id_message ASC");
    $stmt->execute(array($token, $lastReceivedId));
    
    $json = new Json(Json::RESULT_OK, 'Listes des messages demandées');
    $json->resultDetails = $stmt->fetchAll(PDO::FETCH_OBJ);
  }
  
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: http://divl');
  echo json_encode($json);