import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from "react-router-dom";


const ContactsContainer = () => {
    const navigate = useNavigate();
    return (
        <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw]  bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">

            <div className="pt-3 pr-10 flex items-center justify-center">
                <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" onClick={() => navigate("/profile")} />
            </div>
            <div className="my-5">
                <div className="flex items-center justify-between pr-10">
                    <Title text="Direct Messages" />
                </div>
            </div>
            <div className="my-5">
                <div className="flex items-center justify-between pr-10">
                    <Title text="Channels" />
                </div>
            </div>
        </div>
    )
}

export default ContactsContainer;


const Title = ({ text }) => {
    return (
        <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light top-opacity-90 text-stone-100">{text}</h6>
    )
}