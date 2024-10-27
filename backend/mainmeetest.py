# I want to create a script that can help me record meeting minutes and generate a summary of the meeting.using LLM wit XInference, and using Whisper for the atudio, using llama index for the vecctor store and qa and I am using Mac for audio 
# recording. generate the code in python.
import os
from llama_index import SimpleDirectoryReader, Document, VectorStoreIndex, ServiceContext
from x_inference import XInference
from whisper import load_model
from dotenv import load_dotenv, find_dotenv

# Load environment variables
_ = load_dotenv(find_dotenv())

# Set API keys
XInference.api_key = os.environ['XINFERENCE_API_KEY']

# Initialize Whisper model for audio transcription
whisper_model = load_model("base")

# Function to record audio (Mac specific)
def record_audio(output_file):
    os.system(f"sox -d {output_file}")

# Function to transcribe audio using Whisper
def transcribe_audio(audio_file):
    result = whisper_model.transcribe(audio_file)
    return result["text"]

# Record the meeting audio
audio_file = "meeting_audio.wav"
record_audio(audio_file)

# Transcribe the meeting audio
transcription = transcribe_audio(audio_file)

# Save the transcription to a text file
with open("meeting_transcription.txt", "w") as f:
    f.write(transcription)

# Read the transcription file
documents = SimpleDirectoryReader(input_files=["meeting_transcription.txt"]).load_data()

# Merge everything into one single document
document = Document(text="\n\n".join([doc.text for doc in documents]))

# Use XInference as the LLM
llm = XInference(model="xgpt-4", temperature=0.3, system_prompt="You are an expert on summarizing meeting minutes.")

# Service context using XInference
service_context = ServiceContext.from_defaults(llm=llm)

# Generate and index the embeddings
index = VectorStoreIndex.from_documents([document], service_context=service_context)

# Define a query engine on the index
query_engine = index.as_query_engine()

# Query to get a summary of the meeting
response = query_engine.query("Please provide a summary of the meeting.")

# Print the summary
print(str(response))









# I want to to use LLM for this with XInference

#I want to use llama index for this 



