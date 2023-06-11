from flask_socketio import SocketIO

from flask import Flask, json, request
import vonage
from langchain.chat_models import ChatOpenAI
from conversions import convert as tts
from index import SalesGPT, config
import time

app = Flask(__name__)

llm = ChatOpenAI(temperature=0.9)

sales_agent = SalesGPT.from_llm(llm, verbose=False, **config)
audio_buffer = None
BASE_URL = "https://mlserver.vaibhav.edrives.in"


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/call")
def call():
    client = vonage.Client(application_id="", private_key="./vonage_private.key")
    response = client.voice.create_call({
        'to': [{'type': 'phone', 'number': "919582717169"}],
        'from': {'type': 'phone', 'number': "12543420690"},
        'answer_url': [f'{BASE_URL}/answer'],
        'event_url': [f'{BASE_URL}/event']
    })

    return response

@app.route("/call/v2", methods=["POST"])
def callv2():
    if request.method == "POST":
        jsonData = json.loads(request.data)

        config["customer_name"] = jsonData["customer"]["name"]
        config["customer_gender"] = jsonData["customer"]["gender"]
        config["customer_age"] = jsonData["customer"]["age"]
        config["customer_profession"] = jsonData["customer"]["profession"]
        config["product_name"] = jsonData["product"]["name"]
        config["product_description"] = jsonData["product"]["description"]
        config["company_name"] = jsonData["company"]["name"]
        config["company_business"] = jsonData["company"]["description"]
        config["company_values"] = jsonData["company"]["values"]
        print("===========config=============")
        print(config)
        print("==============================")
        global sales_agent
        sales_agent = SalesGPT.from_llm(llm, verbose=False, **config)

        client = vonage.Client(
            application_id="9fba3858-fd48-4bd0-8e90-697c5302354a",
            private_key="./vonage_private.key",
        )
        response = client.voice.create_call(
            {
                "to": [{"type": "phone", "number": jsonData["customer"]["phoneNo"]}],
                "from": {"type": "phone", "number": "12543420690"},
                "answer_url": [f"{BASE_URL}/answer"],
                "event_url": [f"{BASE_URL}/event"],
            }
        )

        return response


@app.get("/audio")
def getAudio():
    print("getAudio", time.time())
    return audio_buffer


@app.post("/speech")
def speechHandler():
    print("speech", time.time())
    print(request.json)  # TODO check if no audio is spoken
    user_input = request.json['speech']['results'][0]['text']

    is_end_of_call = "END_OF_CALL" in sales_agent.conversation_history[-1]

    if is_end_of_call:
        f = open("Transcript.txt", "a")
        f.write("\n======================= New Conversation =======================\n")
        f.writelines(sales_agent.conversation_history)
        f.write("\n================================================================\n")
        f.close()
        return [{
            "action": "hangup"
        }]

    sales_agent.human_step(user_input)
    sales_agent.determine_conversation_stage()
    sales_agent.step()
    sales_agent_text = sales_agent.conversation_history[-1]

    sales_agent_text = sales_agent_text.replace("END_OF_TURN", "")
    sales_agent_text = sales_agent_text.replace("END_OF_CALL", "")
    sales_agent_text = sales_agent_text.replace("<", "")
    sales_agent_text = sales_agent_text.replace(">", "")

    global audio_buffer
    audio_buffer = tts.convert(sales_agent_text)
    print("speech after conversion", time.time())

    return [
        {
            "action": "stream",
            "streamUrl": [f"{BASE_URL}/audio"],
        },
               {
                   "eventUrl": [
                       f"{BASE_URL}/speech"
                   ],
                   "eventMethod": "POST",
                   "action": "input",
                   "type": ["speech"],
                   "speech": {
                       "language": "en-gb",
                       "endOnSilence": 1.6,
                       "saveAudio": False
                   }
               }
    ]


@app.post("/event")
def eventHandler():
    print(request.json)
    return ""


@app.get("/answer")
def answerHandler():
    sales_agent.seed_agent()
    sales_agent.determine_conversation_stage()
    sales_agent.step()

    sales_agent_text = sales_agent.conversation_history[-1]

    sales_agent_text = sales_agent_text.replace("END_OF_TURN", "")
    sales_agent_text = sales_agent_text.replace("END_OF_CALL", "")
    sales_agent_text = sales_agent_text.replace("<", "")
    sales_agent_text = sales_agent_text.replace(">", "")

    print("SALES_AGENT=============", sales_agent_text)

    return [{
        "action": "talk",
        "text": sales_agent_text,
        "language": "en-GB",
    },
        {
            "eventUrl": [
                f"{BASE_URL}/speech"
            ],
            "eventMethod": "POST",
            "action": "input",
            "type": ["speech"],
            "speech": {
                "language": "en-gb",
                "endOnSilence": 1.5,
                "saveAudio": False
            }
        }
    ]
