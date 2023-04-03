let movieList = document.getElementById("movieList");
let movieDetails = document.getElementById("movieDetails");
let movies = [];

window.addEventListener("DOMContentLoaded", () => {
  //fetch all movies
  fetch("http://localhost:3000/films")
    .then((res) => res.json())
    .then((data) => {
      movies = data;
      movies.forEach((movie) => {
        //iterate through all movies
        const li = document.createElement("li");
        li.classList.add("movies");
        li.textContent = movie.title;
        movieList.appendChild(li);
        li.addEventListener("click", () => showMovieDetails(movie));
      });
      showMovieDetails(movies[0]);
    });

  //function to get movie details
  function showMovieDetails(movie) {
    movieDetails.innerHTML = `
    <img src="${movie.poster}"/>
    <h2> ${movie.title}</h2>
    <p>Runtime ${movie.runtime} min</p>
    <p>Showtime ${movie.showtime}</p>
    <p id="ticketsAvailable"> ${availableTickets(
      movie.capacity,
      movie.tickets_sold
    )}</p>
    <button id="buyTicket"> Buy Ticket</button>
    `;

    //Function to buy tickets
    const buyButton = document.getElementById("buyTicket");
    const ticketsAvailable = document.getElementById("ticketsAvailable");
    buyButton.addEventListener("click", () => {
      if (movie.tickets_sold >= movie.capacity) {
        ticketsAvailable.textContent = "SOLD OUT";
      } else {
        movie.tickets_sold++;
        updateMovie(movie);
        ticketsAvailable.textContent = `${availableTickets(
          movie.capacity,
          movie.tickets_sold
        )}`;
      }
    });
  }
});
//fuction to calculate available tickets
function availableTickets(capacity, tickets_sold) {
  if (tickets_sold >= capacity) {
    return "SOLD OUT";
  } else {
    return `Available tickets: ${capacity - tickets_sold}`;
  }
}

//Function to update tickets
function updateMovie(movie) {
  fetch(`http://localhost:3000/films/${movie.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  }).then(() => {
    // update the movie object in memory
    const index = movies.findIndex((m) => m.id === movie.id);
    movies[index] = movie;
  });
}
