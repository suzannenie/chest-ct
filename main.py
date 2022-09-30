from flask import Flask, render_template, request
from flask_socketio import SocketIO


app = Flask(__name__)
# app.config['SECRET_KEY'] = 'secret!'
sio = SocketIO(app)
sio.init_app(app, cors_allowed_origins="*")
# sio = socketio.AsyncServer(cors_allowed_origins='*', ping_timeout=35)


@app.route("/")
def index():
    return render_template("index.html")


@sio.on('connect')
def connected():
    print('Connected to index', request.namespace, request.sid)

@sio.on('user_clicked')
def userClicked(userID):
    print('User clicked named', userID)


if __name__ == "__main__":
    # sio.run(app)
    sio.run(app, debug=True, host="localhost", port=5002)