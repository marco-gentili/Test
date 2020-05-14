getData();

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        const root = document.createElement('div');

        const geo = document.createElement('div');


        geo.textContent = 'geo :' + item.lat + "°" + "," + item.lon + "°";
        const date = document.createElement('div');
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;


        root.append(geo, date);
        document.body.append(root);

    }
    console.log(data);
};

