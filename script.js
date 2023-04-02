const movieList = document.getElementById("movieList");
const movieDetails = document.getElementById("movieDetails");

window.addEventListener("DOMContentLoaded", () => {
  //fetch all movies
  fetch("http://localhost:3000/films")
    .then((res) => res.json())
    .then((movies) => {
      movies.forEach((movie) => {
        //iterate through all movies
        const li = document.createElement("li");
        li.textContent = movie.title;
        movieList.appendChild(li);
        li.addEventListener("click", () => showMovieDetails(movie));
      });
    });

  //function to get movie details
  function showMovieDetails(movie) {
    movieDetails.innerHTML = `
    <img src="${movie.poster}"/>
    <h2> ${movie.title}</h2>
    <p>Runtime ${movie.runtime} min</p>
    <p>Showtime ${movie.showtime}</p>
    <p id="ticketsAvailable">Available tickets ${availableTickets(
      movie.capacity,
      movie.tickets_sold
    )}</p>
    <button id="buyTicket"> Buy Ticket</button>
    `;

    //Function to update tickets
    const buyButton = document.getElementById("buyTicket");
    buyButton.addEventListener("click", (event) => {
      console.log(event);
    });
  }
});
//fuction to calculate available tickets
function availableTickets(capacity, tickets_sold) {
  return capacity - tickets_sold;
}

//Function to update tickets
function updateMovie(movie) {
  fetch(`http://localhost:3000/films/${movie.id}`, {
    method: "PUT",
    headers: {
      "Text-Content": "application/json",
    },
    body: JSON.stringify(movie),
  });
}
