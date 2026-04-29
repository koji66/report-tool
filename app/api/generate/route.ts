import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return Response.json({ error: "メモが空です" }, { status: 400 });
    }

    const prompt = `
あなたは学生向けのレポート構成補助ツールです。

以下のメモをもとに、次の形式で出力してください。

【テーマ判定】
説明 / 比較 / 問題解決 / 意見・考察

【整理されたノート】
・要点を整理

【レポート構成】
・序論
・本論1
・本論2
・結論

【序論の書き出し例】
1文

【結論の書き出し例】
1文

メモ:
${text}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return Response.json({
      result: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "AI生成中にエラーが発生しました" },
      { status: 500 }
    );
  }
}