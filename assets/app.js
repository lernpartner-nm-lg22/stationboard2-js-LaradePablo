"use strict"
// opendata api URL
const stationElement = document.getElementById("station");
const buttonElement = document.getElementById("submit");
const tableElement = document.getElementById("time-table");


buttonElement.addEventListener("click", async () => {
    const data = await getData();
    displayData(data);
});

const getData = async () => {
    const station = stationElement.value;
    const url = `https://transport.opendata.ch/v1/stationboard?station=${station}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const displayData = (data) => {
    const stationName = data.station.name;
    const stationNameElement = document.getElementById("station-name");
    stationNameElement.textContent = stationName;
    data.stationboard.forEach((train) => {
        const gleis = train.stop.platform;
        const destination = train.to;
        const time = new Date(train.stop.departure);
        const timeString = time.toLocaleTimeString("de-Ch");
 
        const row = tableElement.insertRow();
        const cellUhrzeit = row.insertCell();
        cellUhrzeit.textContent = timeString;
        const cellZiel = row.insertCell();
        cellZiel.textContent = destination;
        const cellGleis = row.insertCell();
        cellGleis.textContent = gleis;
    })
};