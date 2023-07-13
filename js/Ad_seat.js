let Ref_form = document.getElementById("seat_form");
let seat_Ref = document.getElementById("seat");
let movie_Ref = document.getElementById("movie");

let vid = null;
let update = false;
let movie_update = false;

const handleSubmit = () => {
    let S_arr = JSON.parse(localStorage.getItem("seat_data"));

    let data = JSON.parse(localStorage.getItem("list_data"));
    let M_data = JSON.parse(localStorage.getItem("movie_data"));

    let cid = document.getElementById("seat").value;
    let mid = document.getElementById("movie").value;


    let fdata = data.filter((v) => {
        if (v.cid == cid) {
            return v.name;
        }
    });

    let f_M_data = M_data.filter((v) => {
        if (v.mid == mid) {
            return v.name;
        }
    });

    let sid = Math.floor(Math.random() * 1000);
    let cinemaID = parseInt(document.getElementById("seat").value);
    let movieID = parseInt(document.getElementById("movie").value);
    let time = document.getElementById("time").value;
    let seat = parseInt(document.getElementById("total_Seat").value);
    let price = parseInt(document.getElementById("price").value);

    let totalSeat = new Array(seat).fill(0);

    if (S_arr === null) {
        localStorage.setItem("seat_data", JSON.stringify([{
            sid: sid,
            cid: cinemaID,
            mid: movieID,
            time: time,
            seat: totalSeat,
            price: price
        }]));
    } else {
        S_arr.push({
            sid: sid,
            cid: cinemaID,
            mid: movieID,
            time: time,
            seat: totalSeat,
            price: price
        })
        localStorage.setItem("seat_data", JSON.stringify(S_arr));
    }

    let dataRef = document.getElementById("table_data");
    let trElem = document.createElement("tr");
    trElem.setAttribute("id", "data-" + sid);

    let td1Elem = document.createElement("td");
    fdata.map((v) => {
        let td1TxElem = document.createTextNode(v.name);
        td1Elem.appendChild(td1TxElem);
    })

    let td2Elem = document.createElement("td");
    f_M_data.map((v) => {
        let td2TxElem = document.createTextNode(v.name);
        td2Elem.appendChild(td2TxElem);
    })


    let td4Elem = document.createElement("td");
    let td4TxElem = document.createTextNode(time);
    td4Elem.appendChild(td4TxElem);

    let td5Elem = document.createElement("td");
    let td5TxElem = document.createTextNode(seat);
    td5Elem.appendChild(td5TxElem);

    let td6Elem = document.createElement("td");
    let td6TxElem = document.createTextNode(price);
    td6Elem.appendChild(td6TxElem);

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
    btnDelet.setAttribute("onclick", "removeData(" + sid + ")");
    btnEdit.setAttribute("onclick", "editData(" + sid + ")");

    trElem.appendChild(td1Elem);
    trElem.appendChild(td2Elem);
    trElem.appendChild(td4Elem);
    trElem.appendChild(td5Elem);
    trElem.appendChild(td6Elem);
    trElem.appendChild(td3Elem);

    dataRef.appendChild(trElem);

    event.preventDefault();
}

const removeData = (i) => {
    let S_arr = JSON.parse(localStorage.getItem("seat_data"));
    let removeData = document.getElementById("data-" + i);
    removeData.remove();
    S_arr.map((v, index) => {
        if (v.sid == i) {
            S_arr.splice(index, 1);
        }
    })
    localStorage.setItem("seat_data", JSON.stringify(S_arr));
}

const editData = (i) => {
    console.log(i);
    update = true;
    movie_update = true;
    vid = i;
    let S_arr = JSON.parse(localStorage.getItem("seat_data"));

    let fdata = S_arr.filter((v) => (v.sid == i));
    console.log("AAAAAAA", fdata);
    fdata.map((v, index) => {
        document.getElementById("seat").value = v.cid;
    })


    if (movie_update) {
        handleMovie();
        fdata.map((v, index) => {
            document.getElementById("movie").value = v.mid;
        })
        handleTime();
        fdata.map((v, index) => {
            document.getElementById("time").value = v.time;
        })
    } else {
        handleSubmit();
    }

    S_arr.map((v, index) => {
        if (v.sid === i) {
            document.getElementById("total_Seat").value = S_arr[index].seat.length;
            document.getElementById("price").value = S_arr[index].price;
        }
    })
    movie_update = false;
}

const changedata = () => {
    let cinemaData = JSON.parse(localStorage.getItem("list_data"));
    let movieData = JSON.parse(localStorage.getItem("movie_data"));


    let S_arr = JSON.parse(localStorage.getItem("seat_data"));
    let new_seat = parseInt(document.getElementById("seat").value);
    let new_movie = parseInt(document.getElementById("movie").value);
    let new_time = document.getElementById("time").value;
    let new_total_seat = parseInt(document.getElementById("total_Seat").value);
    let price = parseInt(document.getElementById("price").value);

    let totalSeat = new Array(new_total_seat).fill(0);

    let ParentElem = document.getElementById("data-" + vid);
    ParentElem.children[0].textContent = cinemaData.filter((c) => c.cid === new_seat).map((v) => {return v.name});
    ParentElem.children[1].textContent = movieData.filter((c) => c.mid === new_movie).map((v) => {return v.name});
    ParentElem.children[2].textContent = new_time;
    ParentElem.children[3].textContent = new_total_seat;
    ParentElem.children[4].textContent = price;

    index = S_arr.findIndex((obj => obj.sid === vid));
    S_arr[index].cid = new_seat;
    S_arr[index].mid = new_movie;
    S_arr[index].time = new_time;
    S_arr[index].seat = totalSeat;
    S_arr[index].price = price;

    update = false;
    vid = null;
    localStorage.setItem("seat_data", JSON.stringify(S_arr));

    event.preventDefault();
}

const handleMovie = () => {
    let data = JSON.parse(localStorage.getItem("movie_data"));

    let cid = document.getElementById("seat").value;

    let fdata = data.filter((v) => {
        if (v.cid == cid) {
            return v.name;
        }
    });

    if (fdata != null) {

        let display = '<option>---Select---</option>';
        fdata.map((v, index) => {
            display += '<option value = ' + v.mid + '>' + v.name + '</option>';
        });

        document.getElementById("movie").innerHTML = display;
    }
}

const handleTime = () => {
    let data = JSON.parse(localStorage.getItem("movie_data"));

    let mid = document.getElementById("movie").value;

    let fdata = data.filter((v) => {
        if (v.mid == mid) {
            return v.time;
        }
    });


    if (fdata != null) {

        let display = '<option>---Select---</option>';
        fdata.map((v, index) => {

            for (let i = 0; i < fdata[index].time.length; i++) {
                display += '<option value = ' + v.time[i] + '>' + v.time[i] + '</option>';
            }

        });

        document.getElementById("time").innerHTML = display;
    }
}

const handleDisc = () => {
    if (update) {
        changedata();
    } else {
        handleSubmit();
    }
}

const getdata = () => {

    let data = JSON.parse(localStorage.getItem("seat_data"));
    let cinemaData = JSON.parse(localStorage.getItem("list_data"));
    let movieData = JSON.parse(localStorage.getItem("movie_data"));

    if (data != null) {

        let display = '';
        data.map((v, index) => {
            display += '<tr id = ' + "data-" + v.sid + '>';
            display += '<td>' + cinemaData.filter((c) => c.cid === v.cid)[0].name  + '</td>';
            // display += '<td>' + v.cid + '</td>';
            display += '<td>' + movieData.filter((a) => a.mid === v.mid)[0].name + '</td>';
            // display += '<td>' + v.mid + '</td>';
            display += '<td>' + v.time + '</td>';
            display += '<td>' + v.seat.length + '</td>';
            display += '<td>' + v.price + '</td>';
            display += '<td class = "action_btn">' + '<button onclick = "editData(' + v.sid + "," + index + ')"> <i class="fa-solid fa-pen-to-square" style="color: #0e830c;"></i> </button>' + '<button onclick = "removeData(' + v.sid + ')"> <i class="fa-sharp fa-solid fa-trash" style="color: #db340a;"></i> </button>' + '</td>';
            display += '</tr>';
        });

        document.getElementById("table_data").innerHTML = display;
    }

    if (cinemaData != null) {
        cinemaData.map((v) => {
            let dataRef = document.getElementById("seat");
            let opElem = document.createElement("option");
            opElem.setAttribute("value", v.cid);
            let opTxElem = document.createTextNode(v.name);
            opElem.appendChild(opTxElem);
            dataRef.appendChild(opElem);
        })
    }
}

Ref_form.addEventListener("submit", handleDisc);
seat_Ref.addEventListener("change", handleMovie);
movie_Ref.addEventListener("change", handleTime);
window.onload = getdata();