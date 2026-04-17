from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    OPENAI_API_KEY: str = ""
    DATABASE_URL: str = "sqlite:///./carebot_blackboard.db"

    model_config = SettingsConfigDict(env_file=".env")

    @property
    def openai_api_key(self) -> str:
        return self.OPENAI_API_KEY


settings = Settings()
