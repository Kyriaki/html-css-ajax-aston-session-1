<?php
error_reporting(-1); 

$user_agent = $_SERVER['HTTP_USER_AGENT'];
 
$findme = "mobile";
$pos = stripos($user_agent, $findme);

echo $pos;

$tab_browser = get_browser(null, true);
print_r($tab_browser);
echo $tab_browser['platform'];
?>


<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Document sans nom</title>
<style>
#parent {
    width: 200px;
    height: 150px;
    border: 1px solid #c3c3c3;
    display: -webkit-flex; /* Safari */
    -webkit-flex-flow: row wrap; /* Safari 6.1+ */
    display: flex;
	<?php if ($pos === true) { ?>
    flex-flow:column nowrap; /*row wrap;*/
	<?php } else { ?>
	flex-flow:row wrap;
	<?php } ?>
}

#parent div {
    width: 100px;
    height: 100px;
}

</style>



</head>

<body>

<div id="parent">
  <div style="background-color:coral;">A</div>
  <div style="background-color:lightblue;">B</div>
  <div style="background-color:khaki;">C</div>
  <div style="background-color:pink;">D</div>
  <div style="background-color:lightgrey;">E</div>
  <div style="background-color:lightgreen;">F</div>
</div>

</body>
</html>
