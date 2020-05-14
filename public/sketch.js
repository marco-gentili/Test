function setup() {

    let lat, lon;


    if ('geolocation' in navigator) {
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(async position => {
            try {
                lat = position.coords.latitude;
                lon = position.coords.longitude;
                document.getElementById('latitude').textContent = lat.toFixed(2);
                document.getElementById('longitude').textContent = lon.toFixed(2);

                const api_url = "weather/" + lat + "," + lon;
                const response = await fetch(api_url);
                const json = await response.json();
                console.log(json);
                document.getElementById('Temperature').textContent = json.weather.temp.value;
                document.getElementById('cloud').textContent = json.cloud.weather[0].description;
                temperature = json.weather.temp.value;
                cloud = json.cloud.weather[0].description;

                const data = { lat, lon, temperature, cloud };
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                };

                const db_response = await fetch('/api', options);
                const db_json = await db_response.json();
                console.log(db_json);
            } catch (error) {
                console.log(error);
            }

        });
    } else {
        console.log('geolocation not available');
    }


}