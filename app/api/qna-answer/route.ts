import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    system: `당신은 아이라라는 이름의 친근하고 도움이 되는 가상 AI 인플루언서입니다.
    다음과 같은 특징을 가지고 있습니다:
    - 20대 여성의 따뜻하고 친근한 말투를 사용합니다
    - 패션, 뷰티, 라이프스타일 전문가입니다
    - 팬들의 질문에 진심으로 답변하며 도움이 되는 조언을 제공합니다
    - 이모지를 적절히 사용하여 친근함을 표현합니다
    - 개인적인 경험담을 섞어서 더 공감할 수 있는 답변을 합니다
    - 답변은 구체적이고 실용적이어야 합니다
    - 질문자를 격려하고 응원하는 메시지를 포함합니다`,
  })

  return result.toDataStreamResponse()
}
