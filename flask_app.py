# Entrega um esqueleto de SPA simples

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def skeleton(path):
    return render_template('index.html')
