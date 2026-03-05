import os
import ollama
from ollama import Client
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pinecone import Pinecone
from config import Settings

# 1. Initialize FastAPI
app = FastAPI(title="ResoBot Local Backend")

# 2. Initialize Pinecone
pc = Pinecone(api_key=Settings.PINECONE_API_KEY)
index = pc.Index(Settings.PINECONE_INDEX_NAME)

# 3. Data Models
class QueryRequest(BaseModel):
    prompt: str

# 4. Initialise Variable for Ollama URL
local_ollama = Client(host=Settings.OLLAMA_ACCESS_URL)

# 5. Ingestion: Local Docs -> Local Embeddings -> Pinecone
@app.post("/ingest-directory")
async def ingest_directory():
    path = Settings.TRAIN_DOX_PATH
    
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail=f"Directory {path} not found")

    processed_files = 0
    for filename in os.listdir(path):
        if filename.endswith(".txt"):
            file_path = os.path.join(path, filename)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
                # Generate Embeddings locally (768 dimensions)
                response = local_ollama.embeddings(
                    model='nomic-embed-text',
                    prompt=content
                )
                
                # Upsert to Pinecone
                index.upsert(vectors=[{
                    "id": filename, 
                    "values": response['embedding'], 
                    "metadata": {"text": content, "source": filename}
                }])
                processed_files += 1

    return {"status": "success", "files_ingested": processed_files}

# 6. Chat: Local Search + Local Generation
@app.post("/chat")
async def ask_resobot(data: QueryRequest):
    try:
        # A. Convert user question to vector locally
        query_resp = local_ollama.embeddings(
            model='nomic-embed-text',
            prompt=data.prompt
        )
        query_vector = query_resp['embedding']

        # B. Search Pinecone
        search_results = index.query(
            vector=query_vector,
            top_k=3,
            include_metadata=True
        )

        # C. Construct Context
        context_text = "\n\n".join([m.metadata['text'] for m in search_results.matches])
        
        # D. Generate Local Response
        # We use llama3.1 which is fast and smart for 2026 local dev
        response = local_ollama.chat(
            model='llama3.1',
            messages=[
                {
                    'role': 'system',
                    'content': 'You are ResoBot, the Resollect mediator. Use the context to help with debt resolution. Be empathetic but firm.'
                },
                {
                    'role': 'user',
                    'content': f"Context: {context_text}\n\nQuestion: {data.prompt}"
                }
            ]
        )
        
        return {
            "response": response['message']['content'],
            "sources": [m.metadata['source'] for m in search_results.matches]
        }
        
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def health_check():
    return {"status": "ResoBot Local is live"}