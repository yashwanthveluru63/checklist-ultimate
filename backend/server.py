from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK', 'message': 'Backend running'})

@app.route('/api/watchlist', methods=['GET'])
def get_watchlist():
    return jsonify({'data': [], 'message': 'Watchlist endpoint'})

@app.route('/api/watchlist', methods=['POST'])
def add_to_watchlist():
    data = request.json
    return jsonify({'status': 'success', 'data': data})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
