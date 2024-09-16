<?php

	$inData = getRequestInfo();
	
	$names = "";
	$phones = "";
	$emails = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "daisy", "SPOoks0219!!", "SMALLPROJ");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("select Name, Phone, Email from Contacts where Name like ? and UserID=?");
		$contactName = "%" . $inData["search"] . "%";
		$stmt->bind_param("ss", $contactName, $inData["userId"]);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$names .= ",";
				$phones .= ",";
				$emails .= ",";
			}
			$searchCount++;
			$names .= '"' . $row["Name"] . '"';
			$phones .= '"' . $row["Phone"] . '"';
			$emails .= '"' . $row["Email"] . '"';
			
		}
		
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $names, $numbers, $emails );
		}
		
		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"name":"","phone":"","email":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $names, $numbers, $emails )
	{
		$retValue = '{"name":[' . $names . '],"email":[' . $emails . '],"phone":[' . $phones . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
