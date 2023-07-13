let cinemaForm = document.getElementById("cinema_form");

let vid = null;
let update = false;

const handleCinema = () => {
    let arr = JSON.parse(localStorage.getItem("list_data"));

    let cinName = document.getElementById("cin_name").value;
    let cinLocation = document.getElementById("cin_location").value;
    let cinFacilities = document.getElementById("facilities").value;
    let cid = Math.floor(Math.random() * 1000);

    if (arr === null) {
        localStorage.setItem("list_data", JSON.stringify([{
            cid: cid,
            name: cinName,
            location: cinLocation,
            facilities: cinFacilities,
            poster: poster.files[0].name
        }]));
    } else {
        arr.push({
            cid: cid,
            name: cinName,
            location: cinLocation,
            facilities: cinFacilities,
            poster: poster.files[0].name
        })
        localStorage.setItem("list_data", JSON.stringify(arr));
    }

    

    let dataRef = document.getElementById("table_data");
    let trElem = document.createElement("tr");
    trElem.setAttribute("id", "data-" + cid)

    let td1Elem = document.createElement("td");
    td1Elem.setAttribute("id", "name")
    let td1TxElem = document.createTextNode(cinName);
    td1Elem.appendChild(td1TxElem);

    let td2Elem = document.createElement("td");
    let td2TxElem = document.createTextNode(cinLocation);
    td2Elem.appendChild(td2TxElem);

    let td5Elem = document.createElement("td");
    td5Elem.setAttribute("class", "poster");
    let td7Elem = document.createElement("img");
    td7Elem.setAttribute("src", './image/' + poster.files[0].name);
    td5Elem.appendChild(td7Elem);

    let td3Elem = document.createElement("td");
    td3Elem.setAttribute("class" , "action_btn")
    let btnEdit = document.createElement("button");
    let btnDelet = document.createElement("button");
    let editi = document.createElement("i");
    editi.setAttribute("class", "fa-solid fa-pen-to-square");
    editi.setAttribute("style", "color: #0e830c");
    let deleti = document.createElement("i");
    deleti.setAttribute("class", "fa-sharp fa-solid fa-trash");
    deleti.setAttribute("style", "color: #db340a");
    btnEdit.appendChild(editi);
    btnDelet.appendChild(deleti);
    td3Elem.appendChild(btnEdit);
    td3Elem.appendChild(btnDelet);
    btnDelet.setAttribute("onclick", "removeData(" + cid + ")");
    btnEdit.setAttribute("onclick", "editData(" + cid + ")");

    let td4Elem = document.createElement("td");
    let td4TxElem = document.createTextNode(cinFacilities);
    td4Elem.appendChild(td4TxElem);

    trElem.appendChild(td1Elem);
    trElem.appendChild(td2Elem);
    trElem.appendChild(td4Elem);
    trElem.appendChild(td5Elem);
    trElem.appendChild(td3Elem);

    dataRef.appendChild(trElem);
    event.preventDefault();
}

const removeData = (i) => {
    let arr = JSON.parse(localStorage.getItem("list_data"));
    let removeData = document.getElementById("data-" + i);
    removeData.remove();
    arr.map((v, index) => {
        if (v.cid == i) {
            arr.splice(index, 1);
        }
    })
    localStorage.setItem("list_data", JSON.stringify(arr));
}

const editData = (i) => {
    let arr = JSON.parse(localStorage.getItem("list_data"));
    update = true;
    vid = i;

    arr.map((v, index) => {
        if (v.cid === i) {
            document.getElementById("cin_name").value = arr[index].name;
            document.getElementById("cin_location").value = arr[index].location;
            document.getElementById("facilities").value = arr[index].facilities;
        }
    })
}

const changedata = () => {
    let arr = JSON.parse(localStorage.getItem("list_data"));
    let name = document.getElementById("cin_name").value;
    let loacation = document.getElementById("cin_location").value;
    let facilities = document.getElementById("facilities").value;

    let ParentElem = document.getElementById("data-" + vid);
    ParentElem.children[0].textContent = name;
    ParentElem.children[1].textContent = loacation;
    ParentElem.children[2].textContent = facilities;
    ParentElem.children[3].innerHTML = '<img src = ./image/' + poster.files[0].name + ">";


    index = arr.findIndex((obj => obj.cid === vid));
    arr[index].name = name;
    arr[index].location = loacation;
    arr[index].facilities = facilities;
    arr[index].poster = poster.files[0].name;

    update = false;
    vid = null;
    localStorage.setItem("list_data", JSON.stringify(arr));
    event.preventDefault();
}

const handleDisc = () => {
    if (update) {
        changedata();
    } else {
        handleCinema();
    }
}

const getdata = () => {
    let data = JSON.parse(localStorage.getItem("list_data"));
    console.log(data);

    if (data != null) {
        
        let display = '';
        data.map((v) => {
            display += '<tr id = '+ "data-" + v.cid + '>';
            display += '<td>' + v.name + '</td>';
            display += '<td>' + v.location + '</td>';
            display += '<td>' + v.facilities + '</td>';
            display += '<td class = "poster">'  + '<img src = ' + './image/' + v.poster + '>' +  '</td>';
            display += '<td class = "action_btn">' + '<button onclick = "editData(' + v.cid + ')"> <i class="fa-solid fa-pen-to-square" style="color: #0e830c;"></i> </button>'+ '<button onclick = "removeData(' + v.cid + ')"> <i class="fa-sharp fa-solid fa-trash" style="color: #db340a;"></i> </button>' + '</td>';
            display += '</tr>';
        });
        
        document.getElementById("table_data").innerHTML = display;
    }
}

cinemaForm.addEventListener("submit", handleDisc);
window.onload = getdata();
