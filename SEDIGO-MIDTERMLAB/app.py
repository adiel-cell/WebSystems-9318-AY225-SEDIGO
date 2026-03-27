from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

def load_games():
    """Load games from JSON file"""
    if os.path.exists('games.json'):
        with open('games.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

@app.route('/')
def index():
    """Main page - display all games"""
    games = load_games()
    return render_template('index.html', games=games)

@app.route('/search')
def search():
    """Search endpoint for filtering games"""
    games = load_games()
    query = request.args.get('q', '').lower()
    
    if query:
        filtered_games = [
            game for game in games
            if query in game.get('game_title', '').lower()
            or query in game.get('developer', '').lower()
            or query in game.get('publisher', '').lower()
        ]
    else:
        filtered_games = games
    
    return render_template('index.html', games=filtered_games, search_query=query)

@app.route('/api/games')
def api_games():
    """API endpoint for JSON data"""
    games = load_games()
    return jsonify(games)

if __name__ == '__main__':
    app.run(debug=True)