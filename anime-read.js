var ID = "peterrya-fu9cr";
var secret = "uVH2cq8m5PyQvzRcWJCQ";
var uri = "home";
var access_token;
var token_type;
var expires;
var expires_in;
var refresh_token;
var responses;

function getReadToken(){
	var req = new XMLHttpRequest();
	req.open("POST", "https://anilist.co/api/auth/access_token", true);
	req.addEventListener('load',function(){
		var response = JSON.parse(req.responseText);
		access_token = response.access_token;
		token_type = response.token_type;
		expires = response.expires;
		expires_in = response.expires_in;
		setTimeout(getReadToken, expires_in*1000);
	});
	req.setRequestHeader('Content-Type', 'application/json');
	req.send('{"grant_type":"client_credentials","client_id":"peterrya-fu9cr","client_secret":"uVH2cq8m5PyQvzRcWJCQ"}');
}

function addList(obj, div){
	var list = document.createElement('ul');
	document.getElementById(div).appendChild(list);
	console.log(obj);
	for(var data in obj){
		var elem = document.createElement('li');
		elem.appendChild(document.createTextNode(data + " : " + obj[data]));
		list.appendChild(elem);
	}

}

function bindButtons(){
	document.getElementById('search').addEventListener('click',function(event){
		var req = new XMLHttpRequest();
		var quer = document.getElementById('query').value;
		req.open("GET", "https://anilist.co/api/anime/search/" +  quer + "?access_token=" + access_token, true);
		req.addEventListener('load',function(){
			if(req.response.length > 4){
				var response = JSON.parse(req.responseText);
				document.getElementById('searchout').innerHTML = req.responseText;
			} else {
				document.getElementById('searchout').innerHTML = "No matching animes found";
			}
		});
		req.send(null);
	});
	
	document.getElementById('tsearch').addEventListener('click',function(event){
		var lnode = document.getElementById('lis');
		while (lnode.firstChild) {
			lnode.removeChild(lnode.firstChild);
		}
		var req = new XMLHttpRequest();
		var quer = document.getElementById('tquery').value;
		req.open("GET", "https://anilist.co/api/anime/search/" +  quer + "?access_token=" + access_token, true);
		req.addEventListener('load',function(){
			if(req.response.length > 4){
				var response = JSON.parse(req.responseText);
				for(var anime in response){
					addList(response[anime], "lis");
				}
			} else {
				document.getElementById('tableout').innerHTML = "No matching animes found";
			}
		});
		req.send(null);
	});	
	
	document.getElementById('fsearch').addEventListener('click',function(event){
		var lnode = document.getElementById('liss');
		while (lnode.firstChild) {
			lnode.removeChild(lnode.firstChild);
		}
		var req = new XMLHttpRequest();
		var quer = document.getElementById('fquery').value;
		req.open("GET", "https://anilist.co/api/anime/search/" +  quer + "?access_token=" + access_token, true);
		req.addEventListener('load',function(){
			console.log(req.response);
			if(req.response.length > 4){
				var filter = document.getElementById('filtval').value;
				var response = JSON.parse(req.responseText);
				for(var anime in response){
					var curan = response[anime];
					if(filter == 'synonyms'){
						var add = 0;
						curan = curan[filter];
						for(var x in curan){
							if(curan[x].includes(quer)){
								add = 1;
							}
						}
						if(add == 1){
							addList(response[anime], "liss");
						}
					} else if(typeof(curan[filter]) != 'number'){
						if(curan[filter].includes(quer)){
							addList(response[anime], "liss");
						}
					} else {
						console.log(filter + " " + curan[filter]);
						if(curan[filter]== quer){
							addList(response[anime], "liss");
						}
					}
				}
			} else {
				document.getElementById('liss').innerHTML = "No matching animes found";
			}
		});
		req.send(null);
	});
	
	document.getElementById('indfsearch').addEventListener('click',function(event){
		var lnode = document.getElementById('liss');
		while (lnode.firstChild) {
			lnode.removeChild(lnode.firstChild);
		}
		var req = new XMLHttpRequest();
		var quer = document.getElementById('sqtext').value;
		var filt = document.getElementById('fqtext').value;
		req.open("GET", "https://anilist.co/api/anime/search/" +  quer + "?access_token=" + access_token, true);
		req.addEventListener('load',function(){
			console.log(req.response);
			if(req.response.length > 4){
				var filter = document.getElementById('indfilt').value;
				var response = JSON.parse(req.responseText);
				for(var anime in response){
					var curan = response[anime];
					if(filter == 'synonyms'){
						var add = 0;
						curan = curan[filter];
						for(var x in curan){
							if(curan[x].includes(filt)){
								add = 1;
							}
						}
						if(add == 1){
							addList(response[anime], "lisss");
						}
					} else if(typeof(curan[filter]) != 'number'){
						console.log(curan);
						console.log("|" + filter + "|");
						if(curan[filter].includes(filt)){
							addList(response[anime], "lisss");
						}
					} else {
						console.log(filter + " " + curan[filter]);
						if(curan[filter]== filt){
							addList(response[anime], "lisss");
						}
					}
				}
			} else {
				document.getElementById('liss').innerHTML = "No matching animes found";
			}
		});
		req.send(null);
	});
	
	
}
getReadToken();
bindButtons();

/**/