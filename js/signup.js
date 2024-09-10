
function doSignup() {
	userId = 0;
	let flag = true;
	
	//document.getElementById("createResult").innerHTML = "No fields blank pleaseee";

	
	
		
		let firstName = document.getElementById("firstname").value;
		let lastName = document.getElementById("lastname").value;
		let login = document.getElementById("username").value;
		let password = document.getElementById("password").value;
	
	

	let tmp = { firstName: firstName, lastName: lastName, login: login, password: password };
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + testBranch + api + '/AddUser.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				//document.getElementById("createResult").innerHTML = "success!";
				window.location.href = "Landingpage.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		//document.getElementById("colorAddResult").innerHTML = err.message;
	}

}
