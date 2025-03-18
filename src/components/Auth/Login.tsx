import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAt } from "@tabler/icons-react";
import { Lock } from "lucide-react";
import { Link } from 'react-router-dom';

const Login = () => {
    const [visible, { toggle }] =
          useDisclosure(false);
 return (<div className="px-20 w-full flex flex-col gap-3">
      <div className="text-xl font-medium">
        Create Account
      </div>
      <div className="form flex flex-col gap-4">
       
        <TextInput
          leftSectionPointerEvents="none"
          leftSection={<IconAt size={18} />}
          label="Email"
          placeholder="Your Email"
          variant="default"
          color="gray-8"
          withAsterisk
        />
        <PasswordInput
          leftSectionPointerEvents="none"
          leftSection={<Lock size={18} />}
          label="Password"
          placeholder="Password"
          variant="default"
          color="gray-8"
          visible={visible}
          onVisibilityChange={toggle}
          withAsterisk
        />
         <Button
                 color="greenTheme.5"
                 className="!py-2 !text-black"
               >
                 Login
               </Button>
               <div className="flex gap-3 justify-center">
                 Don't have an Account?{" "}
                 <Link
                   to="?mode=signup"
                   className="text-green-500"
                 >
                   Signup
                 </Link>
               </div>
        </div>
    </div>) 
};

export default Login;