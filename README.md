<h1 align="center">
{ codex }
 <p align="center" style="font-size: 0.5em">a rolodex for code snippets and notes</p>
</h1>

<p align="center">
 <img src="https://travis-ci.org/nikhilkamineni/codex.svg?branch=master" alt="Travis CI build status">
</p>

## ABOUT
<a href="https://code-notes-nk.herokuapp.com">Visit the live deployment here</a>

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
    - Current supports a light and dark theme
- Search through and view your notes by title. Supports partial fuzzy searching

#### Roadmap
- Tags field for notes
- Color field for notes
- Login/signup through github
- Synchronize notes with github gists

#### Tech stack
- Built with the MERN stack.
- Code editor powered by CodeMirror
- Unit and integration tests with Jest
- Continuous Integration with Travis CI
- Passwords are hashed using `bcrypt`
- Authentication using JWT's

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
