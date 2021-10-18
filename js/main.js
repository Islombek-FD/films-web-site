const elForm = document.querySelector('.form');
const elSelect = document.querySelector('.form-select');
const elButton = document.querySelector('.form-button');
const elList = document.querySelector('.film-list');
const elFilmItemTemplate = document.querySelector('.film-item__template').content;

function normalizeDate(element) {
    const date = new Date(element);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, 0);
    const day = String(date.getDate()).padStart(2, 0);
    
    return `${day}.${month}.${year}`;
}

films.forEach(film => {
    film.genres.forEach(genre => {
        if (!elSelect.textContent.includes(genre)) {
            var elOption = document.createElement('option');
            elOption.setAttribute('class', 'form-option');
            elOption.value = genre;
            elOption.textContent = genre;
            elSelect.appendChild(elOption);
        }
    })
})

function selectFilm(arr, node) {
    node.innerHTML = null;

    const filmsFragment = document.createDocumentFragment();

    arr.forEach(film => {
        const elFilmItemTemplateClone = elFilmItemTemplate.cloneNode(true);
            
        elFilmItemTemplateClone.querySelector('.film-heading').textContent = film.title;
        elFilmItemTemplateClone.querySelector('.film-img').src = film.poster;
        elFilmItemTemplateClone.querySelector('.film-img').alt = `${film.title} film image`;
        elFilmItemTemplateClone.querySelector('.film-description').textContent = film.overview.split(' ').slice(0, 20).join(' ');

        film.genres.forEach(genre => {
            const elGenreItem = document.createElement('li');
            elGenreItem.setAttribute('class', 'film-genre');
            elGenreItem.textContent = genre;
            elFilmItemTemplateClone.querySelector('.film-genres').appendChild(elGenreItem);
        })
        elFilmItemTemplateClone.querySelector('.film-time').textContent = normalizeDate(film.release_date);
        
        
        filmsFragment.appendChild(elFilmItemTemplateClone);
    })

    node.appendChild(filmsFragment);
}
selectFilm(films, elList);

elForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const genreValue = elSelect.value;
    
    let filteredFilms = [];
    if (genreValue === 'All') {
        filteredFilms = films;
    }
    else {
        filteredFilms = films.filter(film => film.genres.includes(genreValue))
    }
    selectFilm(filteredFilms, elList);
})