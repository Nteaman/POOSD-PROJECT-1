
function doSignup() {
	userId = 0;

	let firstName = document.getElementById("firstname").value;
	let lastName = document.getElementById("lastname").value;
	let login = document.getElementById("username").value;
	let password = document.getElementById("password").value;

	let tmp = { firstName: firstName, lastName: lastName, login: login, password: password };
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/AddUsers.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				window.location.href = "color.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		//document.getElementById("colorAddResult").innerHTML = err.message;
	}

}
