export default function PrivacyPage() {
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
          lineHeight: 1.8,
        }}
      >
        <h1>プライバシーポリシー</h1>

        <p>
          Structifyでは、サービス提供のために、メールアドレス、入力されたメモ、
          利用状況、決済に関する情報を取り扱う場合があります。
        </p>

        <h2>利用目的</h2>
        <p>
          取得した情報は、本人確認、利用回数の管理、決済状態の確認、
          サービス改善、お問い合わせ対応のために利用します。
        </p>

        <h2>決済情報について</h2>
        <p>
          決済処理はStripeを通じて行われます。当サービスでは、クレジットカード番号などの
          決済情報を直接保存しません。
        </p>

        <h2>第三者提供</h2>
        <p>
          法令に基づく場合を除き、取得した個人情報を本人の同意なく第三者に提供しません。
        </p>

        <h2>お問い合わせ</h2>
        <p>
          個人情報の取り扱いに関するお問い合わせは、以下のメールアドレスまでご連絡ください。
        </p>

        <p>メールアドレス：takagame0127@gmail.com</p>

        <a href="/">トップページへ戻る</a>
      </div>
    </main>
  );
}