# Todo app

Did you ever want to store your "Things To do" but you haven't found the right app?
Well, TODOapp is the app right for you. It give a simple way to create a Todo and mark it as done using a little

This simple app is made using React and [Bulma](https://bulma.io) as CSS framework.
It uses the indexedDB API [[Docs](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)] to store notes data. 

- Used modules:
    - [React](https://reactjs.org/)
    - [Bulma](https://github.com/jgthms/bulma)
    - [bulma-extensions](https://github.com/wikiki/bulma-extensions)
    - [Font-Awesome](https://github.com/FortAwesome/Font-Awesome)

- Missing features (yes, I'm lazy):
    - Todo edit
    - Settings
    - Dark/light UI toggle
    - i18n
    - Add TODO priorities

- Todo features ~~(maybe...well, this is an inception)~~:
    - Create a decent theme...
    - Improve UI items alignement
    - Change storing mechanism (use uuid instead of note title)
    - Set NoteCreator z-index over other elements (like ~~simplifying~~ "topmost" on WPF forms)