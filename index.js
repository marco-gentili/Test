const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require ('dotenv').config();


const app = express();
const port = process.env.PORT|| 3000;
app.listen(port, () => console.log('listening at ' + port));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });


});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

app.get("/weather/:latlon", async (request, response) => {
  console.log(request.params);
  const latlon = request.params.latlon.split(",");
  console.log(latlon);
  const lat = latlon[0];
  const lon = latlon[1];
  console.log(lat, lon);
  const weather_key = process.env.API_KEY;
  const weather_url = "https://api.climacell.co/v3/weather/realtime?lat=" + lat + "&lon=" + lon + "&unit_system=si&fields=temp&apikey="+weather_key;
  const weather_response = await fetch(weather_url);
  const weather_data = await weather_response.json();
  
  const cloud_api = process.env.API_KEY1;
  const cloud_url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+cloud_api;
  const cloud_response = await fetch(cloud_url);
  const cloud_data = await cloud_response.json();
 
  
  const data = {
    weather:weather_data,
    cloud:cloud_data
  };
  response.json(data);
});