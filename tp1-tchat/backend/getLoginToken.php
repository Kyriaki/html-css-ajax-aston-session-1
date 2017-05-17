<?php
  require "config.php";
  
  $stmt = $db->prepare("SELECT id_user FROM users WHERE prenom = ? AND nom = ?");
  $stmt->execute(array($_GET['prenom'] ?? null, $_GET['nom'] ?? null));
  
  if ($stmt->rowCount() == 1) {
    $id_user = $stmt->fetchColumn(0);
    
    // Générer un token
    $token = sha1($_GET['prenom'] . time() . $_GET['nom']);
    
    $db->exec("UPDATE users SET token = '$token', ip = '$_SERVER[REMOTE_ADDR]' WHERE id_user = $id_user");
    
    $json = new Json(Json::RESULT_OK, 'Utilisateur trouvé, token généré');
    $json->resultDetails = array('token' => $token);
    
  } else {
    $json = new Json(Json::RESULT_NOK, 'Aucun utilisateur trouvé');
  }
  
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: http://divl');
  echo json_encode($json);