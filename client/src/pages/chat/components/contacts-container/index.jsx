
import { useEffect, useState } from 'react';
import NewDm from './components/new-dm';
import ProfileInfo from './components/profile-info';
import logo from '@/assets/login2.png';
import { apiClient } from '@/lib/api-client';
import { GET_DM_CONTACTS_ROUTES } from "@/utils/constants"
import ContactList from "@/components/contact-list"


const ContactsContainer = () => {
    const [directMessagesContacts, setDirectMessagesContacts] = useState([])

    useEffect(() => {
        const getContacts = async () => {
            const response = await apiClient.get(GET_DM_CONTACTS_ROUTES,
                { withCredentials: true },
            );
            if (response.data.contacts) {
                setDirectMessagesContacts(response.data.contacts)
            }
        }

        getContacts();
    }, [])

    return (
        <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw]  bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">

            <div className="pt-3 pr-10 flex items-center justify-start ">
                <img className="text-xl  cursor-pointer w-20 h-auto pl-10" src={logo} alt="logo" />
            </div>
            <div className="my-5">
                <div className="flex items-center justify-between pr-10">
                    <Title text="Direct Messages" />
                    <NewDm />
                </div>
                <div className="max-h-[38] overflow-y-auto scrollbar-hidden">
                    <ContactList contacts={directMessagesContacts} />
                </div>
            </div>
            <div className="my-5">
                <div className="flex items-center justify-between pr-10">
                    <Title text="Channels" />
                </div>
            </div>
            <ProfileInfo />
        </div>
    )
}

export default ContactsContainer;


const Title = ({ text }) => {
    return (
        <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light top-opacity-90 text-stone-100">{text}</h6>
    )
}