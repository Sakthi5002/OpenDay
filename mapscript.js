let mapOptions = {
    center: [11.3795, 77.8941],
    zoom: 10
}

let map = new L.map('map', mapOptions);

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
map.addLayer(layer);

let marker = new L.Marker([11.3795, 77.8941], { title: "Tiruchengode" });
marker.addTo(map);

// let iconOptions = {
//     title: "",
// }

for (let i = 0; i < 1000; i++) {
    fetch(`https://openday.kumaraguru.in/api/v1/department/${i + 1}`)
        .then(result => result.json())
        .then(result => {
            let marker = new L.Marker([result.latitude, result.longitude], { title: `${result.name}` });
            marker.addTo(map);
        })
}

//http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png