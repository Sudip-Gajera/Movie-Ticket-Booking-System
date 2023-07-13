let movieForm = document.getElementById("movie_form");

let vid = null;
let update = false;

const handlemovie = () => {
    let M_arr = JSON.parse(localStorage.getItem("movie_data"));

    let movieName = document.getElementById("m_Name").value;
    let movieDesc = document.getElementById("m_Desc").value;
    let cinemaID = parseInt(document.getElementById("cinema").value);
    let time = document.getElementsByName("time");

    let data = JSON.parse(localStorage.getItem("list_data"));

    let cid = document.getElementById("cinema").value;


    let fdata = data.filter((v) => {
        if (v.cid == cid) {
            return v.name;
        }
    });

    let times = [];
    for (let i = 0; i < time.length; i++) {
        times.push(time[i].value);
    }

    let mid = Math.floor(Math.random() * 1000);

    if (M_arr === null) {
        localStorage.setItem("movie_data", JSON.stringify([{
            mid: mid,
            name: movieName,
            description: movieDesc,
            cid: cinemaID,
            time: times,
            poster: poster.files[0].name
        }]));
    } else {
        M_arr.push({
            mid: mid,
            name: movieName,
            description: movieDesc,
            cid: cinemaID,
            time: times,
            poster: poster.files[0].name
        })
        localStorage.setItem("movie_data", JSON.stringify(M_arr));
    }



    let dataRef = document.getElementById("table_data");
    let trElem = document.createElement("tr");
    trElem.setAttribute("id", "data-" + mid)

    let td1Elem = document.createElement("td");
    let td1TxElem = document.createTextNode(movieName);
    td1Elem.appendChild(td1TxElem);

    let td2Elem = document.createElement("td");
    let td2TxElem = document.createTextNode(movieDesc);
    td2Elem.appendChild(td2TxElem);

    let td4Elem = document.createElement("td");
    let td4TxElem = document.createTextNode(times);
    td4Elem.appendChild(td4TxElem);

    let td5Elem = document.createElement("td");
    td5Elem.setAttribute("class", "poster");
    let td7Elem = document.createElement("img");
    td7Elem.setAttribute("src", './image/' + poster.files[0].name);
    
    td5Elem.appendChild(td7Elem);

    let td6Elem = document.createElement("td");
    fdata.map((v) => {
        let td6TxElem = document.createTextNode(v.name);
    td6Elem.appendChild(td6TxElem);
    })

    let td3Elem = document.createElement("td");
    td3Elem.setAttribute("class", "action_btn");
    let btnEdit = document.createElement("button");
    let editi = document.createElement("i");
    editi.setAttribute("class", "fa-solid fa-pen-to-square");
    editi.setAttribute("style", "color: #0e830c");
    let btnDelet = document.createElement("button");
    let deleti = document.createElement("i");
    deleti.setAttribute("class", "fa-sharp fa-solid fa-trash");
    deleti.setAttribute("style", "color: #db340a");
    // let tdEdit = document.createTextNode("E");
    // let tdDelet = document.createTextNode("D");
    btnEdit.appendChild(editi);
    btnDelet.appendChild(deleti);
    td3Elem.appendChild(btnEdit);
    td3Elem.appendChild(btnDelet);
    btnDelet.setAttribute("onclick", "removeData(" + mid + ")");
    btnEdit.setAttribute("onclick", "editData(" + mid + "," + (M_arr.length - 1) + ")");

    trElem.appendChild(td1Elem);
    trElem.appendChild(td2Elem);
    trElem.appendChild(td4Elem);
    trElem.appendChild(td6Elem);
    trElem.appendChild(td5Elem);
    trElem.appendChild(td3Elem);

    dataRef.appendChild(trElem);

    event.preventDefault();
}

const handleTime = () => {
    let tid = Math.floor(Math.random() * 1000);
    let timeRef = document.getElementById("time_data");

    let inputdiv = document.createElement("div");
    let inputElem = document.createElement("input");
    inputElem.setAttribute("name", "time");
    inputdiv.setAttribute("id", "data-" + tid);
    let addbtn = document.createElement("button");
    let delbtn = document.createElement("button");
    addbtn.setAttribute("type", "button");
    addbtn.setAttribute("onclick", "addtime()");
    delbtn.setAttribute("type", "button");
    delbtn.setAttribute("onclick", "removetime(" + tid + ")");

    let addTx = document.createTextNode("+");
    let delTx = document.createTextNode("-");


    inputElem.setAttribute("type", "time");
    addbtn.appendChild(addTx);
    delbtn.appendChild(delTx);
    inputdiv.appendChild(inputElem);
    inputdiv.appendChild(addbtn);
    inputdiv.appendChild(delbtn);
    timeRef.appendChild(inputdiv);

}

const addtime = () => {
    handleTime();
}

const removetime = (i) => {
    console.log(i);
    let removeData = document.getElementById("data-" + i);
    removeData.remove();
}

const removeData = (i) => {
    console.log("delet data");
    let M_arr = JSON.parse(localStorage.getItem("movie_data"));
    let removeData = document.getElementById("data-" + i);
    removeData.remove();
    M_arr.map((v, index) => {
        if (v.mid == i) {
            M_arr.splice(index, 1);
        }
    })
    localStorage.setItem("movie_data", JSON.stringify(M_arr));
}

const editData = (i, l) => {
    update = true;
    let M_arr = JSON.parse(localStorage.getItem("movie_data"));
    let data = JSON.parse(localStorage.getItem("list_data"))
    vid = i;

    M_arr.map((v, index) => {
        if (v.mid === i) {
            let x = v.cid;
            
            document.getElementById("m_Name").value = M_arr[index].name;
            document.getElementById("m_Desc").value = M_arr[index].description;
            data.map((v,index) => {
                if (v.cid == x) {
                    document.getElementById("a").innerHTML = data[index].name;
                }
            })
        }
    })

    let refdiv = document.getElementById("time_data");
    while (refdiv.firstChild) {
        refdiv.removeChild(refdiv.firstChild);
    }

    for (let i = 0 ; i < M_arr[l].time.length ; i++) {
        handleTime();
    }

    let t_Time = document.getElementsByName("time");

    for (let i = 0 ; i < M_arr[l].time.length ; i++) {
        t_Time[i].value = M_arr[l].time[i];
    }
}

const changedata = () => {
    let M_arr = JSON.parse(localStorage.getItem("movie_data"));
    let name = document.getElementById("m_Name").value;
    let description = document.getElementById("m_Desc").value;
    let new_time = document.getElementsByName("time");
    let new_cinema = parseInt(document.getElementById("cinema").value);

    let data = JSON.parse(localStorage.getItem("list_data"));


    let times = [];
    for (let i = 0; i < new_time.length; i++) {
        times.push(new_time[i].value);
    }

    let ParentElem = document.getElementById("data-" + vid);
    ParentElem.children[0].textContent = name;
    ParentElem.children[1].textContent = description;
    ParentElem.children[2].textContent = times;
    ParentElem.children[3].textContent = data.filter((c) => c.cid === new_cinema).map((v) => {return v.name});
    ParentElem.children[4].innerHTML = '<img src = ./image/' + poster.files[0].name + ">";

    index = M_arr.findIndex((obj => obj.mid === vid));
    M_arr[index].name = name;
    M_arr[index].description = description;
    M_arr[index].time = times;
    M_arr[index].poster = poster.files[0].name;
    M_arr[index].cid = new_cinema;

    update = false;
    vid = null;
    localStorage.setItem("movie_data", JSON.stringify(M_arr));
    event.preventDefault();
}

const handleDisc = () => {
    if (update) {
        changedata();
    } else {
        handlemovie();
    }
}

const getdata = () => {
    let data = JSON.parse(localStorage.getItem("movie_data"));
    let cinemaData = JSON.parse(localStorage.getItem("list_data"));
    console.log("cinema data", cinemaData);

    if (data != null) {

        let display = '';
        data.map((v, index) => {
            display += '<tr id = ' + "data-" + v.mid + '>';
            display += '<td>' + v.name + '</td>';
            display += '<td>' + v.description + '</td>';
            display += '<td>' + v.time + '</td>';
            display += '<td>'+ cinemaData.filter((a) => a.cid == v.cid)[0].name + '</td>';
            display += '<td class = "poster">'  + '<img src = ' + './image/' + v.poster + '>' +  '</td>';
            display += '<td class = "action_btn">' + '<button onclick = "editData(' + v.mid + "," + index + ')"> <i class="fa-solid fa-pen-to-square" style="color: #0e830c;"></i> </button>' + '<button onclick = "removeData(' + v.mid + ')"> <i class="fa-sharp fa-solid fa-trash" style="color: #db340a;"></i> </button>' + '</td>';
            display += '</tr>';
        });

        document.getElementById("table_data").innerHTML = display;
    }



    cinemaData.map((v) => {
        let dataRef = document.getElementById("cinema");
        let opElem = document.createElement("option");
        opElem.setAttribute("value", v.cid);
        let opTxElem = document.createTextNode(v.name);
        opElem.appendChild(opTxElem);
        dataRef.appendChild(opElem);
    })
}

movieForm.addEventListener("submit", handleDisc);
window.onload = getdata();