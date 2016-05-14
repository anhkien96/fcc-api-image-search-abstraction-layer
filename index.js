var imgurKey= process.env.IMGUR_KEY;
var mongo = require('mongoose');

mongo.connect(process.env.MONGODB_URI);
var doc = mongo.model('Search', {term: String, when: String});

require('http').createServer(function(req, res) {
	var query = req.url.split('/');
	if (query[1] == 'search' && query[2]) {
		var offset = query[2].split('?offset=');
		var num = Number(offset[1]);
		if (num == offset[1] && num >= 0) getSearch(res, offset[0], num);
		else getSearch(res, query[2], 0);
	}
	else if (query[1] == 'latest') getLatest(res);
	else getHtml(res);
}).listen(process.env.PORT);

function getSearch(res, q, page) {
	var option = {
		host: 'api.imgur.com',
		path: '/3/gallery/search/top/'+page+'/?q='+q,
		headers: {'Authorization': 'Client-ID '+imgurKey}
	};
	require('https').get(option, function(get) {
		var data = '';
		get.on('data', function(chunk) {
			data += chunk;
		});
		get.on('end', function() {
			saveQuery(q);
			getResult(res, JSON.parse(data).data.slice(0,10));
		});
	});
}

function saveQuery(q) {
	doc.find().limit(1).sort('-when').exec(function(err, data) {
		if (err) throw err;
		if (!data.length || data[0].term != q) new doc({term: q, when: new Date().toISOString()}).save();
	});
}

function getResult(res, data) {
	var result = [], item;
	for(var i=0; i<data.length; ++i) {
		item = data[i];
		result[i] = {
			title: item.title,
			width: item.width,
			height: item.height,
			type: item.type,
			size: item.size,
			link: item.link
		};
	}
	res.end(JSON.stringify(result));
}

function getLatest(res) {
	doc.find({}, {_id: false, __v: false}).limit(10).sort('-when').exec(function(err, data) {
		if (err) throw err;
		res.end(JSON.stringify(data));
	});
}

function getHtml(res) {
	require('fs').readFile('public/image-search.html', function(err, data) {
		if (err) throw err;
		res.end(data);
	});
}