export default function LegalPage() {
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
        <h1>特定商取引法に基づく表記</h1>

        <div style={{ lineHeight: 1.9, color: "#333" }}>
          <p><strong>販売事業者：</strong>Structify</p>
          <p><strong>運営責任者：</strong>井上貴之</p>
          <p><strong>所在地：</strong>請求があった場合に遅滞なく開示します。</p>
          <p><strong>電話番号：</strong>請求があった場合に遅滞なく開示します。</p>
          <p><strong>メールアドレス：</strong>takagame0127@gmail.com</p>

          <p><strong>販売価格：</strong>各商品ページまたは決済ページに表示された金額</p>
          <p><strong>商品代金以外の必要料金：</strong>インターネット接続料金等はお客様の負担となります。</p>

          <p><strong>支払方法：</strong>クレジットカード決済</p>
          <p><strong>支払時期：</strong>決済時に即時処理されます。</p>
          <p><strong>サブスクリプションの解約について：</strong>
                    月額プランの解約・変更は、サイト内の「解約・プラン管理」ボタンから行えます。
          </p>

          <p><strong>商品の提供時期：</strong>決済完了後、即時に利用可能です。</p>

          <p>
            <strong>返品・キャンセルについて：</strong>
            デジタルサービスの性質上、購入後の返金・キャンセルは原則としてお受けしておりません。
          </p>

          <p>
            <strong>動作環境：</strong>
            PCブラウザでの利用を推奨しています。
          </p>
        </div>

        <a href="/" style={{ display: "inline-block", marginTop: 24 }}>
          トップページへ戻る
        </a>
      </div>
    </main>
  );
}