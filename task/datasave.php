<?php
	$result_string = $_POST['postresult_string'];
	file_put_contents('structurestudyresults.csv', $result_string, FILE_APPEND);
?>