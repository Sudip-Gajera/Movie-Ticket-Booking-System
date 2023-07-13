let seat = [];

const handleMovieTime = () => {
    let time = JSON.parse(sessionStorage.getItem("movie_time"));
    let name = JSON.parse(sessionStorage.getItem("movie_name"));
    let cid = JSON.parse(sessionStorage.getItem("movie_cid"));
    let allMovieData = JSON.parse(localStorage.getItem("movie_data"));
    let allSeatData = JSON.parse(localStorage.getItem("seat_data"));

    let fdata = allMovieData.filter((m) => m.cid == cid && m.name == name);
    let mid = null;
    fdata.map((v) => mid = v.mid);

    let fSeatdata = allSeatData.filter((v) => v.mid == mid && v.cid == cid && v.time == time);

    let display = '';
    if (fSeatdata != null) {
        fSeatdata.map((v, i) => {
            for (let j = 0; j < v.seat.length; j++) {
                display += `<button id = ${"btn-" + j} onclick = "handleMoney(${v.price} , ${j})"> ${[j + 1]} </button>`
            }
        })
    }
    document.getElementById("cinema_seat").innerHTML = display;

    fSeatdata.map((v, i) => {
        for (let j = 0; j < v.seat.length; j++) {
            if (v.seat[j] == 1) {
                document.getElementById("btn-" + j).disabled = true;
                document.getElementById("btn-" + j).style.backgroundColor = "gray";
            }
        }
    })

}

const handleMoney = (i, j) => {
    document.getElementById("btn-" + j).disabled = true;
    document.getElementById("btn-" + j).style.backgroundColor = "gray";
    seat.push(j);
    let totalPrice = i * seat.length;
    document.getElementById("seat").innerHTML = seat.length;
    document.getElementById("price").innerHTML = totalPrice + ".00";
}

const pay = () => {
    let time = JSON.parse(sessionStorage.getItem("movie_time"));
    let name = JSON.parse(sessionStorage.getItem("movie_name"));
    let cid = JSON.parse(sessionStorage.getItem("movie_cid"));
    let allMovieData = JSON.parse(localStorage.getItem("movie_data"));
    let allSeatData = JSON.parse(localStorage.getItem("seat_data"));

    let fdata = allMovieData.filter((m) => m.cid == cid && m.name == name);
    let mid = null;
    fdata.map((v) => mid = v.mid);

    let fSeatdata = allSeatData.filter((v) => v.mid == mid && v.cid == cid && v.time == time);

    if (fSeatdata != null) {
        fSeatdata[0].seat.map((v, i) => {
            seat.map((h) => {
                if (i == h) {
                    fSeatdata[0].seat[i] = 1;
                }
            })
        })
    }

    fSeatdata.map((v) => {
        let index = allSeatData.findIndex((s) => s.sid === v.sid);
        if (index > -1) {
            allSeatData[index] = v;
        } else {
            allSeatData = allSeatData.push(v);
        }
    });

    localStorage.setItem("seat_data", JSON.stringify(allSeatData));

    if (seat.length != 0) {
        let popup = document.getElementById("popup");

        popup.classList.add("open_popup");
    } else {
        alert("Please Select Seats");
    }
}

window.onload = handleMovieTime();