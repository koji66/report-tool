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
        <h1 style={{ fontSize: 34, marginBottom: 16 }}>Structify</h1>

        <p style={{ color: "#555", fontSize: 16 }}>
          Structifyは、学生向けのレポート構成作成支援ツールです。
          テーマや授業メモを入力するだけで、レポートの骨組みや整理されたノートを自動生成できます。
        </p>

        <section style={{ marginTop: 32 }}>
          <h2>できること</h2>
          <ul>
            <li>レポート構成の作成</li>
            <li>授業メモや資料メモの整理</li>
            <li>序論・本論・結論の流れ作成</li>
            <li>レポート作成前の下書き補助</li>
          </ul>
        </section>

        <section style={{ marginTop: 32 }}>
          <h2>こんな人向け</h2>
          <ul>
            <li>レポートの構成が思いつかない人</li>
            <li>メモはあるが、どう整理すればいいか分からない人</li>
            <li>提出前に文章の骨組みを早く作りたい人</li>
          </ul>
        </section>

        <section style={{ marginTop: 32 }}>
          <h2>料金</h2>
          <ul>
            <li>無料：初回3回まで利用可能</li>
            <li>月額プラン：500円/月で無制限利用</li>
            <li>追加購入：10回分を100円で追加可能</li>
          </ul>
        </section>

        <section style={{ marginTop: 32 }}>
          <h2>解約について</h2>
          <p>
            月額プランの解約・変更は、ツール画面内の
            「解約・プラン管理」ボタンから行えます。
            解約後、次回請求は発生しません。
          </p>
        </section>

        <section style={{ marginTop: 32 }}>
          <h2>返金・キャンセルについて</h2>
          <p>
            デジタルサービスの性質上、購入後の返金・キャンセルには
            原則として対応しておりません。
          </p>
          <p>
            追加購入分は、購入時に入力されたメールアドレスに紐づく利用回数として付与されます。
            未使用分の換金・返金はできません。
          </p>
        </section>

        <section style={{ marginTop: 32 }}>
          <h2>利用上の注意</h2>
          <p>
            本サービスはレポート作成を補助するツールです。
            生成された内容は参考情報であり、提出前には必ずご自身で内容を確認・修正してください。
          </p>
          <p>
            不正利用、大量アクセス、サービス運営に支障をきたす利用が確認された場合、
            利用を制限する場合があります。
          </p>
        </section>

        <section style={{ marginTop: 32 }}>
          <h2>対応環境</h2>
          <p>
            PCブラウザでの利用を推奨しています。
            Chrome、Safariなどの最新版ブラウザでの利用をおすすめします。
          </p>
        </section>

        <section style={{ marginTop: 32 }}>
          <h2>よくある質問</h2>

          <h3>無料で使えますか？</h3>
          <p>初回3回まで無料で利用できます。</p>

          <h3>月額プランは解約できますか？</h3>
          <p>
            はい。ツール画面内の「解約・プラン管理」ボタンからいつでも解約できます。
          </p>

          <h3>返金はできますか？</h3>
          <p>
            デジタルサービスの性質上、購入後の返金には原則対応しておりません。
          </p>

          <h3>スマホでも使えますか？</h3>
          <p>
            スマホでも表示は可能ですが、長文入力やコピー操作のしやすさからPC利用を推奨しています。
          </p>
        </section>

        <section style={{ marginTop: 32 }}>
          <h2>お問い合わせ</h2>
          <p>
            サービスに関するお問い合わせは、以下のメールアドレスまでご連絡ください。
            通常、2〜3営業日以内に確認します。
          </p>
          <p>
            <strong>メールアドレス：</strong>
            takagame0127@gmail.com
          </p>
        </section>

        <section style={{ marginTop: 32 }}>
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

          <div>お問い合わせ：takagame0127@gmail.com</div>
        </footer>
      </div>
    </main>
  );
}