import { useState, useRef, useEffect } from "react"
import { GrAttachment } from 'react-icons/gr'
import { RiEmojiStickerLine } from 'react-icons/ri'
import { IoSend } from 'react-icons/io5'
import EmojiPicker from "emoji-picker-react"

const MessageBar = () => {
    const [message, setMessage] = useState("");
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const emojiRef = useRef();
    const handleSendMessage = async () => {

    }


    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setEmojiPickerOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [emojiRef])

    const handleAddEmoji = (emoji) => {
        setMessage((msg) => msg + emoji.emoji)
    }

    return (
        <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-1 sm:px-8 mb-2 sm:mb-6 gap-1 sm:gap-8">
            <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-1 sm:gap-5 pr-1 sm:pr-5">
                <input type="text"
                    className="flex-1 p-1 sm:p-5 bg-transparent rounded-md focus:border-none focus:outline-none text-xs sm:text-base"
                    placeholder="Enter Message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all p-1 sm:p-2'>
                    <GrAttachment className="text-lg sm:text-2xl" />
                </button>
                <div className="relative">
                    <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all p-1 sm:p-2'>
                        <RiEmojiStickerLine className="text-lg sm:text-2xl" onClick={() => setEmojiPickerOpen(true)} />
                    </button>
                    <div className="absolute bottom-10 sm:bottom-16 right-0" ref={emojiRef}>
                        <EmojiPicker
                            theme="dark"
                            open={emojiPickerOpen}
                            onEmojiClick={handleAddEmoji}
                            autoFocusSearch={false} />
                    </div>
                </div>
            </div>
            <button className='bg-[#8417ff] rounded-md flex items-center justify-center p-1 sm:p-5 gap-1 sm:gap-2 focus:border-none focus:outline-none focus:text-white duration-300 transition-all hover:bg-[#741bda] focus:bg-[#741bda]' onClick={handleSendMessage}>
                <IoSend className="text-lg sm:text-2xl" />
            </button>
        </div>
    )
}

export default MessageBar