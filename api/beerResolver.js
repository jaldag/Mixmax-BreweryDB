var BreweryDb = require('brewerydb-node');

// The API that returns the in-email representation.
module.exports = function(req, res) {
  var url = req.query.url.trim();

  // Brewery beer urls are in the format:
  // http://brewery.com/beer/<alphanumeric-id>
  var matches = url.match(/brewerydb\.com\/beer\/(\w*)/);
  if (!matches) {
    res.status(400).send('Invalid URL format');
    return;
  }
  
  var brewdb = new BreweryDb('ff966c4816c75756387dbc72764d7b59');

  var id = matches[1];
      
  brewdb.beer.getById(id, {}, function(err, data) {
     if (err) {
	 	res.status(500).send('Couldn\'t find beer');
        return;
	 }
     if (data.description != null) {
		var html = '<p> <b>Name:</b> ' + data.name + '</p> <p><b>ABV:</b> ' + data.abv + '<\p><p><b>Description:</b> ' + data.description + ' <\p>';
		res.json({
          body: html
        });
	 }
  });
};