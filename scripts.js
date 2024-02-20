const apiKey = '2968055b';
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const moviesContainer = document.getElementById('movies-container');
const favoritesContainer = document.getElementById('favorites-container');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function renderMovies(movies) {
  moviesContainer.innerHTML = '';
  movies.forEach(movie => {
    const isFavorite = favorites.includes(movie.imdbID);
    const movieCard = `
      <div class="movie-card">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <img src="${movie.Poster}" alt="${movie.Title}">
        <button data-id="${movie.imdbID}" class="favorite-button">${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</button>
      </div>
    `;
    moviesContainer.innerHTML += movieCard;
  });
}

function renderFavorites() {
  favoritesContainer.innerHTML = '';
  favorites.forEach(favorite => {
    const movie = JSON.parse(localStorage.getItem(favorite));
    if (movie) {
      const favoriteCard = `
        <div class="movie-card">
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
          <img src="${movie.Poster}" alt="${movie.Title}">
          <button data-id="${movie.imdbID}" class="favorite-button">Remove from Favorites</button>
        </div>
      `;
      favoritesContainer.innerHTML += favoriteCard;
    }
  });
}

function toggleFavorite(event) {
  const movieId = event.target.dataset.id;
  if (favorites.includes(movieId)) {
    favorites = favorites.filter(id => id !== movieId);
  } else {
    favorites.push(movieId);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderFavorites();
  renderMovies(searchResults);
}

searchButton.addEventListener('click', async () => {
  const searchQuery = searchInput.value;
  const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`);
  const data = await response.json();
  const movies = data.Search || [];
  renderMovies(movies);
});

document.addEventListener('click', event => {
  if (event.target.classList.contains('favorite-button')) {
    toggleFavorite(event);
  }
});

renderFavorites();
