var ID = "peterrya-fu9cr";
var secret = "uVH2cq8m5PyQvzRcWJCQ";
var access_token;
var  token_type;
var  expires;
var  expires_in;

function bindButtons(){
	document.getElementById('clicred').addEventListener('click',function(event){
		var req = new XMLHttpRequest();
		req.open("POST", "https://anilist.co/api/auth/access_token", true);
		req.addEventListener('load',function(){
			var response = JSON.parse(req.responseText);
			access_token = response.access_token;
			token_type = response.token_type;
			expires = response.expires;
			expires_in = response.expires_in;
			document.getElementById('cliout').innerHTML = access_token + '<br />' + token_type + '<br />' + expires + '<br />' + expires_in;
			setTimeout(function(){
				document.getElementById("clicred").click();
			}, expires_in*1000);
		});
		req.setRequestHeader('Content-Type', 'application/json');
		req.send('{"grant_type":"client_credentials","client_id":"peterrya-fu9cr","client_secret":"uVH2cq8m5PyQvzRcWJCQ"}');
	})
}



bindButtons();

