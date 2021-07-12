# Assessment Music API

## Installation

Use the package manager [NPM](https://www.npmjs.com/) to build.
The application was not intended to be hosted so no static paths for files
have been included in the Express code. It was built for Edge and has been
tested on Chrome and Mozilla (The UI isn't good on this) be aware I have not
allowed for cross browser support because of time.

```bash
In the root directory run "npm run dev".
```

## Notes

```bash

Request: I used axios

Redux: I decided to use Hooks instead of Redux as for such a tiny little
thing,  Redux is just too verbose.

Material UI: Some items were used it isn't built extensively with this framework,
too clunky I have no experience making things responsive.

Styled Components: I chose to use plain HTML/CSS, normally after doing it in
HTML/CSS I then convert to styled components I don't spend a lot of time
building front end so this would add additional time to remember the syntax and debug.

MongoDB: Is used as a cache for searches, the application will check time of last
update once on application mount. The granularity is a minimum of a day, it will then
update all previous searches and change the date.

Information source: After the search, in the grid view, there will be a glowing icon
in the bottom left corner telling where the information was retrieved.

Artist Info: Click on the artist card to expand the details.

Home Page: All searches are stored as indexes within the browser local storage,
buttons will appear below the search bar. Clicking on the X will remove the search
from MongoDB cache as well as the local storage, on search the application uses the local
index to see if a matching copy is in Mongo and attempted to retrieve it on failure or if
the index does not exist it will hand it to express to collect the information from Deezer.

Usage: It was never designed to keep track of multi user searches on different PC,
it is a personal single user setup. It wont fail if more than one person tries at the
same time, it will just add un-tracked search information.

```
