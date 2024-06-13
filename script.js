let username = '';

function login() {
    username = document.getElementById('username').value;
    if (username) {
        document.getElementById('login').innerHTML = `<p>Witaj, ${username}</p>`;
        loadMatches();
    }
}

function loadMatches() {
    // Tutaj będziesz dynamicznie ładować i wyświetlać listę meczów
    const matches = [
        { id: 1, team1: 'Polska', team2: 'Niemcy', date: '2024-06-14' },
        { id: 2, team1: 'Hiszpania', team2: 'Włochy', date: '2024-06-15' }
    ];

    const matchesContainer = document.getElementById('matches');
    matchesContainer.innerHTML = '';

    matches.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.className = 'match';
        matchElement.innerHTML = `
            <p>${match.date}: ${match.team1} vs ${match.team2}</p>
            <input type="number" id="team1-score-${match.id}" placeholder="${match.team1} wynik">
            <input type="number" id="team2-score-${match.id}" placeholder="${match.team2} wynik">
            <button onclick="bet(${match.id})">Obstaw</button>
        `;
        matchesContainer.appendChild(matchElement);
    });
}

function bet(matchId) {
    const team1Score = document.getElementById(`team1-score-${matchId}`).value;
    const team2Score = document.getElementById(`team2-score-${matchId}`).value;
    console.log(`Użytkownik ${username} obstawia mecz ${matchId}: ${team1Score} - ${team2Score}`);
    // Tutaj będziesz zapisywać obstawienie
}
