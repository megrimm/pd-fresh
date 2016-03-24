<?php
// simple-weather is gathering weather information from http://www.openweathermap.org/

//Api key
$api = "appid=2253b3b4bf6decd8ebf6f942fedbcd05";

//City
$city="Ithaca";

//Country two digit ID
$country="US";

//Units
$units="imperial";

//Parameterized URL
$url="http://api.openweathermap.org/data/2.5/weather?q=".$city.",".$country."&units=".$units."&cnt=7&".$api."";

//Let's get some data :)
$json=file_get_contents($url);
$data=json_decode($json,true);

//Display data in plain text in browser
header("Content-Type: text/plain");
echo "temp " . $data['main']['temp'] . " humid " . $data['main']['humidity'] . " windspeed " . $data['wind']['speed'] . " winddeg " . $data['wind']['deg'];

?>