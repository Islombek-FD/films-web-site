'use strict';
var elForm = document.querySelector('.form'),
    elSelect = document.querySelector('.form-select'),
    elButton = document.querySelector('.form-button'),
    elList = document.querySelector('.film-list'); 

function normalizeDate(element) {
    var date = new Date(element),
    year = date.getFullYear(),
    month = String(date.getMonth() + 1).padStart(2, 0),
    day = String(date.getDate()).padStart(2, 0);
    
    return `${day}.${month}.${year}`;
}


films.forEach((film) => {
    film.genres.forEach((genre) => {
        if (!elSelect.textContent.includes(genre)) {
            var elOption = document.createElement('option');
            elOption.setAttribute('class', 'form-option');
            elOption.textContent = genre;
            elSelect.appendChild(elOption);
        }
    })
})

function selectFilm(arr, toElement) {
    toElement.innerHTML = null;
    arr.forEach((film) => {
        
        if (film.genres.includes(elSelect.value)) {
            var elItem = document.createElement('li'),
                elItemLeft = document.createElement('div'),
                elImg = document.createElement('img'),
                elHeading = document.createElement('h3'),
                elItemRight = document.createElement('div'),
                elParagraph = document.createElement('p'),
                elGenreHeading = document.createElement('h4'),
                elGenreList = document.createElement('ul'),
                elTime = document.createElement('time');
                
            elItem.setAttribute('class', 'film-item');
            elHeading.textContent = film.title;
            elHeading.setAttribute('class', 'film-heading');
            elImg.setAttribute('src', film.poster);
            elImg.setAttribute('class', 'film-img');
            elImg.setAttribute('width', '230');
            elImg.setAttribute('height', '250');
            elImg.setAttribute('alt', `${film.title} film image`);
            elParagraph.textContent = film.overview.split(' ').slice(0, 20).join(' ');
            elParagraph.setAttribute('class', 'film-description');
            elGenreHeading.textContent = 'Genres Types';
            elGenreHeading.setAttribute('class', 'film-genres__heading');
            elGenreList.setAttribute('class', 'film-genres');
            film.genres.forEach((genre) => {
                var elGenreItem = document.createElement('li');
                elGenreItem.setAttribute('class', 'film-genre');
                elGenreItem.textContent = genre;
                elGenreList.appendChild(elGenreItem);
            })
            elTime.textContent = normalizeDate(film.release_date);
            
            
            elItemLeft.appendChild(elImg);
            elItemRight.appendChild(elHeading);
            elItemRight.appendChild(elParagraph);
            elItemRight.appendChild(elGenreHeading);
            elItemRight.appendChild(elGenreList);
            elItemRight.appendChild(elTime);

            elItem.appendChild(elItemLeft);
            elItem.appendChild(elItemRight);

            toElement.appendChild(elItem);
        }
    })
}
selectFilm(films, elList);

elForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    selectFilm(films, elList);
})