const newsContainer = document.getElementById('news-container');
const refreshButton = document.getElementById('refresh-button');
const API_KEY = 'pub_0e555dffc0114d01847a271dea262c09'; 
const API_URL = `https://newsdata.io/api/1/latest?country=es&apikey=${API_KEY}`; 

function renderNews(articles) {
    newsContainer.innerHTML = ''; 

    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = '<p id="error-message"> No se encontraron noticias. Intenta más tarde.</p>';
        return;
    }

    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('news-article');

        const titleLink = document.createElement('a');
        
        titleLink.href = article.link || '#'; 
        titleLink.target = '_blank'; 
        titleLink.textContent = article.title || 'Título no disponible';
        
        const titleElement = document.createElement('h2');
        titleElement.appendChild(titleLink);

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = article.description || 'Descripción no disponible.';

        articleDiv.appendChild(titleElement);
        articleDiv.appendChild(descriptionElement);
        newsContainer.appendChild(articleDiv);
    });
}

async function fetchNews() {
    newsContainer.innerHTML = '<p id="loading-message"> Cargando noticias...</p>';

    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json(); 

        renderNews(data.results);

    } catch (error) {
        console.error('Fallo al obtener las noticias:', error);
        newsContainer.innerHTML = '<p id="error-message"> Error al cargar las noticias. Usando datos de ejemplo.</p>';
    }
}
refreshButton.addEventListener('click', fetchNews);
document.addEventListener('DOMContentLoaded', fetchNews);