const values = JSON.parse(localStorage.getItem("storageName"));
console.log(values);

const head = document.getElementById("dept-h");
const img = document.getElementById("dept-i");
const description = document.getElementById("dept-p");
const link = document.getElementById("dept-a");

head.innerHTML = values.name;
description.innerHTML = values.description;
link.href = values.link;
link.innerHTML = values.link;
img.src = `https://picsum.photos/id/${values.id}/1080/720`