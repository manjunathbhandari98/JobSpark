import { Link } from "react-router-dom";
import Logo from "../../assets/Logo";
import { useState } from "react";
import UserButton from "./UserButton";
import { Bell } from "lucide-react";
import { Indicator } from "@mantine/core";
import NavLinks from "./NavLinks";

const Header = () => {
  const [role, setRole] = useState<
    "EMPLOYEE" | "EMPLOYER"
  >("EMPLOYEE");
  return (
    <div className="w-full flex h-22 text-white justify-between p-5 items-center bg-[#040611]">
      <div>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      {/* Header options */}
      <NavLinks role={role} />
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

        <UserButton />
      </div>
    </div>
  );
};

export default Header;
