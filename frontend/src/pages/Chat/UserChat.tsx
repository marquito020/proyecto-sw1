import { useEffect, ChangeEvent, FormEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { RiSendPlaneFill } from "react-icons/ri";

import Messages from "./components/Messages";
import { socket } from "../../config/socket";
import { RootState } from "../../redux/store";
import {
  useSendMessageMutation,
  useGetChatQuery,
} from "../../services/chat.service";
import { resetMessage } from "../../redux/states/messages.state";

function UserChat() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || id.length != 24) {
      return navigate("/new-chat", { replace: true });
    }
  }, []);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { data: chat, isLoading, isError } = useGetChatQuery(`${id}`);
  const [sendMessage] = useSendMessageMutation();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [partialResponse, setPartialResponse] = useState<string>("");

  useEffect(() => {
    dispatch(resetMessage());
  }, []);

  if (isLoading) return <div>Loading chat</div>;
  else if (isError) return <div>Error</div>;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      socket.on("partialResponse", (...args) => {
        setPartialResponse(args[0]);
      });

      const response = await sendMessage({
        message,
        userId: user._id,
        _id: id,
      }).unwrap();
      setPartialResponse("");
      setMessage("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" text-gray-300 w-full">
      <Messages messages={chat?.messages ? chat?.messages : []} />

      {partialResponse != "" ? (
        <div className="bg-zinc-700 rounded border border-neutral-500 w-full px-4 py-2 mx-3 mb-8 ">
          <ReactMarkdown
            className="prose max-w-none prose-p:text-gray-300 prose-a:text-gray-300 prose-li:text-gray-300 prose-ol:text-gray-300 prose-strong:text-white prose-em:text-white prose-headings:text-white prose-code:text-white prose-tr:text-gray-300"
            children={partialResponse}
            remarkPlugins={[remarkGfm]}
          />
        </div>
      ) : undefined}
      <div className="flex items-center justify-center w-full relative">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex">
            <input
              onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                setMessage(target.value)
              }
              type="text"
              name="message"
              id="message"
              className="outline-none rounded-l-lg bg-[#1E1F25] border border-neutral-700 w-full block ml-6 flex-1 p-2.5"
            />
            <span className="inline-flex items-center px-3 bg-[#1E1F25] border border-neutral-700 rounded-r-md hover:bg-neutral-700">
              <button type="submit" disabled={loading}>
                {loading ? (
                  <div className=" inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.130em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                ) : (
                  <RiSendPlaneFill />
                )}
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserChat;
