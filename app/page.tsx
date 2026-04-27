"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    let count = Number(localStorage.getItem("count") || 0);

    if (count >= 3) {
      alert("無料回数は3回までです");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

  const data = await res.json();

if (!res.ok) {
  alert(data.error || "エラーが発生しました");
  setLoading(false);
  return;
}

setResult(data.result);

    localStorage.setItem("count", String(count + 1));
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    alert("コピーしました");
  };

  return (
    <main style={{
      maxWidth: 600,
      margin: "0 auto",
      padding: 20,
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: 24, marginBottom: 10 }}>
        レポート構成ツール
      </h1>

      <p style={{ color: "#666", fontSize: 12 }}>
        ※PC推奨（スマホ非対応）
      </p>

      <textarea
        rows={10}
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ccc",
          marginTop: 10
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="メモを入力"
      />

      <button
        onClick={handleGenerate}
        style={{
          marginTop: 10,
          width: "100%",
          padding: 12,
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          cursor: "pointer"
        }}
      >
        {loading ? "生成中..." : "構成を作成"}
      </button>

      {result && (
        <div style={{
          marginTop: 20,
          padding: 15,
          background: "#f7f7f7",
          borderRadius: 8
        }}>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {result}
          </pre>

          <button
            onClick={handleCopy}
            style={{
              marginTop: 10,
              width: "100%",
              padding: 10,
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: 8,
              cursor: "pointer"
            }}
          >
            コピー
          </button>
        </div>
      )}
    </main>
  );
}
