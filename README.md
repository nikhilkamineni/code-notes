# code-notes
### A note taking app for code snippets

## API USAGE

### `/login`
- Login user.
    - `username` and `password` required.

### `/signup`
- [POST] Create new user.
    - `username` and `password` required.

### `/user`
- [GET] Get user data.
    - Requires valid JWT.

### `/notes`
- [POST] Save new note.
    - `title`, `content` and `createdBy` required.
    - `createdBy` is the ID of the user on the database (stored in `App`'s state)
    - `description` is optional.
    - Requires valid jwt.

### `/notes/:id`
- [GET] Get note by ID.
    - Requires valid JWT.
- [PUT] Update note by ID.
    - Requires valid JWT.
- [DELETE] Delete note by ID.
    - Requires valid JWT.
