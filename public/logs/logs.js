getData();

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    

    for (item of data) {
        const root = document.createElement('div');
        const geo = document.createElement('div');


        geo.textContent = 'geo :' + item.lat.toFixed(2) + "°" + "," + item.lon.toFixed(2) + "°";
        const date = document.createElement('div');
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;

        const cloud = document.createElement('div');
        cloud.textContent = "Sky: " + item.cloud ;

        const temp = document.createElement('div');
        temp.textContent = "Temperature : " + item.temperature + "°" ;


        root.append(geo, date, cloud,temp);
        document.body.append(root);

    }
    console.log(data);
};

