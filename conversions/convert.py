from google.cloud import texttospeech

# Instantiates a client
client = texttospeech.TextToSpeechClient()

def convert(textInput):
    # Set the text input to be synthesized
    synthesis_input = texttospeech.SynthesisInput(text=textInput)

    # Build the voice request, select the language code ("en-US") and the ssml
    # voice gender ("neutral")
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US", name="en-GB-Wavenet-B"
    )

    # Select the type of audio file you want returned
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.LINEAR16, speaking_rate=1, pitch=3.5, volume_gain_db=16, sample_rate_hertz=16000
    )

    # Perform the text-to-speech request on the text input with the selected
    # voice parameters and audio file type
    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )
    return response.audio_content