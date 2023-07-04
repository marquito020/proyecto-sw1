import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiChat4Line } from "react-icons/ri";
import { RootState } from "../../../redux/store";
import { useGetUserChatsQuery } from "../../../services/chat.service";
import { useDeleteChatMutation } from "../../../services/chat.service";

function NavUserChats() {
  const user = useSelector((state: RootState) => state.user);
  const { data, isLoading, error, isError } = useGetUserChatsQuery(user._id);
  const location = useLocation();
  const navigate = useNavigate();
  const [deleteChatMutation] = useDeleteChatMutation();

  /* Delete chat */
  const deleteChat = (chatId: string) => {
    try {
      console.log(`Delete  ${chatId}`);
      const response = deleteChatMutation(chatId);
      console.log(response);
      navigate("/new-chat", { replace: true });
      /* Reload Windows */
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <div>Loading chats</div>;
  else if (isError)
    return (
      <div>
        Error: <>{error}</>
      </div>
    );

  return (
    <>
      {data?.map((chat) => (
        <li key={chat._id}>
          <NavLink
            to={`/chats/${chat._id}`}
            className={({ isActive }) =>
              isActive
                ? "flex items-center mb-1 gap-4 py-2 px-4 rounded-lg bg-[#131517] "
                : "flex items-center mb-1 gap-4 hover:bg-[#131517] transition-colors py-2 px-4 rounded-lg"
            }
          >
            <RiChat4Line />
            {`Chat: ${chat._id?.substring(0, 8)}...`}
            {location.pathname === `/chats/${chat._id}` && (
              <button
                className="ml-auto text-red-500 hover:text-red-600 transition-colors"
                onClick={() => {
                  deleteChat(chat._id!);
                }}
              >
                x
              </button>
            )}
          </NavLink>
        </li>
      ))}
    </>
  );
}

export default NavUserChats;
