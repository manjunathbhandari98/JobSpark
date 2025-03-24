import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo";
import { useState,useEffect } from "react";
import UserButton from "./UserButton";
import { Bell } from "lucide-react";
import { Button, Indicator } from "@mantine/core";
import NavLinks from "./NavLinks";
import ProfileMenu from "./ProfileMenu";
import {useSelector} from 'react-redux';

const Header = () => {
  const [role, setRole] = useState<
    "EMPLOYEE" | "EMPLOYER"
  >("EMPLOYEE");
  const location = useLocation();
  const user = useSelector((state:any)=>state.user)

  
  return (
    location.pathname !== "/auth" && (
      <div className="w-full flex h-22 text-white justify-between p-5 items-center bg-[#040611]">
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        {/* Header options */}
        <NavLinks role={role} />
        {/* switch - delete later */}
        <Button
          onClick={() => {
            if (role === "EMPLOYEE") {
              setRole("EMPLOYER");
            } else {
              setRole("EMPLOYEE");
            }
          }}
        >
          Switch
        </Button>

        {/* Profile */}
        <div className="flex gap-7 items-center">
          <Indicator
            color="green"
            size={10}
            processing
          >
            <Bell
              size={28}
              className="cursor-pointer"
            />
          </Indicator>
          {user ? (
            <ProfileMenu image={user.image} name={user.name} 
        email={user.email}/>
          ) : (
            <Link to="/auth?mode=login">
              <Button variant="light">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    )
  );
};

export default Header;
