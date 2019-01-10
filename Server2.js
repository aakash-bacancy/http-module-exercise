const http = require('http');
const url=require('url');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
	var pathname = url.parse(req.url).pathname;
if (req.method === 'POST' && pathname==='/formdata') {
collectRequestData(req, result => {
console.log(result);
res.end(`name=${result.fname} & age=${result.age}`);
});
}
else if(req.method === 'GET' && pathname==='/firstpage'){
res.end(`
<!doctype html>
<html>
<body>
<form action="/secondpage" method="post">
<button>next page</button>
</form>
</body>
</html>
`);
} 
else/*(req.method === 'GET' && pathname='/secondpage')*/{
res.end(`
<!doctype html>
<html>
<body>
<form action="/formdata" method="post">
<input type="text" name="fname" /><br />
<input type="number" name="age" /><br />
<button>Save</button>
</form>
</body>
</html>
`);
}
});
server.listen(8585);

function collectRequestData(request, callback) {
const FORM_URLENCODED = 'application/x-www-form-urlencoded';
if(request.headers['content-type'] === FORM_URLENCODED) {
let body = '';
request.on('data', chunk => {
body += chunk.toString();
});
request.on('end', () => {
callback(parse(body));
});
}
else {
callback(null);
}
}