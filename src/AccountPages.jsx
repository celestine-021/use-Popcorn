import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  Clapperboard,
  Heart,
  Pencil,
  Plus,
  Save,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

function FilmList({ title, movies, emptyText, actionLabel, onAction, onOpen }) {
  return (
    <section className="film-list-section">
      <div className="film-list-heading">
        <h3>{title}</h3>
        <span>{movies.length.toString().padStart(2, "0")}</span>
      </div>
      {movies.length ? (
        <div className="film-list">
          {movies.map((movie) => (
            <article className="film-list-row" key={movie.id}>
              <button
                className="film-list-poster"
                onClick={() => onOpen(movie)}
              >
                <img src={movie.poster} alt={`${movie.title} poster`} />
              </button>
              <button className="film-list-copy" onClick={() => onOpen(movie)}>
                <strong>{movie.title}</strong>
                <span>
                  {movie.year} · {movie.genres.join(" / ")}
                </span>
              </button>
              <button
                className="icon-action"
                onClick={() => onAction(movie.id)}
                aria-label={`${actionLabel} ${movie.title}`}
                title={`${actionLabel} ${movie.title}`}
              >
                {actionLabel === "Remove favorite from" ? (
                  <Heart size={16} fill="currentColor" />
                ) : (
                  <X size={16} />
                )}
              </button>
            </article>
          ))}
        </div>
      ) : (
        <p className="list-empty">{emptyText}</p>
      )}
    </section>
  );
}

export function ProfileScreen({
  profile,
  onSaveProfile,
  favorites,
  watched,
  ratings,
  movies,
  onOpenMovie,
  onRemoveFavorite,
  onRemoveWatched,
  onOpenAdmin,
}) {
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => setDraft(profile), [profile]);

  function saveProfile(event) {
    event.preventDefault();
    onSaveProfile(draft);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  const favoriteMovies = movies.filter((movie) => favorites.includes(movie.id));
  const watchedMovies = movies.filter((movie) => watched.includes(movie.id));

  return (
    <section className="account-page">
      <div className="account-kicker">YOUR ACCOUNT</div>
      <div className="account-heading">
        <div>
          <h1>
            My profile<span className="title-period">.</span>
          </h1>
          <p>Your details, favorites, and films you have watched.</p>
        </div>
        <span className="profile-avatar">
          <UserRound size={23} />
        </span>
      </div>

      <div className="profile-layout">
        <section className="account-section profile-details">
          <div className="account-section-heading">
            <div>
              <span className="section-kicker">PERSONAL DETAILS</span>
              <h2>About you</h2>
            </div>
            <Pencil size={16} />
          </div>
          <form className="account-form" onSubmit={saveProfile}>
            <label>
              Full name
              <input
                required
                value={draft.name}
                onChange={(event) =>
                  setDraft({ ...draft, name: event.target.value })
                }
              />
            </label>
            <label>
              Email address
              <input
                required
                type="email"
                value={draft.email}
                onChange={(event) =>
                  setDraft({ ...draft, email: event.target.value })
                }
              />
            </label>
            <div className="account-form-actions">
              <button className="button button-primary" type="submit">
                <Save size={14} />
                {saved ? "Saved" : "Save profile"}
              </button>
              <span>Member since today</span>
            </div>
          </form>
          <div className="profile-stats">
            <div>
              <strong>{Object.keys(ratings).length}</strong>
              <span>FILMS RATED</span>
            </div>
            <div>
              <strong>{favoriteMovies.length}</strong>
              <span>FAVORITES</span>
            </div>
            <div>
              <strong>{watchedMovies.length}</strong>
              <span>WATCHED</span>
            </div>
          </div>
          <div className="admin-entry">
            <div>
              <span className="section-kicker">ADMINISTRATION</span>
              <p>Manage the movie catalog and admin details.</p>
            </div>
            <button className="button button-outline" onClick={onOpenAdmin}>
              <Clapperboard size={15} /> Admin workspace
            </button>
          </div>
        </section>

        <div className="profile-lists">
          <FilmList
            title="Favorite films"
            movies={favoriteMovies}
            emptyText="Tap the heart on a film to keep it close."
            actionLabel="Remove favorite from"
            onAction={onRemoveFavorite}
            onOpen={onOpenMovie}
          />
          <FilmList
            title="Films I have watched"
            movies={watchedMovies}
            emptyText="Mark a film as watched from its details."
            actionLabel="Remove watched status from"
            onAction={onRemoveWatched}
            onOpen={onOpenMovie}
          />
        </div>
      </div>
      <p className="demo-notice">
        Profile data is saved in this browser for this demo.
      </p>
    </section>
  );
}

export function AdminLoginDialog({ adminName, error, onClose, onSubmit }) {
  const [name, setName] = useState(adminName);
  const [password, setPassword] = useState("");

  function submit(event) {
    event.preventDefault();
    onSubmit({ name, password });
  }

  return (
    <div
      className="confirm-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="confirm-dialog admin-login-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-login-title"
      >
        <span className="section-kicker">ADMINISTRATOR</span>
        <h2 id="admin-login-title">Sign in to the studio</h2>
        <p>Use the demo admin account to manage the movie catalog.</p>
        <form className="admin-login-form" onSubmit={submit}>
          <label>
            Admin name
            <input
              required
              autoComplete="username"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            Password
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}
          <div className="editor-actions">
            <button
              type="button"
              className="button button-outline"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              Sign in
            </button>
          </div>
        </form>
        <p className="demo-notice">
          Demo-only sign-in. This browser-only password is not secure for
          production.
        </p>
      </section>
    </div>
  );
}

const emptyMovie = {
  title: "",
  year: new Date().getFullYear(),
  genres: [],
  runtime: "",
  rating: 0,
  votes: "0",
  director: "",
  cast: "",
  description: "",
  poster: "",
  backdrop: "",
};

export function AdminScreen({
  profile,
  onSaveProfile,
  movies,
  ratings,
  onSaveMovie,
  onDeleteMovie,
  onExit,
}) {
  const [profileDraft, setProfileDraft] = useState(profile);
  const [movieDraft, setMovieDraft] = useState(emptyMovie);
  const [editingId, setEditingId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => setProfileDraft(profile), [profile]);

  function startAdd() {
    setEditingId(null);
    setMovieDraft(emptyMovie);
    setFormOpen(true);
  }

  function startEdit(movie) {
    setEditingId(movie.id);
    setMovieDraft({ ...movie, genres: [...movie.genres] });
    setFormOpen(true);
  }

  function saveMovie(event) {
    event.preventDefault();
    onSaveMovie({
      ...movieDraft,
      id: editingId ?? Date.now(),
      year: Number(movieDraft.year),
      genres:
        typeof movieDraft.genres === "string"
          ? movieDraft.genres
              .split(",")
              .map((genre) => genre.trim())
              .filter(Boolean)
          : movieDraft.genres,
    });
    setFormOpen(false);
  }

  function saveAdminProfile(event) {
    event.preventDefault();
    onSaveProfile(profileDraft);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  return (
    <section className="account-page admin-page">
      <div className="account-kicker">ADMINISTRATION · DEMO WORKSPACE</div>
      <div className="account-heading">
        <div>
          <h1>
            Studio desk<span className="title-period">.</span>
          </h1>
          <p>Keep the catalog current and your admin details up to date.</p>
        </div>
        <button className="back-button" onClick={onExit}>
          <ArrowLeft size={15} /> Back to profile
        </button>
      </div>
      <div className="admin-stats">
        <div>
          <span>CATALOG FILMS</span>
          <strong>{movies.length}</strong>
        </div>
        <div>
          <span>USER RATINGS</span>
          <strong>{Object.keys(ratings).length}</strong>
        </div>
        <div>
          <span>ADMIN ACCOUNT</span>
          <strong>{profile.name || "Admin"}</strong>
        </div>
      </div>

      <section className="account-section admin-profile-section">
        <div className="account-section-heading">
          <div>
            <span className="section-kicker">ADMIN PROFILE</span>
            <h2>Account details</h2>
          </div>
          <UserRound size={17} />
        </div>
        <form className="admin-profile-form" onSubmit={saveAdminProfile}>
          <label>
            Admin name
            <input
              required
              value={profileDraft.name}
              onChange={(event) =>
                setProfileDraft({ ...profileDraft, name: event.target.value })
              }
            />
          </label>
          <label>
            Admin email
            <input
              required
              type="email"
              value={profileDraft.email}
              onChange={(event) =>
                setProfileDraft({ ...profileDraft, email: event.target.value })
              }
            />
          </label>
          <button className="button button-primary" type="submit">
            <Save size={14} />
            {saved ? "Saved" : "Save admin profile"}
          </button>
        </form>
      </section>

      <section className="admin-movies-section">
        <div className="admin-list-heading">
          <div>
            <span className="section-kicker">CATALOG</span>
            <h2>Movie management</h2>
          </div>
          <button className="button button-primary" onClick={startAdd}>
            <Plus size={16} /> Add movie
          </button>
        </div>

        {formOpen && (
          <form className="movie-editor" onSubmit={saveMovie}>
            <div className="editor-heading">
              <div>
                <span className="section-kicker">
                  {editingId ? "UPDATE CATALOG" : "NEW ENTRY"}
                </span>
                <h3>{editingId ? "Edit movie" : "Add a movie"}</h3>
              </div>
              <button
                className="icon-action"
                type="button"
                onClick={() => setFormOpen(false)}
                aria-label="Close movie form"
              >
                <X size={17} />
              </button>
            </div>
            <div className="editor-grid">
              <label>
                Title
                <input
                  required
                  value={movieDraft.title}
                  onChange={(event) =>
                    setMovieDraft({ ...movieDraft, title: event.target.value })
                  }
                />
              </label>
              <label>
                Release year
                <input
                  required
                  type="number"
                  min="1888"
                  max="2100"
                  value={movieDraft.year}
                  onChange={(event) =>
                    setMovieDraft({ ...movieDraft, year: event.target.value })
                  }
                />
              </label>
              <label>
                Genres
                <input
                  required
                  placeholder="Drama, Sci-Fi"
                  value={
                    Array.isArray(movieDraft.genres)
                      ? movieDraft.genres.join(", ")
                      : movieDraft.genres
                  }
                  onChange={(event) =>
                    setMovieDraft({ ...movieDraft, genres: event.target.value })
                  }
                />
              </label>
              <label>
                Runtime
                <input
                  placeholder="2h 10m"
                  value={movieDraft.runtime}
                  onChange={(event) =>
                    setMovieDraft({
                      ...movieDraft,
                      runtime: event.target.value,
                    })
                  }
                />
              </label>
              <label>
                Director
                <input
                  value={movieDraft.director}
                  onChange={(event) =>
                    setMovieDraft({
                      ...movieDraft,
                      director: event.target.value,
                    })
                  }
                />
              </label>
              <label>
                Cast
                <input
                  value={movieDraft.cast}
                  onChange={(event) =>
                    setMovieDraft({ ...movieDraft, cast: event.target.value })
                  }
                />
              </label>
              <label className="editor-wide">
                Poster image URL
                <input
                  type="url"
                  placeholder="https://..."
                  value={movieDraft.poster}
                  onChange={(event) =>
                    setMovieDraft({ ...movieDraft, poster: event.target.value })
                  }
                />
              </label>
              <label className="editor-wide">
                Backdrop image URL
                <input
                  type="url"
                  placeholder="https://..."
                  value={movieDraft.backdrop}
                  onChange={(event) =>
                    setMovieDraft({
                      ...movieDraft,
                      backdrop: event.target.value,
                    })
                  }
                />
              </label>
              <label className="editor-wide">
                Description
                <textarea
                  required
                  rows="3"
                  value={movieDraft.description}
                  onChange={(event) =>
                    setMovieDraft({
                      ...movieDraft,
                      description: event.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div className="editor-actions">
              <button
                type="button"
                className="button button-outline"
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="button button-primary">
                <Check size={14} />
                {editingId ? "Save changes" : "Add to catalog"}
              </button>
            </div>
          </form>
        )}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>FILM</th>
                <th>GENRES</th>
                <th>YEAR</th>
                <th>RATING</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td>
                    <div className="admin-film-cell">
                      <img src={movie.poster} alt="" />
                      <strong>{movie.title}</strong>
                    </div>
                  </td>
                  <td>{movie.genres.join(" · ")}</td>
                  <td>{movie.year}</td>
                  <td>{movie.rating ? movie.rating.toFixed(1) : "—"}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="icon-action"
                        onClick={() => startEdit(movie)}
                        aria-label={`Edit ${movie.title}`}
                        title="Edit movie"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        className="icon-action danger-action"
                        onClick={() => setDeleteId(movie.id)}
                        aria-label={`Delete ${movie.title}`}
                        title="Delete movie"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {deleteId !== null && (
        <div
          className="confirm-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDeleteId(null);
          }}
        >
          <section
            className="confirm-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
          >
            <span className="section-kicker">REMOVE FROM CATALOG</span>
            <h2 id="delete-title">Delete this movie?</h2>
            <p>This removes the movie from the demo catalog and saved lists.</p>
            <div className="editor-actions">
              <button
                className="button button-outline"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="button delete-button"
                onClick={() => {
                  onDeleteMovie(deleteId);
                  setDeleteId(null);
                }}
              >
                Delete movie
              </button>
            </div>
          </section>
        </div>
      )}
      <p className="demo-notice">
        Admin tools are a browser-only demo. Production access control must be
        enforced by a backend.
      </p>
    </section>
  );
}
