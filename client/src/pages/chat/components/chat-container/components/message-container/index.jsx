
import { useAppStore } from "@/store"
import { useEffect, useRef } from "react";
import moment from "moment";
import { GET_MESSAGES_ROUTES } from '@/utils/constants.js'
import { apiClient } from "@/lib/api-client";

const MessageContainer = () => {
    const { selectedChatType, selectedChatData, userInfo, selectedChatMessages, setSelectedChatMessages } = useAppStore();
    const scrollRef = useRef();

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await apiClient.post(GET_MESSAGES_ROUTES,
                    { id: selectedChatData._id },
                    { withCredentials: true }
                );
                if (response.data.messages) {
                    setSelectedChatMessages(response.data.messages)
                } else {
                    setSelectedChatMessages([])
                }


            }
            catch (error) {
                console.log(error)
            }

        }
        if (selectedChatData._id) {
            if (selectedChatType === "contact") {
                getMessages();
                console.log("getMessages")
            }
        }
    }, [selectedChatData, selectedChatType, setSelectedChatMessages])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ bahavior: "smooth" })
        }
    }, [selectedChatMessages])


    const renderMessages = () => {
        let lastDate = null;
        return selectedChatMessages.map((message, index) => {
            const messageData = moment(message.timestamp).format("YYYY-MM-DD")
            const showDate = messageData !== lastDate;
            lastDate = messageData;
            return (
                <div key={index}>
                    {showDate && <div className="text-center text-gray-500 my-2">
                        {moment(message.timestamp).format("LL")}
                    </div>}
                    {
                        selectedChatType === "contact" && renderDMMessages(message)
                    }
                </div>
            )
        })
    }

    const renderDMMessages = (message) =>
    (
        <div className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"}`}>
            {message.messageType === "text" && (
                <div className={`${message.sender !== selectedChatData._id ?
                    "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" :
                    "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"} border inline-block p-4 rounded my-1 max-w-[50%] break-words`}>
                    {message.content}
                </div>
            )}
            <div className="text-xs text-gray-600">
                {moment(message.timestamp).format("LT")}
            </div>
        </div>
    );


    return (
        <div className="flex-1 overflow-y-auto scrollbar-hidden  p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
            {renderMessages()}
            <div ref={scrollRef}></div>
        </div>
    )
}

export default MessageContainer

