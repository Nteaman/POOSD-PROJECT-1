
<?php

	returnWithSuccess(shell_exec("cd /home/bitnami/htdocs/test/POOSD-PROJECT-1; git pull"));

	
	
	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithSuccess( $message )
	{
		$retValue = '{"message": "' . $message . '", "error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
