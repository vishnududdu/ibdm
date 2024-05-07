// const API_KEY = 'YOUR_OMDB_API_KEY';

function searchMovies() {
  const searchInput = document.getElementById('searchInput').value.trim();
  if (!searchInput) return;

  fetch(`https://www.omdbapi.com/?t=${searchInput}`)
    .then(response => response.json())
    .then(data => displaySearchResults(data.Search))
    .catch(error => console.error('Error fetching data:', error));
}

function displaySearchResults(movies) {
  const searchResultsDiv = document.getElementById('searchResults');
  searchResultsDiv.innerHTML = '';

  if (!movies || movies.length === 0) {
    searchResultsDiv.innerHTML = '<p>No results found</p>';
    return;
  }

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const img = document.createElement('img');
    img.src = movie.Poster;
    img.alt = movie.Title;
    movieCard.appendChild(img);

    const title = document.createElement('h3');
    title.textContent = movie.Title;
    movieCard.appendChild(title);

    const favoriteBtn = document.createElement('button');
    favoriteBtn.textContent = 'Add to Favorites';
    favoriteBtn.classList.add('favorite-btn');
    favoriteBtn.addEventListener('click', () => addToFavorites(movie));
    movieCard.appendChild(favoriteBtn);

    searchResultsDiv.appendChild(movieCard);
  });
}

function addToFavorites(movie) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(movie);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
