"use client";

import { useEffect, useState } from "react";

const MAX_FREE_COUNT = 3;

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [usedCount, setUsedCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");

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

  if (!email.trim()) {
    alert("メールアドレスを入力してください");
    return;
  }

  const statusRes = await fetch("/api/user-status", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

  const status = await statusRes.json();

  if (!statusRes.ok) {
    alert("利用状況の確認に失敗しました");
    return;
  }

  const isPro = status.plan === "pro";
  const hasCredit = status.extra_credits > 0;

  if (!isPro && !hasCredit && usedCount >= MAX_FREE_COUNT) {
    alert("無料回数は終了しました。追加購入または月額プランをご利用ください。");
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

    if (!isPro && hasCredit) {
      await fetch("/api/use-credit", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
    }

    if (!isPro && !hasCredit) {
      const nextCount = usedCount + 1;
      localStorage.setItem("count", String(nextCount));
      setUsedCount(nextCount);
    }
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
        <input
           type="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           placeholder="購入時に使ったメールアドレス"
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 12,
            border: "1px solid #ddd",
            fontSize: 15,
            marginBottom: 12,
            boxSizing: "border-box",
        }}
/>
        <textarea
          rows={12}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 12,
            border: "1px solid #ddd",
            fontSize: 15,
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div>
         {loading ? "loading中" : "ready"}
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading || !text.trim() || !email.trim()}
          style={{
            marginTop: 16,
            width: "100%",
            padding: 14,
            backgroundColor: loading || remainingCount <= 0 ? "#999" : "#111",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "生成中..." : "レポート構成を生成する"}
        </button>

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
            <h2>無料トライアルは終了しました</h2>

            <p>
              引き続き利用するには、無制限プランまたは追加回数をご利用ください。
            </p>

            <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
  <a href="https://buy.stripe.com/test_8x27sFcal6CpgU96avao802" target="_blank" rel="noopener noreferrer">
    <button
      style={{
        padding: 14,
        width: "100%",
        background: "#111",
        color: "#fff",
        border: "none",
        borderRadius: 12,
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      無制限でレポート構成を作成（500円/月）
    </button>
  </a>

  <a href="https://buy.stripe.com/test_4gMcMZdep0e1avL8iDao803" target="_blank" rel="noopener noreferrer">
    <button
      style={{
        padding: 14,
        width: "100%",
        background: "#fff",
        color: "#111",
        border: "1px solid #ccc",
        borderRadius: 12,
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      10回分を追加する（100円）
    </button>
  </a>
</div>
          </div>
        )}

        {/* ★ここ追加（フッター） */}
        <footer
          style={{
            marginTop: 32,
            paddingTop: 20,
            borderTop: "1px solid #eee",
            fontSize: 13,
            color: "#666",
            textAlign: "center",
          }}
        >
          <a
            href="/legal"
            style={{
              color: "#666",
              textDecoration: "none",
            }}
          >
            特定商取引法に基づく表記
          </a>
        </footer>
      </div>
    </main>
  );
}