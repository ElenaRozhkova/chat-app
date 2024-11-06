import { useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from 'react-icons/io5'
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { getColor, colors } from '@/lib/utils'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { Input } from '@/components/ui/input'
import { Button } from "@radix-ui/themes";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import {
    UPDATE_PROFILE_ROUTE,
    UPDATE_PROFILE_IMAGE,
    REMOVE_PROFILE_IMAGE
} from "@/utils/constants";
import { HOST } from '@/utils/constants'



const Profile = () => {
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useAppStore()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [selectedColor, setSelectedColor] = useState(0);
    const fileInputRef = useRef(null)


    useEffect(() => {
        if (userInfo.profileSetup) {
            setFirstName(userInfo.firstName)
            setLastName(userInfo.lastName)
            setSelectedColor(userInfo.color)
        }
        if (userInfo.image) {
            console.log(`${HOST}/${userInfo.image}`);
            setImage(`${HOST}/${userInfo.image}`)
        }
    }, [userInfo])

    const validateProfile = () => {
        if (!firstName) {
            toast.error("First Name is required")
            return false
        }
        if (!lastName) {
            toast.error("Last Name is required")
            return false
        }
        return true
    }
    const saveChanges = async () => {
        if (validateProfile()) {
            try {
                const response = await apiClient.post(UPDATE_PROFILE_ROUTE,
                    { firstName, lastName, color: selectedColor },
                    { withCredentials: true })
                if (response.status === 200) {
                    setUserInfo({ ...response.data })
                    toast.success("Profile updated succesfully")
                    navigate("/chat")
                }
            }
            catch
            (error) {
                console.log(error)
            }

        }

    }

    const handleNavigate = () => {
        if (userInfo.profileSetup) {
            navigate("/chat")
        } else {
            toast.error("Please setup profile")
        }
    }

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    }

    const handleImageChange = async (event) => {
        if (event.target && event.target.files) {
            const file = event.target.files[0];
            console.log(event.target.files)

            const formData = new FormData();
            formData.append("profile-image", file)
            const response = await apiClient.post(UPDATE_PROFILE_IMAGE,
                formData,
                { withCredentials: true }
            );
            if (response.status === 200) {
                setUserInfo({ ...userInfo, image: response.data.image })
                toast.success("Image updated succesfully.")
            }

            {/*const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result)
        }
        reader.readAsDataURL(file)*/}

        }
    }

    const handleDeleteImage = async () => {
        try {
            const response = await apiClient.delete(REMOVE_PROFILE_IMAGE,
                { withCredentials: true }
            )

            if (response.status === 200) {
                setUserInfo({ ...userInfo, image: null })
                toast.success("Image deleted.")
                setImage(undefined)
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    return (<>
        <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
            <div className="flex  flex-col gap-10 w-[80vw] md:w-max">
                <div onClick={handleNavigate}>
                    <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" onClick={() => navigate("/auth")} />
                </div>
                <div className="grid grid-cols-2">
                    <div className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
                            {
                                image ?
                                    <AvatarImage
                                        src={image}
                                        alt="profile"
                                        className="object-cover w-full h-full bg-black"
                                    />
                                    :
                                    <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}
                                    >
                                        {firstName ? firstName.split("").shift() : userInfo.email.split("").shift()}
                                    </div>
                            }
                        </Avatar>
                        {
                            hovered &&
                            <div onClick={image ? handleDeleteImage : handleFileInputClick}
                                className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full">
                                {
                                    image ? <FaTrash className="text-white text-3xl cursor-pointer" /> : <FaPlus className="text-white text-3xl cursor-pointer" />
                                }
                            </div>
                        }
                        <input type="file" ref={fileInputRef} className="hidden"
                            onChange={handleImageChange} name="profile-image" accept=".jpg, .png, .jpeg, .svg, .webp" />
                    </div>
                    <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
                        <div className="w-full">
                            <Input placeholder="Email" type="email" disabled value={userInfo.email}
                                className="roundet-lg p-6 bg-[#2c2e3b] border-none"
                            />
                        </div>
                        <div className="w-full">
                            <Input placeholder="Firs Name" type="text" value={firstName}
                                onChange={e => { setFirstName(e.target.value) }}
                                className="rounded-lg p-6 bg-[#2c2e3b] border border-transparent 
  focus:outline-none focus:border focus:border-white
  hover:border hover:border-white cursor-pointer
  transition-all duration-300"
                            />
                        </div>
                        <div className="w-full">
                            <Input placeholder="Last Name" type="text" value={lastName}
                                onChange={e => { setLastName(e.target.value) }}
                                className="rounded-lg p-6 bg-[#2c2e3b] border border-transparent 
  focus:outline-none focus:border focus:border-white
  hover:border hover:border-white cursor-pointer
  transition-all duration-300"
                            />
                        </div>
                        <div className="w-full flex gap-5">
                            {colors.map((color, index) => (
                                <div className={`${color} h-4 w-4 rounded-full cursor-pointer transition-all duration-300 
                                  ${selectedColor === index
                                        ? "outline outline-white/50 outline-1"
                                        : ""
                                    }`}
                                    key={index}
                                    onClick={() => { setSelectedColor(index) }}></div>))
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <Button className="text-white h-16 w-full  bg-purple-700 hover:bg-purple-900 transition-all duration-300"
                        onClick={saveChanges}> Save Changes</Button>
                </div>
            </div >
        </div >

    </>)
}

export default Profile;