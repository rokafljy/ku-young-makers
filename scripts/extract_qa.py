"""Q&A 문서에서 질문-답변 쌍을 추출.

2025년 질문답변 자료는 'Q./A.', '질문/답변', '문1/답1' 등 다양한 형식이므로
여러 패턴으로 매칭한다.
"""
import re

QUESTION_PATTERNS = [
    re.compile(r"^\s*(?:Q|q)\s*\d*\s*[.:)\-]\s*(.+)"),
    re.compile(r"^\s*(?:문|질문|질의)\s*\d*\s*[.:)\-]?\s*(.+)"),
    re.compile(r"^\s*\[\s*(?:질문|문의)\s*\]\s*(.+)"),
]
ANSWER_PATTERNS = [
    re.compile(r"^\s*(?:A|a)\s*\d*\s*[.:)\-]\s*(.+)"),
    re.compile(r"^\s*(?:답|답변|응답)\s*\d*\s*[.:)\-]?\s*(.+)"),
    re.compile(r"^\s*\[\s*(?:답|답변)\s*\]\s*(.+)"),
]


def _match_first(patterns, line):
    for p in patterns:
        m = p.match(line)
        if m:
            return m.group(1).strip()
    return None


def is_qa_like(text):
    """문서가 Q&A 구조로 판단되는지 휴리스틱 체크."""
    q_count = 0
    for line in text.splitlines():
        if _match_first(QUESTION_PATTERNS, line):
            q_count += 1
        if q_count >= 3:
            return True
    return False


def extract_pairs(text):
    """텍스트에서 [{question, answer}] 리스트 추출."""
    pairs = []
    cur_q, cur_a, state = None, [], "none"
    for raw_line in text.splitlines():
        line = raw_line.rstrip()
        q = _match_first(QUESTION_PATTERNS, line)
        a = _match_first(ANSWER_PATTERNS, line)
        if q is not None:
            if cur_q and cur_a:
                pairs.append({
                    "question": cur_q.strip(),
                    "answer": " ".join(cur_a).strip(),
                })
            cur_q, cur_a, state = q, [], "q"
        elif a is not None:
            cur_a = [a]
            state = "a"
        else:
            stripped = line.strip()
            if not stripped:
                continue
            if state == "q":
                cur_q = (cur_q + " " + stripped) if cur_q else stripped
            elif state == "a":
                cur_a.append(stripped)
    if cur_q and cur_a:
        pairs.append({
            "question": cur_q.strip(),
            "answer": " ".join(cur_a).strip(),
        })
    return pairs
