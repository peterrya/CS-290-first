var ID = "peterrya-fu9cr";
var secret = "uVH2cq8m5PyQvzRcWJCQ";
var uri = "home";
var access_token;
var token_type;
var expires;
var expires_in;
var refresh_token;

function addList(obj, div){
	var list = document.createElement('ul');
	document.getElementById(div).appendChild(list);
	console.log(obj.anime);
	for(var data in obj){
		var elem = document.createElement('li');
		if(data != "anime" && data != "user"){
			elem.appendChild(document.createTextNode(data + " : " + obj[data]));
			list.appendChild(elem);
		}
	}
}

function getReviews(uid){
	var lnode = document.getElementById('lis');
	while (lnode.firstChild) {
		lnode.removeChild(lnode.firstChild);
	}
	var req = new XMLHttpRequest();
	req.open("GET", "https://anilist.co/api/user/"+ uid + "/reviews?access_token=" + access_token, true);
	req.addEventListener('load',function(){
		if(req.response.length > 4){
			var response = JSON.parse(req.responseText);
			response = response["anime"];
			if(response.length > 0){
				for(var rev in response){
					addList(response[rev], "lis");
				}
			} else {
				document.getElementById('lis').innerHTML = "No reviews found";
			}
		} else {
			console.log(response);
			document.getElementById('lis').innerHTML = "No reviews found";
		}
	});
	req.send(null);
}

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
				setTimeout(refresh(), expires_in*1000);
			});
			req.setRequestHeader('Content-Type', 'application/json');
			req.send('{"grant_type":"authorization_pin","client_id":"peterrya-fu9cr","client_secret":"uVH2cq8m5PyQvzRcWJCQ","code":' + "\"" + pin + "\"" + "}");
		}
	})
	
	document.getElementById('subre').addEventListener('click',function(event){
		var anime_id = document.getElementById('id').value;
		var tex = document.getElementById('revtext').value;
		var summary = document.getElementById('revsum').value;
		var privat = document.getElementById('priv').value;
		var score = document.getElementById('sco').value;
		console.log('{"anime_id":"' + anime_id + '","text":"' + tex + '","summary":"' + summary + '","private":"' + privat + '","score":"' + score + '"}');
		if(tex.length < 2000){
			console.log("Review is too short");
		}
		if(summary.length < 20){
			console.log("Summary is too short");
		}
		if(summary.length > 120){
			console.log("Summary is too long");
		}
		var req = new XMLHttpRequest();
		req.open("POST", "https://anilist.co/api/anime/review?access_token=" + access_token, true);
		req.addEventListener('load',function(){
			console.log(req.response);
			document.getElementById('oout').innerHTML = req.response;

			//var response = JSON.parse(req.responseText);
		});
		console.log(typeof(anime_id) + typeof(tex) + typeof(summary) + typeof(privat) + typeof(score));
		req.setRequestHeader("Authorization", access_token);
		req.setRequestHeader('Content-Type', 'application/json');
		req.send('{"anime_id":"' + anime_id + '","text":"' + tex + '","summary":"' + summary + '","private":"' + privat + '","score":"' + score + '"}');
	})
	
	document.getElementById('delrev').addEventListener('click',function(event){
		var req = new XMLHttpRequest();
		var revid = document.getElementById('rid').value
		req.open("DELETE", "https://anilist.co/api/anime/review", true);
		req.addEventListener('load',function(){
			if(req.response.length > 1){
				document.getElementById('delout').innerHTML = "No such review exists";
			} else {
				document.getElementById('delout').innerHTML = "Review deleted";
			}
		});
		req.setRequestHeader("Authorization", access_token);
		req.setRequestHeader('Content-Type', 'application/json');
		req.send('{"id":"' + revid + '"}');
	})
	
	document.getElementById('getrev').addEventListener('click',function(event){
		var req = new XMLHttpRequest();
		var anime_id = document.getElementById('id').value;
		var uid;
		req.open("GET", "https://anilist.co/api/user?access_token=" + access_token, true);
		req.addEventListener('load',function(){
			var response = JSON.parse(req.responseText);
			uid = response.id;
			getReviews(uid);
		});
		req.send(null);
	});	
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
		setTimeout(refresh, expires_in*1000);
	});
	req.setRequestHeader('Content-Type', 'application/json');
	req.send('{"grant_type":"refresh_token","client_id":"peterrya-fu9cr","client_secret":"uVH2cq8m5PyQvzRcWJCQ","refresh_token":' + "\"" + refresh_token + "\"" + "}");
}

bindButtons();
