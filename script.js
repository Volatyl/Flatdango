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
        console.log(movie);
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
    const ticketsAvailable = document.getElementById("ticketsAvailable");
    buyButton.addEventListener("click", (event) => {
      event.preventDefault;
      movie.tickets_sold++;
      ticketsAvailable.textContent = `Available tickets ${availableTickets(
        movie.capacity,
        movie.tickets_sold
      )}`;
      updateMovie(movie);
    });
  }
});
//fuction to calculate available tickets
function availableTickets(capacity, tickets_sold) {
  if (tickets_sold >= capacity) {
    return "SOLD OUT";
  } else {
    return capacity - tickets_sold;
  }
}

//Function to update tickets
function updateMovie(movie) {
  fetch(`http://localhost:3000/films/${movie}`, {
    method: "PUT",
    headers: {
      "Text-Content": "application/json",
    },
    body: JSON.stringify(movie),
  });
}
