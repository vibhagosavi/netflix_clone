
//    JS SCRIPT 

const apiKey = "27a39d952a09f83954385fd8390320e7";
const movieContainer = document.getElementById("movieContainer");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentPage = 1;

// Fetch Trending Movies
async function getTrendingMovies(page = 1) {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&page=${page}`);
  const data = await res.json();
  displayMovies(data.results, movieContainer);
}



// Display Movies (Bootstrap Grid)
function displayMovies(movies, container) {
  container.innerHTML = "";
  if (!movies || movies.length === 0) {
    container.innerHTML = `<p class="text-center text-muted">No movies found.</p>`;
    return;
  }

  movies.forEach((movie, index) => {
    const imagePath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "images/no-image.png";

    // Unique modal ID per container
    const modalId = `${container.id}-movieModal${index}`;

    const col = document.createElement("div");
    col.className = "col";
    col.innerHTML = `
      <div class="card bg-dark text-white h-100 border-0 shadow-sm">
        <img src="${imagePath}" class="card-img-top img-fluid" alt="${movie.title}">
        <div class="card-body">
          <h6 class="card-title" data-bs-toggle="modal" data-bs-target="#${modalId}" style="cursor:pointer;">
            ${movie.title}
          </h6>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header border-secondary">
              <h5 class="modal-title">${movie.title}</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <img src="${imagePath}" class="img-fluid mb-3 rounded">
              <p><strong>Release Date:</strong> ${movie.release_date || "N/A"}</p>
              <p><strong>Rating:</strong> ⭐ ${movie.vote_average || "N/A"}</p>
              <p>${movie.overview || "No description available."}</p>
            </div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}





// Search Movies
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
  const data = await res.json();
  displayMovies(data.results, searchResults);
});

// Pagination
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getTrendingMovies(currentPage);
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  getTrendingMovies(currentPage);
});

// Load Trending Movies
getTrendingMovies();

