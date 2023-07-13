const cinemaDetails = () => {
  let cid = JSON.parse(sessionStorage.getItem("cinema"));
  let allCinemaData = JSON.parse(localStorage.getItem("list_data"));

  let fdata = allCinemaData.filter((v) => v.cid === cid);
  console.log(fdata);

  if (fdata != null) {
    let display = '';
    fdata.map((v, index) => {
      display += '<div class ="img-div">' + '<img src = ' + './image/' + v.poster + '>' + '</div>';
      display += '<div class ="box">';
      display += '<h1>' + v.name + '</h1>';
      display += '<p>' + '<i class="fa-solid fa-location-dot" style="color: #9a182c;"></i>' + " " + v.location + '</p>';
      display += '<p>' + '<i class="fa-solid fa-square-parking" style="color: #ffe580;"></i>' + " " + v.facilities + '</p>';
      // display += '<button> Book tickets </button>';
      display += '</div>';
    });

    document.getElementById("cinema_box").innerHTML = display;
  }
}

window.onload = cinemaDetails();
