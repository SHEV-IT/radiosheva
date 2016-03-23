"""Simple Flask proxy server."""

from flask import Flask
from flask import render_template
import urllib2
import json

app = Flask(__name__)


@app.route("/live-info")
def get_proxy():
    """Proxy method."""
    req = urllib2.Request(
        'http://radiosheva.univ.kiev.ua:81/api/live-info')
    res = urllib2.urlopen(req)
    return res.read()


@app.route("/")
def load_player():
    """Loader for player."""
    req = urllib2.Request(
        'http://radiosheva.univ.kiev.ua:81/api/live-info')
    res = urllib2.urlopen(req)
    data = json.loads(res.read())['current']['name']
    return render_template("index.html", data=data)

if __name__ == '__main__':
    app.run(debug=True, host="localhost", port=8001)
