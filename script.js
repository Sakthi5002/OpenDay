const departmentsDiv = document.querySelector(".department-body");

const addDeptDiv = (id, name) => {
    const deptContainer = document.createElement("div");
    const deptImg = document.createElement("img");
    const deptPara = document.createElement("p");

    deptContainer.classList.add("department-container");
    deptImg.classList.add("department-images");
    deptImg.src = `https://picsum.photos/id/${id}/200/300`;
    deptPara.innerHTML = name;

    deptContainer.addEventListener("click", () => {
        openDeptPage(id);
    });

    deptContainer.appendChild(deptImg);
    deptContainer.appendChild(deptPara);
    departmentsDiv.appendChild(deptContainer);
}

function openDeptPage(id) {
    fetch(`https://openday.kumaraguru.in/api/v1/department/${id}`)
        .then(result => result.json())
        .then(result => {
            console.log(result);

            localStorage.setItem("storageName", JSON.stringify(result));
            window.location.href = "department.html";
        })
        .catch(e => console.log(e))
}

var departmentList = [];
let currPage = 1;
const pageBtns = document.querySelectorAll(".page-btn");
const pageLeft = document.getElementById("page-left");
const pageRight = document.getElementById("page-right");

pageLeft.addEventListener("click", function () {
    if (currPage != 1) {
        pageSelector(currPage - 1, departmentList, 0);
    }
});

pageRight.addEventListener("click", function () {
    if (currPage != 10) {
        pageSelector(currPage + 1, departmentList, 0);
    }
});

pageBtns.forEach((element, index) => {
    element.addEventListener("click", function () {
        pageSelector(index + 1, departmentList, 0);
    })
});

function pageSelector(page, list, isSearch) {
    departmentsDiv.innerHTML = "";
    let start = (page - 1) * 100;
    let last = start + 100;
    if (isSearch && list.length != 1000) {
        for (let i = 0; i < list.length; i++) {
            console.log("Added");

            addDeptDiv(list[i].id, list[i].name);
        }
        return;
    } else {
        pageBtns[currPage - 1].classList.remove("active");
        currPage = page;
        pageBtns[page - 1].classList.add("active");

        for (let i = start; i < last; i++) {
            addDeptDiv(list[i].id, list[i].name);
        }
    }
}

async function fetchDepartments() {
    fetch("https://openday.kumaraguru.in/api/v1/departments")
        .then((response) => response.text())
        .then((result) => {
            const departments = JSON.parse(result);
            for (let i = 0; i < departments.length; i++) {
                departmentList.push(departments[i]);
            }

            // console.log(departmentList[1]);
            pageSelector(1, departmentList, 0);
            // departments.forEach(element => {
            //     addDeptDiv(element.id, element.name);
            // });
        })
        .catch((error) => console.error(error));
}

fetchDepartments();

var bannerImgs = [];
const banner = document.getElementById("banner");
const bannerLeftBtn = document.querySelector(".banner-btn-left");
const bannerRightBtn = document.querySelector(".banner-btn-right");
var bannerid = 0;
bannerLeftBtn.addEventListener("click", function () {
    setBanner(0);
})
bannerRightBtn.addEventListener("click", function () {
    setBanner(1);
})

const setBanner = (id) => {
    if (id) {
        if (bannerid == 5) {
            bannerid = -1;
        }
        bannerid++;
    } else {
        if (bannerid == 0) {
            bannerid = 6;
        }
        bannerid--;
    }
    banner.src = `https://picsum.photos/id/${bannerid}/1080/720`;
}

fetch("https://openday.kumaraguru.in/api/v1/get_banner_images")
    .then((response) => response.json())
    .then((result) => {
        for (let i = 0; i < result.length; i++) {
            bannerImgs.push(result[i]);
        }
    })
    .catch((e) => console.log(e))

const searchBox = document.getElementById("search-input");

searchBox.addEventListener('input', () => {
    const search = searchBox.value.toLowerCase();
    console.log(search);

    const results = departmentList.filter(element => element.name.toLowerCase().includes(search));
    pageSelector(currPage, results, 1);
    console.log(results);
})

