"""FAISS 인덱스 + 청크 메타데이터를 로드해 검색을 제공."""
import json
from pathlib import Path

import faiss
import numpy as np

from src.llm import embed_query

CHUNKS_PATH = Path("data/processed/chunks.jsonl")
INDEX_PATH = Path("data/processed/index.faiss")


class RAGStore:
    def __init__(self):
        self.chunks = []
        self.index = None
        self._loaded = False

    def load(self):
        if self._loaded:
            return
        if not CHUNKS_PATH.exists() or not INDEX_PATH.exists():
            raise FileNotFoundError(
                "처리된 인덱스가 없습니다. 'python scripts/ingest.py'를 먼저 실행해 "
                "data/processed/chunks.jsonl, data/processed/index.faiss를 생성해 주세요."
            )
        with CHUNKS_PATH.open("r", encoding="utf-8") as f:
            self.chunks = [json.loads(line) for line in f if line.strip()]
        self.index = faiss.read_index(str(INDEX_PATH))
        self._loaded = True

    def search(self, query, k=5):
        self.load()
        query_vec = np.array([embed_query(query)], dtype="float32")
        faiss.normalize_L2(query_vec)
        scores, idxs = self.index.search(query_vec, k)
        results = []
        for score, idx in zip(scores[0], idxs[0]):
            if idx < 0 or idx >= len(self.chunks):
                continue
            item = dict(self.chunks[idx])
            item["score"] = float(score)
            results.append(item)
        return results
