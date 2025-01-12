from flask import Flask, request
from firebase_admin import initialize_app, credentials, messaging
from flask_cors import CORS

cred = credentials.Certificate(
    "credentials.json"
)
initialize_app(cred)

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    token = request.args.get("token")
    message = messaging.Message(
        notification=messaging.Notification(
            title="Hello!",
            body="This is a simple message.",
        ),
        token=token,
    )

    # Send the message
    response = messaging.send(message)
    print(f"Message sent successfully: {response}")
    return {"teste": "teste"}
