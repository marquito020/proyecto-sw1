import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Message } from "../../../models/chat.model";

interface MessageProps {
  messages: Message[];
}

function Messages(props: MessageProps) {
  const { messages } = props;
  return (
    <>
      {messages.map((element, index) => (
        <div key={index}>
          <div className="text-end text-base font-semibold w-full px-4 py-2 mx-3 mb-8 ">
            <p>{element.message}</p>
          </div>
          <div className="bg-zinc-700 rounded border border-neutral-500 w-full px-4 py-2 mx-3 mb-8 ">
            <ReactMarkdown
              className="prose max-w-none prose-p:text-gray-300 prose-a:text-gray-300 prose-li:text-gray-300 prose-ol:text-gray-300 prose-strong:text-white prose-em:text-white prose-headings:text-white prose-code:text-white prose-tr:text-gray-300"
              children={element.responseText}
              remarkPlugins={[remarkGfm]}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default Messages;
