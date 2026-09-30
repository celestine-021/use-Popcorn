import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bookmark,
  Check,
  ChevronDown,
  Clapperboard,
  Clock3,
  Film,
  Heart,
  Play,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { AdminLoginDialog, AdminScreen, ProfileScreen } from "./AccountPages";
import "./styles.css";

const movies = [
  {
    id: 1,
    title: "Past Lives",
    year: 2023,
    genres: ["Romance", "Drama"],
    runtime: "1h 45m",
    rating: 4.8,
    votes: "18.2k",
    director: "Celine Song",
    cast: "Greta Lee, Teo Yoo, John Magaro",
    description:
      "Two deeply connected childhood friends are wrested apart after one family emigrates from South Korea. Decades later, they reunite for one fateful week.",
    poster: "https://image.tmdb.org/t/p/w500/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
  },
  {
    id: 2,
    title: "Dune: Part Two",
    year: 2024,
    genres: ["Sci-Fi", "Adventure"],
    runtime: "2h 47m",
    rating: 4.7,
    votes: "42.1k",
    director: "Denis Villeneuve",
    cast: "Timothée Chalamet, Zendaya, Rebecca Ferguson",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
  },
  {
    id: 3,
    title: "The Grand Budapest Hotel",
    year: 2014,
    genres: ["Comedy", "Adventure"],
    runtime: "1h 39m",
    rating: 4.6,
    votes: "31.8k",
    director: "Wes Anderson",
    cast: "Ralph Fiennes, Tony Revolori, Saoirse Ronan",
    description:
      "A legendary concierge and his trusted protégé become embroiled in a priceless painting theft and a family fortune.",
    poster: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/7wO6K3W2e4S8mKpFz8gn0f7c3Sx.jpg",
  },
  {
    id: 4,
    title: "Everything Everywhere All at Once",
    year: 2022,
    genres: ["Sci-Fi", "Comedy"],
    runtime: "2h 19m",
    rating: 4.5,
    votes: "27.4k",
    director: "Daniel Kwan, Daniel Scheinert",
    cast: "Michelle Yeoh, Stephanie Hsu, Ke Huy Quan",
    description:
      "An exhausted laundromat owner is swept into an absurd adventure where she alone can save the world by exploring other universes.",
    poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/ss0Os3uWJfQAENILHZUdX8Tt1OC.jpg",
  },
  {
    id: 5,
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    genres: ["Animation", "Action"],
    runtime: "2h 20m",
    rating: 4.7,
    votes: "36.6k",
    director: "Joaquim Dos Santos",
    cast: "Shameik Moore, Hailee Steinfeld, Oscar Isaac",
    description:
      "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its existence.",
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
  },
  {
    id: 6,
    title: "Poor Things",
    year: 2023,
    genres: ["Sci-Fi", "Romance"],
    runtime: "2h 21m",
    rating: 4.3,
    votes: "15.9k",
    director: "Yorgos Lanthimos",
    cast: "Emma Stone, Mark Ruffalo, Willem Dafoe",
    description:
      "The incredible tale and fantastical evolution of Bella Baxter, a young woman brought back to life by an unorthodox scientist.",
    poster: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/bQS43HSLZzMjZkcHJz4fGc7fNdz.jpg",
  },
  {
    id: 7,
    title: "The Batman",
    year: 2022,
    genres: ["Action", "Crime"],
    runtime: "2h 56m",
    rating: 4.4,
    votes: "39.3k",
    director: "Matt Reeves",
    cast: "Robert Pattinson, Zoë Kravitz, Paul Dano",
    description:
      "When a sadistic killer leaves a trail of clues, Batman must forge new relationships and unmask the culprit.",
    poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/b0PlSFdDwbyK0cf5RxwDpaA6P8p.jpg",
  },
  {
    id: 8,
    title: "Interstellar",
    year: 2014,
    genres: ["Sci-Fi", "Drama"],
    runtime: "2h 49m",
    rating: 4.8,
    votes: "52.7k",
    director: "Christopher Nolan",
    cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    description:
      "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
  },
];

const genres = [
  "All films",
  "Drama",
  "Sci-Fi",
  "Adventure",
  "Comedy",
  "Romance",
  "Action",
  "Animation",
  "Crime",
];
const DEMO_ADMIN_PASSWORD = "123";
const DEFAULT_ADMIN_NAME = "Celestine Wainaina";
const readStored = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

function App() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All films");
  const [sort, setSort] = useState("Featured");
  const [movieCatalog, setMovieCatalog] = useState(() =>
    readStored("usepopcorn-movies", movies),
  );
  const [watchlist, setWatchlist] = useState(() =>
    readStored("usepopcorn-watchlist", []),
  );
  const [favorites, setFavorites] = useState(() =>
    readStored("usepopcorn-favorites", []),
  );
  const [watched, setWatched] = useState(() =>
    readStored("usepopcorn-watched", []),
  );
  const [ratings, setRatings] = useState(() =>
    readStored("usepopcorn-ratings", {}),
  );
  const [profile, setProfile] = useState(() =>
    readStored("usepopcorn-profile", {
      name: "Movie Fan",
      email: "viewer@example.com",
    }),
  );
  const [adminProfile, setAdminProfile] = useState(() => {
    const storedProfile = readStored("usepopcorn-admin-profile", null);
    if (!storedProfile) {
      return { name: DEFAULT_ADMIN_NAME, email: "admin@example.com" };
    }
    return storedProfile.name === "Cinema Admin"
      ? { ...storedProfile, name: DEFAULT_ADMIN_NAME }
      : storedProfile;
  });
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState("");
  const [activeMovie, setActiveMovie] = useState(null);
  const [ratingDraft, setRatingDraft] = useState(0);
  const [view, setView] = useState("Discover");
  const [collectionTab, setCollectionTab] = useState("Watchlist");

  useEffect(
    () =>
      localStorage.setItem("usepopcorn-movies", JSON.stringify(movieCatalog)),
    [movieCatalog],
  );
  useEffect(
    () =>
      localStorage.setItem("usepopcorn-watchlist", JSON.stringify(watchlist)),
    [watchlist],
  );
  useEffect(
    () =>
      localStorage.setItem("usepopcorn-favorites", JSON.stringify(favorites)),
    [favorites],
  );
  useEffect(
    () => localStorage.setItem("usepopcorn-watched", JSON.stringify(watched)),
    [watched],
  );
  useEffect(
    () => localStorage.setItem("usepopcorn-ratings", JSON.stringify(ratings)),
    [ratings],
  );
  useEffect(
    () => localStorage.setItem("usepopcorn-profile", JSON.stringify(profile)),
    [profile],
  );
  useEffect(
    () =>
      localStorage.setItem(
        "usepopcorn-admin-profile",
        JSON.stringify(adminProfile),
      ),
    [adminProfile],
  );

  const visibleMovies = useMemo(() => {
    let result = movieCatalog.filter((movie) => {
      const selectedList = {
        Watchlist: watchlist,
        Favorites: favorites,
        Watched: watched,
      }[collectionTab];
      const matchesView =
        view !== "Collection" || selectedList.includes(movie.id);
      const matchesGenre =
        genre === "All films" || movie.genres.includes(genre);
      const searchText =
        `${movie.title} ${movie.genres.join(" ")} ${movie.year} ${movie.director} ${movie.cast}`.toLowerCase();
      return (
        matchesView &&
        matchesGenre &&
        searchText.includes(query.toLowerCase().trim())
      );
    });
    if (sort === "Highest rated")
      result = [...result].sort((a, b) => b.rating - a.rating);
    if (sort === "Newest") result = [...result].sort((a, b) => b.year - a.year);
    if (sort === "A to Z")
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }, [
    collectionTab,
    favorites,
    genre,
    movieCatalog,
    query,
    sort,
    view,
    watched,
    watchlist,
  ]);

  function openMovie(movie) {
    setActiveMovie(movie);
    setRatingDraft(ratings[movie.id] ?? 0);
  }

  function saveRating() {
    if (!activeMovie || !ratingDraft) return;
    setRatings((current) => ({ ...current, [activeMovie.id]: ratingDraft }));
    setActiveMovie(null);
  }

  function signInAdmin(credentials) {
    const nameMatches =
      credentials.name.trim().toLocaleLowerCase() ===
      adminProfile.name.trim().toLocaleLowerCase();
    if (!nameMatches || credentials.password !== DEMO_ADMIN_PASSWORD) {
      setAdminLoginError("Admin name or password is incorrect.");
      return;
    }
    setAdminLoginError("");
    setAdminLoginOpen(false);
    setView("Admin");
  }

  const toggleWatchlist = (id) =>
    setWatchlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  const toggleFavorite = (id) =>
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  const toggleWatched = (id) =>
    setWatched((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  const saveMovie = (movie) =>
    setMovieCatalog((current) =>
      current.some((item) => item.id === movie.id)
        ? current.map((item) => (item.id === movie.id ? movie : item))
        : [movie, ...current],
    );
  const deleteMovie = (id) => {
    setMovieCatalog((current) => current.filter((movie) => movie.id !== id));
    setWatchlist((current) => current.filter((movieId) => movieId !== id));
    setFavorites((current) => current.filter((movieId) => movieId !== id));
    setWatched((current) => current.filter((movieId) => movieId !== id));
    setRatings((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a
          className="brand"
          href="#top"
          onClick={() => setView("Discover")}
          aria-label="usepopcorn home"
        >
          <span className="brand-mark">
            <Clapperboard size={18} strokeWidth={2.2} />
          </span>
          <span>
            usepopcorn<span className="brand-period">.</span>
          </span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <button
            className={view === "Discover" ? "nav-link active" : "nav-link"}
            onClick={() => setView("Discover")}
          >
            Discover
          </button>
          <button
            className={view === "Collection" ? "nav-link active" : "nav-link"}
            onClick={() => {
              setView("Collection");
              setCollectionTab("Watchlist");
            }}
          >
            My collection <span className="nav-count">{watchlist.length}</span>
          </button>
        </nav>
        {view !== "Profile" && view !== "Admin" && (
          <label className="search-box">
            <Search size={17} aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Films, people, genres..."
              aria-label="Search films, people, and genres"
            />
            <kbd>/</kbd>
          </label>
        )}
        <button
          className="avatar"
          title="Open profile"
          aria-label="Open profile"
          onClick={() => setView("Profile")}
        >
          {profile.name.trim().charAt(0).toUpperCase() || "U"}
        </button>
      </header>

      <main id="top">
        {view === "Profile" && (
          <ProfileScreen
            profile={profile}
            onSaveProfile={setProfile}
            favorites={favorites}
            watched={watched}
            ratings={ratings}
            movies={movieCatalog}
            onOpenMovie={openMovie}
            onRemoveFavorite={toggleFavorite}
            onRemoveWatched={toggleWatched}
            onOpenAdmin={() => {
              setAdminLoginError("");
              setAdminLoginOpen(true);
            }}
          />
        )}
        {view === "Admin" && (
          <AdminScreen
            profile={adminProfile}
            onSaveProfile={setAdminProfile}
            movies={movieCatalog}
            ratings={ratings}
            onSaveMovie={saveMovie}
            onDeleteMovie={deleteMovie}
            onExit={() => setView("Profile")}
          />
        )}
        {(view === "Discover" || view === "Collection") && (
          <>
            {view === "Discover" &&
              !query &&
              genre === "All films" &&
              movieCatalog.length > 0 && (
                <section className="feature" aria-label="Featured film">
                  <img
                    className="feature-image"
                    src={movieCatalog[0].backdrop}
                    alt=""
                  />
                  <div className="feature-shade" />
                  <div className="feature-content">
                    <div className="eyebrow">
                      <span className="eyebrow-dot" /> THE POPCORN PICK{" "}
                      <span className="eyebrow-line" />
                    </div>
                    <h1>{movieCatalog[0].title}</h1>
                    <p className="feature-caption">
                      {movieCatalog[0].description}
                    </p>
                    <div className="feature-meta">
                      <span className="score">
                        <Star size={15} fill="currentColor" />{" "}
                        {movieCatalog[0].rating || "New"}
                      </span>
                      <span>{movieCatalog[0].year}</span>
                      <span>{movieCatalog[0].genres.join(" · ")}</span>
                      <span>{movieCatalog[0].runtime}</span>
                    </div>
                    <div className="feature-actions">
                      <button
                        className="button button-primary"
                        onClick={() => openMovie(movieCatalog[0])}
                      >
                        <Play size={15} fill="currentColor" /> Explore film
                      </button>
                      <button
                        className="button button-quiet"
                        onClick={() => toggleWatchlist(movieCatalog[0].id)}
                      >
                        {watchlist.includes(movieCatalog[0].id) ? (
                          <Check size={16} />
                        ) : (
                          <Bookmark size={16} />
                        )}{" "}
                        {watchlist.includes(movieCatalog[0].id)
                          ? "In your watchlist"
                          : "Save for later"}
                      </button>
                    </div>
                  </div>
                  <div className="feature-index">
                    <span>01</span>
                    <i />
                    <span>04</span>
                  </div>
                  <span className="feature-credit">
                    THE POPCORN PICK · 01 / 04
                  </span>
                </section>
              )}

            <section className="catalog-section">
              <div className="catalog-heading">
                <div>
                  <div className="section-kicker">
                    {view === "Collection"
                      ? "YOUR PERSONAL SHELF"
                      : "A GOOD PLACE TO START"}
                  </div>
                  <h2>
                    {view === "Collection"
                      ? collectionTab === "Watchlist"
                        ? "Saved for later"
                        : collectionTab === "Favorites"
                          ? "Favorite films"
                          : "Films you have watched"
                      : query || genre !== "All films"
                        ? "Find your film"
                        : "Worth your time"}
                    <span className="title-period">.</span>
                  </h2>
                </div>
                <div className="sort-control">
                  <SlidersHorizontal size={15} />
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    aria-label="Sort films"
                  >
                    <option>Featured</option>
                    <option>Highest rated</option>
                    <option>Newest</option>
                    <option>A to Z</option>
                  </select>
                  <ChevronDown size={13} />
                </div>
              </div>
              {view === "Collection" && (
                <div
                  className="collection-tabs"
                  role="tablist"
                  aria-label="Your movie lists"
                >
                  {["Watchlist", "Favorites", "Watched"].map((tab) => (
                    <button
                      key={tab}
                      role="tab"
                      aria-selected={collectionTab === tab}
                      className={
                        collectionTab === tab
                          ? "collection-tab active"
                          : "collection-tab"
                      }
                      onClick={() => setCollectionTab(tab)}
                    >
                      {tab}
                      <span>
                        {tab === "Watchlist"
                          ? watchlist.length
                          : tab === "Favorites"
                            ? favorites.length
                            : watched.length}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              <div
                className="genre-row"
                role="group"
                aria-label="Filter by genre"
              >
                {genres.map((item) => (
                  <button
                    key={item}
                    className={
                      genre === item ? "genre-chip selected" : "genre-chip"
                    }
                    onClick={() => setGenre(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="results-line">
                <span>{visibleMovies.length} FILMS</span>
                <span className="results-note">
                  <Sparkles size={13} /> Curated for the curious
                </span>
              </div>

              {visibleMovies.length > 0 ? (
                <div className="movie-grid">
                  {visibleMovies.map((movie, index) => (
                    <article
                      className="movie-card"
                      key={movie.id}
                      style={{ "--card-index": index }}
                    >
                      <button
                        className="poster-button"
                        onClick={() => openMovie(movie)}
                        aria-label={`View ${movie.title}`}
                      >
                        <img
                          className="poster"
                          src={movie.poster}
                          alt={`${movie.title} poster`}
                          loading={index > 3 ? "lazy" : "eager"}
                        />
                        <span className="poster-gradient" />
                        <span className="poster-rating">
                          <Star size={12} fill="currentColor" />{" "}
                          {movie.rating.toFixed(1)}
                        </span>
                        <span className="poster-open">
                          <Play size={17} fill="currentColor" />
                        </span>
                      </button>
                      <div className="card-copy">
                        <div className="movie-title-row">
                          <button
                            className="movie-title"
                            onClick={() => openMovie(movie)}
                          >
                            {movie.title}
                          </button>
                          <div className="movie-card-actions">
                            <button
                              className={
                                favorites.includes(movie.id)
                                  ? "save-button favorite-active"
                                  : "save-button"
                              }
                              onClick={() => toggleFavorite(movie.id)}
                              aria-label={
                                favorites.includes(movie.id)
                                  ? `Remove ${movie.title} from favorites`
                                  : `Add ${movie.title} to favorites`
                              }
                              title={
                                favorites.includes(movie.id)
                                  ? "Remove favorite"
                                  : "Add to favorites"
                              }
                            >
                              <Heart
                                size={16}
                                fill={
                                  favorites.includes(movie.id)
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            </button>
                            <button
                              className={
                                watchlist.includes(movie.id)
                                  ? "save-button saved"
                                  : "save-button"
                              }
                              onClick={() => toggleWatchlist(movie.id)}
                              aria-label={
                                watchlist.includes(movie.id)
                                  ? `Remove ${movie.title} from watchlist`
                                  : `Add ${movie.title} to watchlist`
                              }
                              title={
                                watchlist.includes(movie.id)
                                  ? "Remove from watchlist"
                                  : "Add to watchlist"
                              }
                            >
                              {watchlist.includes(movie.id) ? (
                                <Check size={16} />
                              ) : (
                                <Bookmark size={16} />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="movie-subtitle">
                          {movie.year}
                          <span>·</span>
                          {movie.genres.slice(0, 2).join(" / ")}
                        </div>
                        {ratings[movie.id] && (
                          <div className="your-rating">
                            <Star size={11} fill="currentColor" /> YOUR RATING{" "}
                            {ratings[movie.id]}/5
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <Film size={25} />
                  <h3>
                    {view === "Collection" && collectionTab === "Watchlist"
                      ? "Your shelf is waiting."
                      : view === "Collection" && collectionTab === "Favorites"
                        ? "No favorites saved yet."
                        : view === "Collection" && collectionTab === "Watched"
                          ? "Your watched list is empty."
                          : "No films found."}
                  </h3>
                  <p>
                    {view === "Collection"
                      ? "Save a film that catches your eye and it will be here."
                      : "Try another title, person, or genre."}
                  </p>
                  <button
                    className="text-button"
                    onClick={() => {
                      setQuery("");
                      setGenre("All films");
                      if (view === "Collection") setView("Discover");
                    }}
                  >
                    Explore all films <span>→</span>
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark">
            <Clapperboard size={16} />
          </span>
          <span>
            usepopcorn<span className="brand-period">.</span>
          </span>
        </a>
        <span>GOOD FILMS. BETTER CONVERSATIONS.</span>
        <span>
          MADE FOR THE LOVE OF IT <span className="footer-star">✳</span>
        </span>
      </footer>

      {adminLoginOpen && (
        <AdminLoginDialog
          adminName={adminProfile.name}
          error={adminLoginError}
          onClose={() => setAdminLoginOpen(false)}
          onSubmit={signInAdmin}
        />
      )}

      {activeMovie && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveMovie(null);
          }}
        >
          <section
            className="movie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
          >
            <button
              className="modal-close"
              onClick={() => setActiveMovie(null)}
              aria-label="Close details"
            >
              <X size={19} />
            </button>
            <div className="modal-art">
              <img src={activeMovie.backdrop} alt="" />
              <div />
            </div>
            <div className="modal-body">
              <div className="section-kicker">
                FILM NOTES · {activeMovie.year}
              </div>
              <h2 id="dialog-title">{activeMovie.title}</h2>
              <div className="modal-meta">
                <span className="score">
                  <Star size={14} fill="currentColor" /> {activeMovie.rating}
                </span>
                <span>{activeMovie.runtime}</span>
                <span>{activeMovie.genres.join(" · ")}</span>
              </div>
              <p className="modal-description">{activeMovie.description}</p>
              <div className="credits">
                <div>
                  <span>DIRECTOR</span>
                  <strong>{activeMovie.director}</strong>
                </div>
                <div>
                  <span>STARRING</span>
                  <strong>{activeMovie.cast}</strong>
                </div>
              </div>
              <div className="modal-rating">
                <div>
                  <span className="section-kicker">YOUR RATING</span>
                  <span className="rating-hint">
                    {ratingDraft
                      ? `${ratingDraft} out of 5`
                      : "Give it a little love"}
                  </span>
                </div>
                <div
                  className="star-picker"
                  role="radiogroup"
                  aria-label="Your rating out of five"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRatingDraft(star)}
                      role="radio"
                      aria-checked={ratingDraft === star}
                      aria-label={`${star} star${star === 1 ? "" : "s"}`}
                    >
                      <Star
                        size={22}
                        fill={ratingDraft >= star ? "currentColor" : "none"}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button
                  className="button button-primary"
                  disabled={!ratingDraft}
                  onClick={saveRating}
                >
                  {ratings[activeMovie.id] ? "Update rating" : "Save rating"}
                </button>
                <button
                  className="button button-outline"
                  onClick={() => toggleWatchlist(activeMovie.id)}
                >
                  {watchlist.includes(activeMovie.id) ? (
                    <Check size={15} />
                  ) : (
                    <Bookmark size={15} />
                  )}
                  {watchlist.includes(activeMovie.id) ? "Saved" : "Watchlist"}
                </button>
                <button
                  className="button button-outline"
                  onClick={() => toggleFavorite(activeMovie.id)}
                >
                  <Heart
                    size={15}
                    fill={
                      favorites.includes(activeMovie.id)
                        ? "currentColor"
                        : "none"
                    }
                  />
                  {favorites.includes(activeMovie.id)
                    ? "Favorite"
                    : "Add favorite"}
                </button>
                <button
                  className="button button-outline"
                  onClick={() => toggleWatched(activeMovie.id)}
                >
                  <Check size={15} />
                  {watched.includes(activeMovie.id)
                    ? "Watched"
                    : "Mark watched"}
                </button>
              </div>
              <div className="ratings-footnote">
                <Clock3 size={12} /> {activeMovie.votes} community ratings
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
