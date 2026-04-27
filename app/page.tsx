"use client";

import { useEffect, useState } from "react";

const MAX_FREE_COUNT = 3;

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [usedCount, setUsedCount] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const count = Number(localStorage.getItem("count") || 0);
    setUsedCount(count);
  }, []);

  const remainingCount = Math.max(MAX_FREE_COUNT - usedCount, 0);

  const handleGenerate = async () => {
    if (!text.trim()) {
      alert("メモを入力してください");
      return;
    }

    if (usedCount >= MAX_FREE_COUNT) {
      alert("無料回数は3回までです");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "エラーが発生しました");
        return;
      }

      setResult(data.result);

      const nextCount = usedCount + 1;
      localStorage.setItem("count", String(nextCount));
      setUsedCount(nextCount);
    } catch {
      alert("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "40px 20px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 16,
          padding: 28,
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        }}
      >
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Structify</h1>

        <p style={{ color: "#555", lineHeight: 1.7, marginBottom: 16 }}>
          授業メモや資料メモを貼るだけで、整理されたノートとレポート構成を作成します。
        </p>

        <div
          style={{
            background: "#f1f1f1",
            padding: 12,
            borderRadius: 10,
            fontSize: 14,
            color: "#555",
            marginBottom: 18,
          }}
        >
          PC利用推奨 / 初回無料：残り {remainingCount} 回
        </div>

        <label style={{ fontWeight: "bold", display: "block", marginBottom: 8 }}>
          メモを入力
        </label>

        <textarea
          rows={12}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 12,
            border: "1px solid #ddd",
            fontSize: 15,
            lineHeight: 1.6,
            resize: "vertical",
            boxSizing: "border-box",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="例：地球温暖化の原因、二酸化炭素、森林破壊、海面上昇、再生可能エネルギー..."
        />

        <button
          onClick={handleGenerate}
          disabled={loading || remainingCount <= 0}
          style={{
            marginTop: 16,
            width: "100%",
            padding: 14,
            backgroundColor: loading || remainingCount <= 0 ? "#999" : "#111",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            cursor: loading || remainingCount <= 0 ? "not-allowed" : "pointer",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {loading ? "生成中..." : "レポート構成を生成する"}
        </button>

        {result && (
          <section
            style={{
              marginTop: 28,
              padding: 20,
              background: "#fafafa",
              border: "1px solid #eee",
              borderRadius: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <h2 style={{ fontSize: 20, margin: 0 }}>生成結果</h2>

              <button
                onClick={handleCopy}
                style={{
                  padding: "8px 14px",
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                {copied ? "コピー済み" : "コピー"}
              </button>
            </div>

            <pre
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: 1.7,
                fontSize: 15,
                margin: 0,
              }}
            >
              {result}
            </pre>
          </section>
        )}

        {remainingCount <= 0 && (
          <div
            style={{
              marginTop: 20,
              padding: 20,
              background: "#fff7ed",
              border: "1px solid #fed7aa",
              borderRadius: 14,
            }}
          >
            <h2 style={{ fontSize: 20, marginBottom: 8 }}>
              無料利用は終了しました
            </h2>

            <p style={{ color: "#555", lineHeight: 1.7 }}>
              続けて利用する場合は、月額プランまたは追加回数の購入を選択できます。
            </p>

            <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
              <button
                style={{
                  padding: 14,
                  background: "#111",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                月額500円で無制限利用
              </button>

              <button
                style={{
                  padding: 14,
                  background: "#fff",
                  color: "#111",
                  border: "1px solid #ccc",
                  borderRadius: 12,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                追加10回を100円で購入
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}