
<?php
	
	exec("cd /home/bitnami/htdocs/test/POOSD-PROJECT-1; git pull");
	
	returnWithSuccess();
	
	
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
