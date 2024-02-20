export function login() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	fetch('http://localhost:8080/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	})
	.then(response => response.json())
	.then(data => {
		const	result = document.getElementById("result");
		
		result.classList.add("alert");
		if (data.accessToken) {
			result.innerHTML = `Login successful.`;
			result.classList.remove("alert-danger");	
			result.classList.add("alert-success");	
		} else {
			result.innerHTML = `Error: ${data.error.message}`;
			result.classList.remove("alert-success");	
			result.classList.add("alert-danger");
		}
	})
	.catch(error => {
		console.error('Error:', error);
	});
}

document.getElementById("loginButton").addEventListener("click", login);