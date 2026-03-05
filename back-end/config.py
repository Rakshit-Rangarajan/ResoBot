from pydantic import ConfigDict
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "ResoBot"
    PINECONE_API_KEY: str
    PINECONE_ENVIRONMENT: str
    PINECONE_INDEX_NAME: str
    OLLAMA_ACCESS_URL: str
    TRAIN_DOX_PATH: str


    model_config = ConfigDict(env_file=".env")

    
Settings = Settings()