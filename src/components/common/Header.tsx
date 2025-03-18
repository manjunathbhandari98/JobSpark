import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo";
import { useState } from "react";
import UserButton from "./UserButton";
import { Bell } from "lucide-react";
import { Button, Indicator } from "@mantine/core";
import NavLinks from "./NavLinks";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const [role, setRole] = useState<
    "EMPLOYEE" | "EMPLOYER"
  >("EMPLOYEE");
  const location = useLocation();
  const [login,setLogin] = useState(false);
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
          {/* {login ? (
            <UserButton />
          ) : (
            <Link to="/auth?mode=signup">
              <Button variant="light">
                Login
              </Button>
            </Link>
          )} */}
          <ProfileMenu/>
        </div>
      </div>
    )
  );
};

export default Header;
