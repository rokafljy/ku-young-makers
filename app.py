"""Streamlit 메인: 청년일경험 안내 챗봇."""
import time

import streamlit as st

from src.llm import generate_stream
from src.prompts import SYSTEM_PROMPT, build_prompt
from src.rag import RAGStore

st.set_page_config(
    page_title="청년일경험 안내 챗봇",
    page_icon="💼",
    layout="centered",
)

st.title("💼 청년일경험 안내 챗봇")
st.caption("지침·매뉴얼·2025년 Q&A 기반 참여자 문의 도우미")


@st.cache_resource(show_spinner="안내자료 인덱스를 불러오는 중...")
def get_store():
    store = RAGStore()
    store.load()
    return store


if "messages" not in st.session_state:
    st.session_state.messages = []
if "request_times" not in st.session_state:
    st.session_state.request_times = []

with st.sidebar:
    st.header("자주 묻는 질문")
    for ex in [
        "참여수당은 언제 어떻게 지급되나요?",
        "출석 체크 방법과 기준을 알려주세요",
        "중도에 그만두면 어떻게 되나요?",
        "사업 참여 자격은 어떻게 되나요?",
    ]:
        if st.button(ex, use_container_width=True, key=f"ex_{ex}"):
            st.session_state.pending_question = ex
    st.divider()
    if st.button("🔄 대화 초기화", use_container_width=True):
        st.session_state.messages = []
        st.rerun()
    st.caption(
        "ℹ️ 본 챗봇 답변은 참고용입니다. 최종 확인은 운영기관에 문의해 주세요."
    )

for m in st.session_state.messages:
    with st.chat_message(m["role"]):
        st.markdown(m["content"])
        if m.get("sources"):
            with st.expander("📎 참고한 자료"):
                for s in m["sources"]:
                    page = s.get("page")
                    page_str = f"p.{page}" if page else "-"
                    st.markdown(
                        f"**{s['source']}** ({page_str}) · 유사도 {s['score']:.2f}"
                    )
                    preview = s["text"][:300] + ("…" if len(s["text"]) > 300 else "")
                    st.caption(preview)


def _rate_limited():
    now = time.time()
    st.session_state.request_times = [
        t for t in st.session_state.request_times if now - t < 60
    ]
    if len(st.session_state.request_times) >= 15:
        return True
    st.session_state.request_times.append(now)
    return False


def handle_question(question):
    st.session_state.messages.append({"role": "user", "content": question})
    with st.chat_message("user"):
        st.markdown(question)

    if _rate_limited():
        warn = "1분에 15건까지 질문할 수 있어요. 잠시 후 다시 시도해 주세요."
        with st.chat_message("assistant"):
            st.warning(warn)
        st.session_state.messages.append({"role": "assistant", "content": warn})
        return

    try:
        store = get_store()
        results = store.search(question, k=5)
    except FileNotFoundError as e:
        msg = str(e)
        with st.chat_message("assistant"):
            st.error(msg)
        st.session_state.messages.append({"role": "assistant", "content": msg})
        return
    except Exception as e:
        msg = f"검색 중 오류가 발생했습니다: {e}"
        with st.chat_message("assistant"):
            st.error(msg)
        st.session_state.messages.append({"role": "assistant", "content": msg})
        return

    prompt = build_prompt(results, question)
    with st.chat_message("assistant"):
        placeholder = st.empty()
        answer = ""
        try:
            for chunk in generate_stream(prompt, SYSTEM_PROMPT):
                if getattr(chunk, "text", None):
                    answer += chunk.text
                    placeholder.markdown(answer + "▌")
            placeholder.markdown(answer if answer else "_(빈 응답)_")
        except Exception as e:
            answer = f"응답 생성 중 오류가 발생했습니다: {e}"
            placeholder.error(answer)
        with st.expander("📎 참고한 자료"):
            for s in results:
                page = s.get("page")
                page_str = f"p.{page}" if page else "-"
                st.markdown(
                    f"**{s['source']}** ({page_str}) · 유사도 {s['score']:.2f}"
                )
                preview = s["text"][:300] + ("…" if len(s["text"]) > 300 else "")
                st.caption(preview)

    st.session_state.messages.append({
        "role": "assistant",
        "content": answer,
        "sources": results,
    })


pending = st.session_state.pop("pending_question", None)
if pending:
    handle_question(pending)

user_input = st.chat_input("질문을 입력해 주세요 (예: 참여수당은 언제 지급되나요?)")
if user_input:
    handle_question(user_input)
