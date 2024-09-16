const urlBase = 'http://nteaman_instance1.natalieteaman.site';
const api = '/LAMPAPI';
const extension = 'php';
// Set to "" later
const testBranch = '/test/POOSD-PROJECT-1';

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	//document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + testBranch + api + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
				console.log(userId);

				if( userId < 1 )
				{		
					//document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "Landingpage.html";
				//console.log(userId);

			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		//document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
//		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addContact()
{
	let name = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
	let phone = document.getElementById("phone").value;
	let email = document.getElementById("email").value;
	

	let tmp = {name:name,phone:phone,email:email,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase +testBranch + api + '/AddContacts.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				//document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		//document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}


function searchTable()
{
	//console.log(userId);
	
	let search = document.getElementById("searchInput").value;
	
	let colorList = "";

	let tmp = {search:search,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + testBranch + api + '/SearchContacts.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	//console.log(jsonPayload);
	
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				//console.log(JSON.stringify( xhr.responseText ));
				
				let jsonObject = JSON.parse( xhr.responseText );

				let table = document.getElementById('myTable');
				//table.getElementsByTagName('tbody')[0].innerHTML = "";

				let bodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
				bodyRef.innerHTML = '';
				
				for( let i=0; i<jsonObject.name.length; i++ )
				{
					
					let newRow = document.createElement('tr');

					let cell0 = document.createElement('td'); 
					cell0.textContent = i + 1; 
					newRow.appendChild(cell0); 
					
					let cell1 = document.createElement('td'); 
					cell1.textContent = jsonObject.name[i]; 
					newRow.appendChild(cell1); 
 
					let cell2 = document.createElement('td'); 
					cell2.textContent = jsonObject.phone[i]; 
					newRow.appendChild(cell2); 
 
					let cell3 = document.createElement('td'); 
					cell3.textContent = jsonObject.email[i]; 
					newRow.appendChild(cell3); 

					let cell4 = document.createElement('td'); 
					cell4.innerHTML = '<button class="edit-button" onclick="searchContact(this)>Edit</button>';
					newRow.appendChild(cell4);

					let cell5 = document.createElement('td'); 
					cell5.innerHTML = '<button class="delete-button" onclick="deleteContact(this)">Delete</button>';
					newRow.appendChild(cell5); 
 
					// Append the new row to the table 
					bodyRef.appendChild(newRow); 
				}
				
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		console.log("Big error");
	}
	
}

function searchContact(o) {
    var $row = $(o).closest("tr");    // Find the row
    var $text = $row.find(".nr").text(); // Find the text
    
    // Let's test it out
    alert($text);
};


function goDashboard(){
	window.location.href = "Landingpage.html";
}

