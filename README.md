## nextjs-gpt

---

**1. 프로젝트 생성**

```
npx create-next-app@latest

What is your project named? nextjs-gpt
Would you like to use TypeScript?  Yes
Would you like to use ESLint? Yes
Would you like to use Tailwind CSS? Yes
Would you like to use `src/` directory? Yes
Would you like to use App Router? (recommended) Yes
Would you like to customize the default import alias (@/*)? No
```

**2. OpenAI API Key 발급**
 
- https://platform.openai.com/

![img.png](imgs/img.png)
![img.png](imgs/img2.png)

- Create new secret key 를 클릭하여, 키를 생성
- 발급 받은 키를 .env 에 추가해주기
- .env 는 저장소에 커밋 푸시가 되지 않도록 주의

```
OPENAI_API_KEY=YOUR_API_KEY
```

**3. API 요청할 코드 작성**

- https://platform.openai.com/examples   
위 링크를 가면, 친절하게 다양한 예제들을 제공해주고 있다.
- `npm i -S openai`
- 첫번째 API 요청 코드 작성해보기
- test 용 api 하나 작성
```
// app/api/hello/route.ts
export async function GET(request: Request, response: Response) {
    return Response.json('GET: hello api');
}
```

```
// app/services/openAiTestService.ts
import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function openAiMain() {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
}
```

- 429 에러(요청량 초과)가 발생하면, 크레딧이 없는거지 결제를 해야한다.(저는 100달러 충전 부가세 포함 110달러)
![img.png](imgs/img3.png)
![img.png](imgs/img4.png)