<h1 align="center">{ codex }</h1>

<p align="center">
 <h3 align="center" style="font-size: 15px">a rolodex for code snippets and notes</h3>
</p>

<p align="center">
    <a href="https://code-notes-nk.herokuapp.com">Visit the live deployment here</a>
</p>

<p align="center">
 <img align="center" src="https://travis-ci.org/nikhilkamineni/codex.svg?branch=master" alt="Travis CI build status">
</p>

## ABOUT

#### Features
- Free account creation
    - All passwords are hashed
    - Login persists on page refresh
    - Ability to change password
- Built in code editor
    - Supports many languages
    - Syntax highlighting
    - Highlights matching brackets
    - Auto-close brackets
    - Line numbers that can be toggled
- Themes
    - Currently supports a light and dark theme
    - Theme is saved upon login/logout
- Search through and view your notes by title. Supports partial fuzzy searching

#### Tech stack
- Built with the MERN stack.
- Unit and integration tests with Jest
- Continuous Integration with Travis CI
- Code editor powered by CodeMirror
- Passwords are hashed using `bcrypt`
- Authentication using JWT's

#### Roadmap
- Tags field for notes
- Color field for notes
- Login/signup through github
- Synchronize notes with github gists

## DEVELOPMENT
### API Usage

#### `/login`
- Login user
    - `username` and `password` required

#### `/signup`
- [POST] Create new user
    - `username` and `password` required

#### `/user`
- [GET] Get user data
    - Requires valid JWT

#### `/user/change-password`
- [PUT] change a users password
    - requires a valid jwt
    - a new password sent in the request body's `password` field is required

#### `/user/change-theme`
- [PUT] change a users password
    - requires a valid jwt
    - a new theme sent in the request body's `theme` field is required

#### `/notes`
- [POST] Save new note
    - `title`, `content` and `createdBy` required
    - `createdBy` is the ID of the user on the database (stored in `App`'s state
    - `description` is optional
    - Requires valid jwt

#### `/notes/:id`
- [GET] Get note by ID
    - Requires valid JWT
- [PUT] Update note by ID
    - Requires valid JWT
- [DELETE] Delete note by ID
    - Requires valid JWT
