from flask import Flask, request, jsonify

app = Flask(__name__)

# Lista meczów
matches = [
    {"id": 1, "team1": "Polska", "team2": "Niemcy", "date": "2024-06-14", "result": None},
    {"id": 2, "team1": "Hiszpania", "team2": "Włochy", "date": "2024-06-15", "result": None}
]

# Lista obstawień
bets = []

# Endpoint do pobierania listy meczów
@app.route('/matches', methods=['GET'])
def get_matches():
    return jsonify(matches)

# Endpoint do obstawiania wyników
@app.route('/bet', methods=['POST'])
def place_bet():
    data = request.json
    bets.append(data)
    return jsonify({"status": "success"})

# Endpoint do ustawiania rzeczywistych wyników meczów
@app.route('/result', methods=['POST'])
def set_result():
    data = request.json
    for match in matches:
        if match['id'] == data['id']:
            match['result'] = data['result']
            break
    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(debug=True)
