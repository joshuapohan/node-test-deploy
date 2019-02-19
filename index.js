const http = require('http');
const port = 3000;

const GET = 'GET';
const POST = 'POST';

global.serverStatus = {
	'status': 'Running',
	'release' : '37.38.00',
	'percentage' :'100'
};

global.urlMap = {};

//add the route + method to global urlMap
function addRoute(route, routeHandler){
	global.urlMap[route] = routeHandler;
}

function onGet(route, routeHandler){
	addRoute(GET + route, routeHandler);
}

function onPost(route, routeHandler){
	addRoute(POST + route, routeHandler);
}

function getServerStatus(request, response){
	response.writeHead(200, {
		'Content-Type': 'application/json'
	});
	response.write(JSON.stringify(serverStatus));
}

function setServerStatus(request, response){
	let reqParam = request.url.split('?');

	if(reqParam.length > 1){
		let queries = reqParam[1].split('&');
		for(let query of queries){
			let params = query.split('=');
			switch(params[0]){
				case 'status':
					global.serverStatus['status'] = params[1];
				break;
				case 'release':
					global.serverStatus['release'] = params[1];
				break;
				case 'percentage':
					global.serverStatus['percentage'] = params[1];
				break;
			}
		}
	}
	response.end('Updated');
}

onGet('/status', getServerStatus);
onPost('/status', setServerStatus);

const requestHandler = (request, response) => {
  console.log(request.url);

  let route = request.url.split('?')[0];
  let method = request.method;
  console.log(method+route)

  if(urlMap[method+route]){
  	urlMap[method+route](request, response);
   } else{
	  response.writeHead(404);
	  response.end();
  }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
})
