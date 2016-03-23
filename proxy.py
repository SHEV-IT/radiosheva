"""Simple Flask proxy server."""

import json
import urllib2

from datetime import datetime
from datetime import timedelta
from flask import Flask
from flask import render_template

app = Flask(__name__)

req = urllib2.Request(
    'http://radiosheva.univ.kiev.ua:81/api/live-info')
res = urllib2.urlopen(req)
cached_data = {
    "values": json.loads(res.read())['current']['name'],
    "timestamp": datetime.utcnow(),
}


@app.route("/live-info")
def get_proxy():
    """Proxy method."""
    if cached_data["timestamp"] + timedelta(seconds=5) < datetime.utcnow():
        req = urllib2.Request(
            'http://radiosheva.univ.kiev.ua:81/api/live-info')
        res = urllib2.urlopen(req)
        cached_data["values"] = json.loads(res.read())['current']['name']
        cached_data["timestamp"] = datetime.utcnow()
    return cached_data["values"]


@app.route("/")
def load_player():
    """Loader for player."""
    return render_template("index.html", data=cached_data["values"])

if __name__ == '__main__':
    app.run(debug=True, host="localhost", port=8001)
