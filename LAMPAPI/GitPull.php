
<?php
	$output=null;
	$retval=null;

	exec("git pull 2>&1", $output, $retval);

	echo "Returned with status $retval and output:\n";
	
	print_r($output);
	
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
