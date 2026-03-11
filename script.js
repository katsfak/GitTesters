let movieName = document.getElementById("movieName");
let searchButton = document.getElementById("searchButton");

// Function to fetch movie data from the OMDB API
async function fetchMovieData(movie) {
    let movieDetails = document.getElementById("movieDetails");

    try {
        let response = await fetch(`/api/movie?title=${encodeURIComponent(movie)}`);
        let data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Request failed");
        }

        if (data.Response === "True") {
            displayMovieData(data);
        } else {
            alert(data.Error || "Movie not found!");
        }
    } catch (error) {
        console.error("Error fetching movie data:", error);
        movieDetails.innerHTML = "";
        alert(error.message || "An error occurred while fetching movie data. Please try again.");
    }
}

// Function to display movie data on the webpage
function displayMovieData(data) {
    let movieDetails = document.getElementById("movieDetails");
    let posterHTML = data.Poster !== "N/A" ? `<img src="${data.Poster}" alt="${data.Title} Poster">` : "<p>Poster not available</p>";
    movieDetails.innerHTML = `
        <h2>${data.Title} (${data.Year})</h2>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Director:</strong> ${data.Director}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        ${posterHTML}
    `;
}

// Event listener for the search button
searchButton.addEventListener("click", () => {
    let movie = movieName.value.trim();
    if (movie) {
        fetchMovieData(movie);
    } else {
        alert("Please enter a movie name!");
    }
});

movieName.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});