// example search for title http://www.omdbapi.com/?apikey=c85894a7&t=mad+max
// example search for search http://www.omdbapi.com/?apikey=c85894a7&s=mad+max&type=movie

//vars
let results = document.querySelector(".results");
let searchInput = null;

//Events to get search value
document.getElementById("movieSearch").addEventListener("keyup", function() {
  if (event.keyCode == 13) {
    searchInput = this.value;
    fetchSearch();
    document.querySelector(".firstPageItems").classList.add("hidden");
    document.getElementById("copyright").classList.add("hidden");
  }
});

document.getElementById("goButton").addEventListener("click", function() {
  searchInput = document.getElementById("movieSearch").value;
  fetchSearch();
  document.querySelector(".firstPageItems").classList.add("hidden");
  document.getElementById("copyright").classList.add("hidden");
});

//fire search call to omdb
function fetchSearch() {
  fetch("http://www.omdbapi.com/?apikey=c85894a7&type=movie&s=" + searchInput)
    .then(function(response) {
      if (!response.ok) {
        console.error("HTTP error, status = " + response.status);
      }
      return response.json();
    })
    .then(function(myJson) {
      if (myJson.Response == "True") {
        console.log(myJson);
        myJson.Search.forEach(function(film) {
          let movie = document.createElement("div");
          movie.classList.add("movie");
          results.appendChild(movie);
          let div1 = document.createElement("div");
          let div2 = document.createElement("div");
          let div3 = document.createElement("div");
          let img = document.createElement("img");
          img.src = film.Poster;
          div1.appendChild(img);
          div2.innerText = film.Title;
          div3.innerText = film.Year;
          movie.appendChild(div1);
          movie.appendChild(div2);
          movie.appendChild(div3);
          results.classList.remove("hidden");
        });
      } else if (myJson.Response == "False") {
        results.innerText = myJson.Error;
        let back = document.createElement("button");
        back.innerHTML = "Go back ?";
        results.appendChild(back);
        results.style.fontSize = "40px";
        results.style.margin = "400px auto";
        back.style.marginLeft = "25px";
        back.style.width = "124px";
        back.style.height = "53px";
        back.addEventListener("click", function() {
          location.reload(true);
        });
        results.classList.remove("hidden");
      }
    });
}
