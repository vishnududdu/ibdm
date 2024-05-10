// Variables
const searchInput = document.getElementById('searchInput');
const mainContent = document.getElementById('mainContent');
let moviedetail;
const apiKey = 'e20d327e';

// Event listeners
searchInput.addEventListener('input', searchMovies);

// Functions
async function searchMovies() {
    const query = searchInput.value.trim();
    if (query === '') {
        mainContent.innerHTML = '';
        return;
    }

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
        console.log(response);
        const data = await response.json();
        if (data.Response === 'True') {
            displaySearchResults(data.Search);
        } else {
            mainContent.innerHTML = '<p>No results found</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displaySearchResults(movies) {
    mainContent.innerHTML = ``;
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <div id="display" style="display: none;"></div>
            <button onclick="displayMovieDetails('${movie.imdbID}')">Details</button>
            <button onclick="addToFavorites('${movie.imdbID}')">Favorite</button>
        `;
        mainContent.appendChild(movieCard);
    });
}

async function viewMovieDetails(id) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
        const movie = await response.json();
        // console.log(moviedetail)
        // displayMovieDetails();
        console.log(movie);
        return movie;
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

function displayMovieDetails(id) {
    console.log('displaymovie');
    console.log(moviedetail);
    sessionStorage.setItem('id',id);
    // console.log("inside");
    // var popupWindow = window.open("movie.html", "Popup", "width=500,height=500");
    window.location.href='movie.html';
    

    
}
async function manipulatemovie(){
    const movieDetails = document.getElementById('movieDetails');
    console.log(movieDetails);
    const id=sessionStorage.getItem('id');
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
        const movie = await response.json();
        // console.log(moviedetail)
        // displayMovieDetails();
        console.log(movie);
        // return movie;
        movieDetails.innerHTML= `
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'}" alt="${movie.Title}">
        <h2>${movie.Title} (${movie.Year})</h2>
        <p>${movie.Plot}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
    `;
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
    // console.log(id);
    // const movie=viewMovieDetails(id);
    // console.log(movie);
    // let movie=moviedetail;
    // console.log(movie,moviedetail);

}

function addToFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
        alert('Added to favorites!');
    } else {
        alert('Movie already in favorites!');
    }
}

function displayFavoriteMovies() {
    const favoriteMovies = document.getElementById('favoriteMovies');
    favoriteMovies.innerHTML =``;
    let favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    if (favorites.length === 0) {
        favoriteMovies.innerHTML = `<p>No favorite movies yet</p>`;
    } else {
        favorites.forEach(async id => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
                const movie = await response.json();
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');
                movieCard.innerHTML = `
                    <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'}" alt="${movie.Title}">
                    <h3>${movie.Title}</h3>
                    <p>${movie.Year}</p>
                    <button onclick="viewMovieDetails('${movie.imdbID}')">Details</button>
                    <button onclick="removeFromFavorites('${movie.imdbID}')">Remove from Favorites</button>
                `;
                favoriteMovies.appendChild(movieCard);
            } catch (error) {
                console.error('Error fetching favorite movie:', error);
            }
        });
    }
}

function removeFromFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const index = favorites.indexOf(id);
    if (index !== -1) {
        favorites.splice(index, 1);
        localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
        displayFavoriteMovies();
    }
}

// Initial call to display favorite movies on page load
// displayFavoriteMovies();
