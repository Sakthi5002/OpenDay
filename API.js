const para = document.getElementById('para');
para.innerHTML = 'x';
const requestOptions = {
    method: "GET",
    redirect: "follow"
};

fetch("https://openday.kumaraguru.in/api/v1/departments", requestOptions)
    .then((response) => response.text())
    .then((result) => {
        console.log(result);
        const parsed = JSON.parse(result);
        console.log(parsed[1]);

        para.innerHTML = parsed[1].longitude;
    })
    .catch((error) => console.error(error));

// getText("https://openday.kumaraguru.in/api/v1/block/1");

// async function getText(file) {
//     try {
//         console.log("Step 1:");

//         let x = await fetch(file);
//         console.log("Step 2:");

//         let y = await x.text();
//         console.log("Step 3:");

//         myDisplay(y);
//     } catch (err) {
//         console.log("Logged Error:", err);
//     }
// }

// function myDisplay(text) {
//     console.log("Hi");

//     console.log(text);
// }