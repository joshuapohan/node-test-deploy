const request = require('request');
const axios = require('axios');

var getWeather = (address) => {

	var encodedAddress = encodeURIComponent(address);
	var geocodeUrl = 'https://www.mapquestapi.com/geocoding/v1/address?key=5ZruUfv6AW9JTpKtAjs9mum20Wfi0X0X&inFormat=kvp&outFormat=json&location=' + encodedAddress +'&thumbMaps=false'

	axios.get(geocodeUrl).then( (response) => {
		if(response.data.status === 'ZERO_RESULTS'){
			throw new Error('Unable to find that address');
		}
		console.log(response.data['results'][0]['locations'][0]['latLng']);
		var lat = response.data['results'][0]['locations'][0]['latLng'].lat;
		var lng = response.data['results'][0]['locations'][0]['latLng'].lng;
		var weatherUrl = 'https://api.darksky.net/forecast/1434f382592eb203ea932d2d80a3cf76/'+lat+','+lng;
		return axios.get(weatherUrl);
	}).then( (response) => {
			var temperature = {
					icon: response.data.currently.icon,
					temp: response.data.currently.temperature		
				}
			console.log(temperature);
			return temperature;
	}).catch( (e) => {
		if(e.code === 'ENOTFFOUND'){
			console.log("Unable to connect to API servers");
		}
		else{
			console.log(e.message);
		}
	});

}

module.exports = {
	getWeather
};

//'https://www.mapquestapi.com/geocoding/v1/address?key=5ZruUfv6AW9JTpKtAjs9mum20Wfi0X0X&inFormat=kvp&outFormat=json&location=grogol%2C+jakarta&thumbMaps=false'
