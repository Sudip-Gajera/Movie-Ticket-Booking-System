let temp_cID = [];

const handleCinemaDetails = () => {
    let name = JSON.parse(sessionStorage.getItem("movie_name"));
    let allMovieData = JSON.parse(localStorage.getItem("movie_data"));
    let allCinemaData = JSON.parse(localStorage.getItem("list_data"));

    let fdata = allMovieData.filter((v) => v.name === name);
    let cid = fdata.map((v) => v.cid);

    if (fdata != null) {
        fdata.map((v, index) => {
            temp_cID.push(v.cid);
        });
    }
    let display = '';
    allCinemaData.map((v) => {
        temp_cID.map((h) => {
            if (v.cid == h) {
                display += '<div class ="box">';
                display += '<h3>' + v.name + '</h3>';
            }
        });
        let fdata = allMovieData.filter((m) => m.cid === v.cid && m.name == name);
        
        if(fdata != null){
            fdata.map((f) => {
                for (let j = 0 ; j < f.time.length ; j++) {
                    display += `<button onclick = "handleTime('${f.time[j]}' , ${v.cid})"> ${f.time[j]} </button>`
                }
            })
            display += '</div>';
        }
    })
    document.getElementById("cinema_name").innerHTML = display;
}


window.onload = handleCinemaDetails();

// const handleMovieData = (i) => {
//     console.log(i);
//     let name = JSON.parse(sessionStorage.getItem("movie_name"));
//     let allMovieData = JSON.parse(localStorage.getItem("movie_data"));

//     let fdata = allMovieData.filter((v) => v.cid === i && v.name == name);
//     // console.log(fdata);

//     var print = "";
//     fdata.map((v) => {
//         function printInv() {
//             for (var j = 0; j < v.time.length; j++) {
//                 print += "<br>" + time[j].time;
//             }
//             }
//             if(v.time.length >= 1) {
//                 document.getElementById('abc').innerHTML = printInv();
//             }
//     })
// }

const handleTime = (i, cid) => {
    sessionStorage.setItem("movie_time", JSON.stringify(i));
    sessionStorage.setItem("movie_cid", JSON.stringify(cid));

    window.location = "http://127.0.0.1:5500/seat.html";
    // window.location = "http://127.0.0.1:5500/Movie/seat.html";
}

