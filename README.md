## FreeCodeCamp API: Image Search Abstraction Layer
By Kien Nguyen <anhkien96@gmail.com>

### User stories

I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
I can paginate through the responses by adding a ?offset=2 parameter to the URL.
I can get a list of the most recently submitted search strings.

### Example usage
```
http://fcc-api-image-search.herokuapp.com/search/funny?offset=10
http://fcc-api-image-search.herokuapp.com/latest
```
### Example query output
```
[
	{
		"title":"This is Carter. He knocked on my door to ask if he could have a banana then left.",
		"width":768,
		"height":1024,
		"type":"image/jpeg",
		"size":134603,
		"link":"http://i.imgur.com/lsoomRq.jpg"
	},
	{
		"title":"Hit enter for feels, press 0 twice for ultimate feels",
		"width":1000,
		"height":351,
		"type":"image/png",
		"size":326464,
		"link":"http://i.imgur.com/wGscKpD.png"
	},
	{
		"title":"bathroom poets",
		"width":2322,
		"height":4128,
		"type":"image/jpeg",
		"size":664064,
		"link":"http://i.imgur.com/7mOL1uO.jpg"
	},
	...
]
```
### Example latest output
```
[
	{
		"term":"game",
		"when":"2016-05-14T14:45:27.344Z"
	},
	{
		"term":"music",
		"when":"2016-05-14T14:45:12.608Z"
	},
	...
]
```
### Live site
[http://img-kien.herokuapp.com](http://img-kien.herokuapp.com)