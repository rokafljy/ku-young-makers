# 청년일경험 안내 챗봇

고용노동부 **청년일경험 사업** 참여자(약 100명)를 위한 무료 RAG 챗봇입니다.
사업 지침·매뉴얼·2025년 Q&A 자료를 근거로 정확하고 출처 명시된 답변을 제공합니다.

## 주요 특징

- ✅ 완전 무료 스택 (Gemini 무료 티어 + HF Spaces 무료 호스팅)
- ✅ 한국어 특화 프롬프트와 존댓말 답변
- ✅ RAG 기반 — 답변마다 출처 파일·페이지 자동 인용
- ✅ 2025년 Q&A 문서의 질문·답변 구조 자동 감지
- ✅ Gemini 무료 한도 보호용 세션 rate limit (분당 15건)

## 기술 스택

| 영역 | 선택 |
|---|---|
| LLM | Google Gemini 2.0 Flash |
| 임베딩 | Gemini `text-embedding-004` |
| 벡터 검색 | FAISS (로컬) |
| UI | Streamlit |
| 배포 | Hugging Face Spaces (Free CPU) |

## 빠른 시작 (로컬)

### 1. 의존성 설치
```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Gemini API 키 발급
https://aistudio.google.com/app/apikey 에서 무료로 발급받습니다.

### 3. API 키 설정 (택1)
```bash
export GEMINI_API_KEY="발급받은_키"
```
또는 `.streamlit/secrets.toml`을 만들고:
```toml
GEMINI_API_KEY = "발급받은_키"
```

### 4. 안내자료 업로드 및 인덱싱
`data/raw/` 폴더에 지침·매뉴얼·2025 Q&A 문서를 넣습니다.
```bash
python scripts/ingest.py
```
완료되면 `data/processed/chunks.jsonl`, `data/processed/index.faiss`가 생성됩니다.

### 5. 앱 실행
```bash
streamlit run app.py
```
브라우저에서 <http://localhost:8501> 접속.

## Hugging Face Spaces 배포

1. <https://huggingface.co/new-space> 에서 Space 생성
   - SDK: **Streamlit**
   - Hardware: **CPU basic (Free)**
2. Space의 Git 레포를 clone 후 본 레포 파일을 복사합니다.
   - `data/processed/chunks.jsonl`과 `data/processed/index.faiss`도 **반드시 포함** 해야 합니다. (Space에서는 `ingest.py`를 재실행하지 않습니다.)
3. Space Settings → **Secrets**에 `GEMINI_API_KEY` 등록
4. `git push` → Space가 자동 빌드 후 공개 URL 제공
5. 해당 URL을 참여자 약 100명에게 공유

## 지원 파일 형식

| 형식 | 지원 |
|---|---|
| PDF | ✅ (권장) |
| DOCX | ✅ (표 포함) |
| TXT / MD | ✅ |
| HWP | ❌ — PDF로 변환 후 업로드 |

## 문서 추가·교체 절차

1. `data/raw/`에 파일 추가 또는 교체
2. `python scripts/ingest.py` 재실행
3. 변경된 `data/processed/` 파일을 커밋 & 푸시
4. HF Space가 자동 재빌드

## 디렉토리 구조

```
ku-young-makers/
├── app.py                        # Streamlit 메인
├── requirements.txt
├── README.md
├── .streamlit/
│   ├── config.toml
│   └── secrets.toml.example
├── data/
│   ├── raw/                      # 원본 안내자료 (사용자가 업로드)
│   └── processed/                # ingest.py 산출물
├── scripts/
│   ├── ingest.py                 # 파싱·청크·임베딩·인덱싱
│   └── extract_qa.py             # Q&A 문서 구조 추출
└── src/
    ├── llm.py                    # Gemini 래퍼
    ├── rag.py                    # 검색
    └── prompts.py                # 시스템 프롬프트
```

## 비용·한도

- **Gemini 2.0 Flash 무료 티어**: 분당 15요청, 일 1,500요청
  - 100명이 하루 15회 질문해도 한도 내 (1,500회)
- **HF Spaces Free CPU**: 2 vCPU / 16GB RAM, 비활성 시 sleep → 첫 접속 시 10~30초 콜드스타트
- 기타 비용: 없음

## 주의 사항

- 본 챗봇 답변은 참고용이며, 공식 결정은 운영기관 안내를 따르세요.
- 개인정보·민감정보를 입력하지 않도록 사용자에게 고지하세요.
- `data/raw/` 자료가 비공개 문서라면 HF Space를 **Private**로 생성하세요.

## 라이선스

MIT.
