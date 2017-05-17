<?php
  //$toto = $_POST['toto'] ?? null;
  $toto   = isset($_POST['toto'])  ? $_POST['toto']  : null;
  $format = isset($_GET['format']) ? $_GET['format'] : null;
  
  if ($toto) {
    $return[] = "Toto vaut : $toto";
    $return[] = "Ceci est une seconde ligne";
  } else {
    $return[] = "Ça marche !!";
    $return[] = "Pas trop mal";
  }

  
  if ($format === "json") {
    echo json_encode($return);
  } else {
    echo "<ul><li>".implode('</li><li>', $return)."</li></ul>";
  }