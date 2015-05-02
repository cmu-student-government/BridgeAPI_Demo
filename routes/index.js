var sreq = require('sync-request');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; // Allow StuGov server's SSL cert (most don't need this)
var key = process.env["bridgeapi_key"]; // Your API Private Key
var andrew = process.env["bridgeapi_andrew"]; // Your API Andrew ID
var url = "https://stugov.andrew.cmu.edu/staging/bridgeapi/api/v1/events";

exports.index = function(req, res) {
  // Get our Bridge API data
  var page = req.query.page || 1; // Either get page # from request or default
  var items = [];
  var options = { headers: { andrew_id: andrew, api_key: key }, qs: { "type": "public", "page": page } }; // Set our api request header options

  var api_res = sreq("POST", url, options); // Make a synchronous request
  if (api_res.statusCode !== 200) // Log error if something goes wrong
    console.log("Error! API returned with a status code of " + api_res.statusCode + ".");

  var data = JSON.parse(api_res.body) // Parse out our response
  if (!data.items) data.items = []
  items = items.concat(data.items.filter(function(e) { return e.flyerUrl && e.flyerUrl !== "" })); // Filter out only events with flyer images

  // Respond with only the partial if it's an AJAX request
  res.render('home', { layout: !req.xhr, items: items})
}
