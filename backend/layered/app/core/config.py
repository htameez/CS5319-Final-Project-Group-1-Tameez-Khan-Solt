from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    OPENAI_API_KEY: str
    DATABASE_URL: str = "sqlite:///./carebot_layered.db"

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()