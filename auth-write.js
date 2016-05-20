var ID = "peterrya-fu9cr";
var secret = "uVH2cq8m5PyQvzRcWJCQ";
var uri = "home";
var access_token;
var token_type;
var expires;
var expires_in;
var refresh_token;

function bindButtons(){
	document.getElementById('clicpin').addEventListener('click',function(event){
		var win = window.open("https://anilist.co/api/auth/authorize?grant_type=authorization_pin&client_id=" + ID + "&response_type=pin", '_blank');
		win.focus();
	})
	document.getElementById('clictok').addEventListener('click',function(event){
		var pin = document.getElementById('authpin').value;
		if(pin != ""){
			var req = new XMLHttpRequest();
			req.open("POST", "https://anilist.co/api/auth/access_token", true);
			req.addEventListener('load',function(){
				var response = JSON.parse(req.responseText);
				access_token = response.access_token;
				token_type = response.token_type;
				expires = response.expires;
				expires_in = response.expires_in;
				refresh_token = response.refresh_token;
				document.getElementById('cliout').innerHTML = access_token + '<br />' + token_type + '<br />' + expires + '<br />' + expires_in + '<br />' + refresh_token;
				setTimeout(refresh(), expires_in*1000);
			});
			req.setRequestHeader('Content-Type', 'application/json');
			req.send('{"grant_type":"authorization_pin","client_id":"peterrya-fu9cr","client_secret":"uVH2cq8m5PyQvzRcWJCQ","code":' + "\"" + pin + "\"" + "}");
		}
	})
}

function refresh(){
	var req = new XMLHttpRequest();
	req.open("POST", "https://anilist.co/api/auth/access_token", true);
	req.addEventListener('load',function(){
		var response = JSON.parse(req.responseText);
		access_token = response.access_token;
		token_type = response.token_type;
		expires = response.expires;
		expires_in = response.expires_in;
		document.getElementById('cliout').innerHTML = access_token + '<br />' + token_type + '<br />' + expires + '<br />' + expires_in + '<br />' + refresh_token;
		setTimeout(refresh, expires_in*1000);
	});
	req.setRequestHeader('Content-Type', 'application/json');
	req.send('{"grant_type":"refresh_token","client_id":"peterrya-fu9cr","client_secret":"uVH2cq8m5PyQvzRcWJCQ","refresh_token":' + "\"" + refresh_token + "\"" + "}");
}

bindButtons();

		/*var req = new XMLHttpRequest();
		req.open("GET", "https://anilist.co/api/auth/authorize?grant_type=authorization_pin&client_id=" + ID + "&response_type=pin", true);
		req.addEventListener('load',function(){
				var response = JSON.parse(req.responseText);
				document.getElementById('cliout').innerHTML = req.responseText;
				setTimeout(function(){
					//	document.getElementById("clicred").click();
				}, expires_in*1000);
			});
		req.send(null);*/