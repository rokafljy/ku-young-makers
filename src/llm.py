"""Google Gemini 클라이언트 래퍼 (LLM 호출 + 임베딩)."""
import os
import google.generativeai as genai

MODEL_NAME = "gemini-2.0-flash"
EMBED_MODEL = "models/text-embedding-004"

_configured = False


def _resolve_api_key():
    key = os.getenv("GEMINI_API_KEY")
    if key:
        return key
    try:
        import streamlit as st
        return st.secrets.get("GEMINI_API_KEY")
    except Exception:
        return None


def configure():
    global _configured
    if _configured:
        return
    key = _resolve_api_key()
    if not key:
        raise RuntimeError(
            "GEMINI_API_KEY가 설정되어 있지 않습니다. "
            "환경변수 또는 .streamlit/secrets.toml에 등록해 주세요."
        )
    genai.configure(api_key=key)
    _configured = True


def embed_texts(texts, task_type="retrieval_document"):
    """문자열 리스트를 임베딩 벡터 리스트로 변환."""
    configure()
    vectors = []
    for t in texts:
        result = genai.embed_content(
            model=EMBED_MODEL, content=t, task_type=task_type
        )
        vectors.append(result["embedding"])
    return vectors


def embed_query(text):
    return embed_texts([text], task_type="retrieval_query")[0]


def generate_stream(prompt, system_prompt):
    configure()
    model = genai.GenerativeModel(
        MODEL_NAME, system_instruction=system_prompt
    )
    return model.generate_content(prompt, stream=True)
