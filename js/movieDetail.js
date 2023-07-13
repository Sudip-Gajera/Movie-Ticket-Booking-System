const movieDetails = () => {
    let mid = JSON.parse(sessionStorage.getItem("movie"));
    let allMovieData = JSON.parse(localStorage.getItem("movie_data"));
    console.log(mid);
    console.log(allMovieData);

    let fdata = allMovieData.filter((v) => v.mid === mid);
    console.log(fdata);

    if (fdata != null) {
        let display = '';
        fdata.map((v, index) => {
          display += '<div class ="img-div">' + '<img src = ' + './image/' + v.poster + '>' + '</div>';
          display += '<div class ="box">';
          display += '<h1>' + v.name + '</h1>';
          display += '<h2> About the movie : </h3>';
          display += '<p>' + v.description + '</p>';
          // display += '<button onclick = > Book tickets </button>';
          display += `<button onclick="handleMovieData('${v.name}')"> Book tickets </button>`;
          display += '</div>';
        });
    
        document.getElementById("movie_box").innerHTML = display;
      }
}

window.onload = movieDetails();

const handleMovieData = (name) => {
  sessionStorage.setItem("movie_name", JSON.stringify(name));

  window.location = "http://127.0.0.1:5500/Movie/CinemaList.html";
}
