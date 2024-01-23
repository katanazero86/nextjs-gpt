import ChatForm from "@/components/ChatForm/ChatForm";

export default function Home() {
  return (
      <main id='app-main' className="flex min-h-screen flex-col items-center justify-between p-3">
          <div className="w-full">
              <p className="font-sans text-center text-xl w-full py-2">
                  <code className="font-mono font-bold">src/app/page.tsx</code>
              </p>
              <hr className="h-px my-2 border-0 w-full bg-gray-800"/>
              <p className="font-sans text-center text-md w-full py-2">
                  AI와 질문을 주고 받아보세요!
              </p>
          </div>
          <ChatForm />
      </main>
  );
}
