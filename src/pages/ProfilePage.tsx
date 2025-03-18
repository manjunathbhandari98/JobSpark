import { Divider } from "@mantine/core";
import Profile from "../components/Profile/Profile";
import { profile } from "../data/TalentData";

const ProfilePage = () => {
 return (<div className="py-5">
    <Divider/>
    <Profile {...profile}/>
 </div>) 
};

export default ProfilePage;