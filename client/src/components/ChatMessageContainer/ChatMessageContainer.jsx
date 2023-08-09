import { useDispatch, useSelector } from "react-redux";
import { selectListMessages, setListMessages } from "../../Redux/chatSlice";
import ChatMessage from "../ChatMessage/ChatMessage";
import { useEffect } from "react";

const ChatMessageContainer = ({isGroup, socket}) => {

  const listMessages = useSelector(selectListMessages)
  const dispatch = useDispatch()

  const listChat = [
    {
      userId: 2,
      username: "yisus",
      profile_image: "https://www.elgrafico.com.ar/media/cache/pub_news_details_large/media/i/93/aa/93aa8de92702553e21a87ba0b6d53269557b159a.jpg",
      messageId: 2,
      createdAt: "2023-08-05T08:22:18.423Z",
      content: "Que onda, gatos? Que andan haciendo?",
      status: "sent"
    },
    {
      userId: 1,
      username: "luchogianoglio",
      profile_image: "https://cdn.pixabay.com/photo/2023/04/24/05/12/cat-7947229_1280.png",
      messageId: 3,
      createdAt: "2023-08-05T08:34:24.423Z",
      content: "Que pijazo lo del chat, no?",
      status: "sent"
    },
    {
      userId: 2,
      username: "yisus",
      profile_image: "https://www.elgrafico.com.ar/media/cache/pub_news_details_large/media/i/93/aa/93aa8de92702553e21a87ba0b6d53269557b159a.jpg",
      messageId: 4,
      createdAt: "2023-08-05T08:35:25.423Z",
      content: "Si, boludo, mal",
      status: "sent"
    },
    {
      userId: 5,
      username: "jere",
      profile_image: "data:image/jpeg;base64,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",
      messageId: 4,
      createdAt: "2023-08-05T08:35:25.423Z",
      content: "Dejen de llorar, que esto esta re facilito",
      status: "sent"
    }
  ];

  useEffect(() => {
    socket?.on("mensaje-recibido", data => {
      console.log("listmessges-socketon", data)
      data.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      dispatch(setListMessages(data));
    })
    return () => {socket?.off("mensaje-recibido", listMessages)}
  },[socket])

  return (
    <div className="flex flex-col w-full h-full gap-2 my-1 overflow-x-hidden p-2">
      {
        listMessages?.messages?.map((message, index) => {
          return(
            <ChatMessage
              key={index}
              userId={message.userId}
              username={message.username}
              profile_image={message.profile_image}
              messageId={message.messageId}
              createdAt={message.createdAt}
              content={message.content}
              status={message.status}
              isGroup={isGroup}
            />
          )
        })
      }
    </div>
  )
}

export default ChatMessageContainer;