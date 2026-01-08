document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('news-grid');

    fetch('./news.json')
        .then(response => response.json())
        .then(data => {
            // Ordena por ID decrescente (mais recente primeiro)
            // Se preferir data: data.sort((a, b) => new Date(b.date) - new Date(a.date));
            const sortedData = data.sort((a, b) => b.id - a.id);

            sortedData.forEach(news => {
                const card = document.createElement('article');
                card.className = 'news-card';

                // Define a classe da cor baseado na severidade
                const severityClass = `severity-${news.severity.toLowerCase()}`;

                card.innerHTML = `
                    <div class="card-header">
                        <span class="severity-badge ${severityClass}">${news.severity}</span>
                        <span class="date">${formatDate(news.date)}</span>
                    </div>
                    <h2>${news.title}</h2>
                    <p>${news.summary}</p>
                    <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid #334155; display: flex; justify-content: space-between; align-items: center;">
                        <small style="color: #64748b;">Fonte: ${news.source}</small>
                        <a href="${news.link}" target="_blank" class="read-more">Ler notícia completa →</a>
                    </div>
                `;
                grid.appendChild(card);
            });
        })
        .catch(error => console.error('Erro ao carregar notícias:', error));
});

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}
