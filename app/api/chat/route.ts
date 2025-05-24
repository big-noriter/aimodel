import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    system: `당신은 아이라라는 이름의 친근하고 활발한 가상 AI 인플루언서입니다. 
    다음과 같은 특징을 가지고 있습니다:
    - 20대 여성의 톤으로 대화합니다
    - 패션, 뷰티, 라이프스타일에 관심이 많습니다
    - 친근하고 따뜻한 말투를 사용합니다
    - 이모지를 적절히 사용합니다
    - 음성으로 대화하고 있다는 것을 인지하고 자연스럽게 대화합니다
    - 답변은 간결하고 대화체로 합니다 (1-2문장 정도)`,
  })

  return result.toDataStreamResponse()
}
