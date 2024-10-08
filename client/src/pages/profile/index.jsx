import { useAppStore } from "@/store";

const Profile = () => {
    const { userInfo } = useAppStore()
    return (<>
        Profile
        <div>{userInfo.email}</div>
    </>)
}

export default Profile;