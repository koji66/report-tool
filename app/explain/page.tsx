export default function ExplainPage() {
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
          maxWidth: 820,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          lineHeight: 1.8,
        }}
      >
        <h1 style={{ fontSize: 30, marginBottom: 12 }}>
          Structify
        </h1>

        <p style={{ color: "#555", fontSize: 16 }}>
          Structifyは、学生向けのレポート構成作成支援ツールです。
          テーマや授業メモを入力するだけで、レポートの骨組みや整理されたノートを自動生成できます。
        </p>

        <section style={{ marginTop: 28 }}>
          <h2>できること</h2>
          <ul>
            <li>レポート構成の作成</li>
            <li>授業メモや資料メモの整理</li>
            <li>序論・本論・結論の流れ作成</li>
            <li>レポート作成前の下書き補助</li>
          </ul>
        </section>

        <section style={{ marginTop: 28 }}>
          <h2>こんな人向け</h2>
          <ul>
            <li>レポートの構成が思いつかない人</li>
            <li>メモはあるが、どう整理すればいいか分からない人</li>
            <li>提出前に文章の骨組みを早く作りたい人</li>
          </ul>
        </section>

        <section style={{ marginTop: 28 }}>
          <h2>料金</h2>
          <ul>
            <li>無料：初回3回まで利用可能</li>
            <li>月額プラン：500円/月で無制限利用</li>
            <li>追加購入：10回分を100円で追加可能</li>
          </ul>
        </section>

        <section style={{ marginTop: 28 }}>
          <h2>解約について</h2>
          <p>
            月額プランの解約・変更は、ツール画面内の
            「解約・プラン管理」ボタンから行えます。
          </p>
        </section>

        <section style={{ marginTop: 28 }}>
          <h2>使い方</h2>
          <ol>
            <li>ツール画面でメールアドレスを入力</li>
            <li>テーマや授業メモを入力</li>
            <li>「レポート構成を生成する」を押す</li>
            <li>生成された構成をコピーして利用</li>
          </ol>
        </section>

        <a
          href="/"
          style={{
            display: "block",
            marginTop: 32,
            padding: 14,
            background: "#111",
            color: "#fff",
            borderRadius: 12,
            textAlign: "center",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          無料で試す
        </a>

        <footer
          style={{
            marginTop: 32,
            paddingTop: 20,
            borderTop: "1px solid #eee",
            fontSize: 13,
            color: "#666",
            textAlign: "center",
            lineHeight: 2,
          }}
        >
          <div>
            <a href="/legal" style={{ color: "#666", textDecoration: "none" }}>
              特定商取引法に基づく表記
            </a>
            {" / "}
            <a href="/privacy" style={{ color: "#666", textDecoration: "none" }}>
              プライバシーポリシー
            </a>
          </div>

          <div>
            お問い合わせ：
            <a
              href="mailto:takagame0127@gmail.com"
              style={{ color: "#666", textDecoration: "none" }}
            >
              takagame0127@gmail.com
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}