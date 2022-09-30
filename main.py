from flask import Flask, render_template, request
from flask_socketio import SocketIO
import utils


app = Flask(__name__)
# app.config['SECRET_KEY'] = 'secret!'
sio = SocketIO(app)
sio.init_app(app, cors_allowed_origins="*")

# maps user sid to sample number
user_sample_map = {}


@app.route("/")
def index():
    return render_template("index.html", LABELS=utils.LABELS)

@sio.on('connect')
def connected():
    print('Connected to server', request.namespace, request.sid)
    i, sample = utils.get_random_sample()
    img_filename = sample["Path"]
    user_sample_map[request.sid] = i
    sio.emit('new_image', img_filename)


@sio.on('submit_answer')
def new_image(answer):
    print('User submit sid ', request.sid)

    sample_num = user_sample_map.get(request.sid)
    truth = utils.get_correct_answer(sample_num)

    # todo: reveal correct answer, update score

    i, sample = utils.get_random_sample()
    img_filename = sample["Path"]
    user_sample_map[request.sid] = i
    sio.emit('new_image', img_filename)


if __name__ == "__main__":
    # sio.run(app)
    sio.run(app, debug=False, host="localhost", port=5002)