const displayM_Data = (f_M_data) => {
  let movieData = JSON.parse(localStorage.getItem("movie_data"));

let filterMovieData = movieData.filter((v, i) => movieData.findIndex((s) => v.name === s.name) === i);

localStorage.setItem("filterMovieData", JSON.stringify(filterMovieData));

  if (f_M_data) {
    let displayMData = '';
    f_M_data.map((v, index) => {
      displayMData += '<div class ="boxs" onclick = "handleMovie(' + v.mid + ')">';
      displayMData += '<div class ="movieImg-div">' + '<img src = ' + './image/' + v.poster + '>' + '</div>';
      displayMData += '<div class ="movieBox">';
      displayMData += '<h2>' + v.name + '</h2>';
      displayMData += '</div>';
      displayMData += '</div>';
    });

    document.getElementById("Movie_data").innerHTML = displayMData;
  } else {
    let displayMData = '';
    filterMovieData.map((v, index) => {
      displayMData += '<div class ="boxs" onclick = "handleMovie(' + v.mid + ')">';
      displayMData += '<div class ="movieImg-div">' + '<img src = ' + './image/' + v.poster + '>' + '</div>';
      displayMData += '<div class ="movieBox">';
      displayMData += '<h2>' + v.name + '</h2>';
      displayMData += '</div>';
      displayMData += '</div>';
    });

    document.getElementById("Movie_data").innerHTML = displayMData;
  }
}

const handleMovie = (i) => {
  sessionStorage.setItem("movie", JSON.stringify(i));

  window.location = "http://127.0.0.1:5500/movieDetail.html";
  // window.location = "http://127.0.0.1:5500/Movie/movieDetail.html";
}

const handleCinema = (i) => {
  sessionStorage.setItem("cinema", JSON.stringify(i));

  window.location = "http://127.0.0.1:5500/cinemaDetail.html";
  // window.location = "http://127.0.0.1:5500/Movie/cinemaDetail.html";
}


const displayData = (fdata) => {

  let cinemaData = JSON.parse(localStorage.getItem("list_data"));

  if (fdata) {
    let display = '';
    fdata.map((v, index) => {
      display += '<div class ="boxs" onclick = "handleCinema(' + v.cid + ')">';
      display += '<div class ="img-div">' + '<img src = ' + './image/' + v.poster + '>' + '</div>';
      display += '<div class ="box">';
      display += '<h2>' + v.name + '</h2>';
      display += '<p>' + '<i class="fa-solid fa-location-dot" style="color: #9a182c;"></i>' + " " + v.location + '</p>';
      display += '<p>' + '<i class="fa-solid fa-square-parking" style="color: #654c06;"></i>' + " " + v.facilities + '</p>';
      display += '</div>';
      display += '</div>';
    });

    document.getElementById("Cinema_data").innerHTML = display;
  } else {
    let display = '';
    cinemaData.map((v, index) => {
      display += '<div class ="boxs" onclick = "handleCinema(' + v.cid + ')">';
      display += '<div class ="img-div">' + '<img src = ' + './image/' + v.poster + '>' + '</div>';
      display += '<div class ="box">';
      display += '<h2>' + v.name + '</h2>';
      display += '<p>' + '<i class="fa-solid fa-location-dot" style="color: #9a182c;"></i>' + " " + v.location + '</p>';
      display += '<p>' + '<i class="fa-solid fa-square-parking" style="color: #654c06;"></i>' + " " + v.facilities + '</p>';
      display += '</div>';
      display += '</div>';
    });

    document.getElementById("Cinema_data").innerHTML = display;
  }
}

const filterFunction = () => {
  let cinemaData = JSON.parse(localStorage.getItem("list_data"));
  let input = document.getElementById('cData').value;

  let fdata = cinemaData.filter((c) => (c.name.toLowerCase().includes(input.toLowerCase())) || (c.location.toLowerCase().includes(input.toLowerCase())) || (c.facilities.toLowerCase().includes(input.toLowerCase())));

  displayData(fdata);
}

const moviefilter = () => {
  let filterMovieData = JSON.parse(localStorage.getItem("filterMovieData"));
  let input = document.getElementById('mData').value;

  let f_M_data = filterMovieData.filter((c) => (c.name.toLowerCase().includes(input.toLowerCase())));
  displayM_Data(f_M_data);
}

window.onload = displayData();
window.onload = displayM_Data();
