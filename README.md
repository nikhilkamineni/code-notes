# code-notes
### A note taking app for code snippets

## FEATURES

- Built with the MERN stack.
- Create a free account on the signup page
- All passwords are hashed using `bcrypt`
- Authentication using JWT's
- Currently supports Markdown in the notes contents
- Search through and view your notes by title. Supports partial fuzzy searching

#### Roadmap
Some up and coming features that are being considered:
- Dark theme
- Add a more full featured code editor for writing notes (e.g. Code Mirror)
- Add a tags field for notes
- Add a color for notes
- Login/signup through github
- Synchronize notes with github gists

## API USAGE

### `/login`
- Login user
    - `username` and `password` required

### `/signup`
- [POST] Create new user
    - `username` and `password` required

### `/user`
- [GET] Get user data
    - Requires valid JWT

### `/user/change-password`
- [PUT] change a users password
    - requires a valid jwt
    - a new password sent in the request body's `password` field is required

### `/user/change-theme`
- [PUT] change a users password
    - requires a valid jwt
    - a new theme sent in the request body's `theme` field is required

### `/notes`
- [POST] Save new note
    - `title`, `content` and `createdBy` required
    - `createdBy` is the ID of the user on the database (stored in `App`'s state
    - `description` is optional
    - Requires valid jwt

### `/notes/:id`
- [GET] Get note by ID
    - Requires valid JWT
- [PUT] Update note by ID
    - Requires valid JWT
- [DELETE] Delete note by ID
    - Requires valid JWT
