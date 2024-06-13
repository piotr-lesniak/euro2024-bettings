let username = '';

function login() {
    username = document.getElementById('username').value;
    if (username) {
        document.getElementById('login').innerHTML = `<p>Witaj, ${username}</p>`;
        loadMatches();
    }
}

function loadMatches() {
    fetch('/matches')
        .then(response => response.json())
        .then(matches => {
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
        });
}

function bet(matchId) {
    const team1Score = document.getElementById(`team1-score-${matchId}`).value;
    const team2Score = document.getElementById(`team2-score-${matchId}`).value;
    
    fetch('/bet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            matchId: matchId,
            team1Score: team1Score,
            team2Score: team2Score
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(`Obstawienie zapisane: ${data.status}`);
    });
}
