<?php
// you put your filename here ( obviously )
$fileName = "worldle-answers.txt";

// opening and reading file
$fileH = fopen( $fileName, "r") or die("Unable to open file!");
$fileCont = fread( $fileH,filesize( $fileName));
fclose($fileH);

// split text into lines
$lines = explode( "\r\n", $fileCont);
$numOfLines = count($lines);

?>