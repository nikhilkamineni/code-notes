# code-notes
### A note taking app for code snippets

## API USAGE
### ROOT URL: `https://fast-hollows-24925.herokuapp.com/`

#### `/notes`
- [GET] Get all notes. Requires valid JWT.
- [POST] Save new note. `title` and `content` required. Requires valid JWT.

### `/notes/:id`
- [GET] Get note by ID. Requires valid JWT.
- [PUT] Update note by ID. Requires valid JWT.
- [DELETE] Delete note by ID. Requires valid JWT.

### `/users`
- [POST] Create new user. `username` and `password` required.

### `/users/:id`
- Get user by ID. Requires valid JWT.

### `/users/name/:username`
- Get user by username. Requires valid JWT.

### `/login`
- Login user. `username` and `password` required.

#### `/equifax`
- Easter egg.
