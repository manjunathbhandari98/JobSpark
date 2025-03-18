import { Button, Checkbox, Group, PasswordInput, Radio, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAt } from "@tabler/icons-react";
import { Lock, LockIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
    const [visible, { toggle }] =
      useDisclosure(false);
 return (
   <div className="px-20 w-full flex flex-col gap-3">
     <div className="text-xl font-medium">
       Create Account
     </div>
     <div className="form flex flex-col gap-4">
       <TextInput
         label="Full Name"
         placeholder="Your Full name"
         variant="default"
         color="gray-8"
         withAsterisk
       />
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
       <PasswordInput
         leftSectionPointerEvents="none"
         leftSection={<Lock size={18} />}
         label="Confirm Password"
         placeholder="Confirm Password"
         variant="default"
         color="gray-8"
         visible={visible}
         onVisibilityChange={toggle}
         withAsterisk
       />
       <Radio.Group
         name="role"
         label="Your are"
         defaultValue="employee"
         withAsterisk
       >
         <Group
           className="[&>*]:px-6 [&>*]:py-4 [&>*]:border [&>*]:rounded-lg [&>*]:border-green-500 [&>*]:hover:bg-gray-800/50"
         >
           <Radio
             value="employee"
             label="Employee"
           />
           <Radio
             value="employer"
             label="Employer"
           />
         </Group>
       </Radio.Group>
       {/* <Checkbox
       autoContrast
         label=<div className="flex items-center gap-3">
           I accept<span className="text-green-500"> terms & conditions</span>
         </div>
       /> */}
       <Button
         color="greenTheme.5"
         className="!py-2 !text-black"
       >
         Sign Up
       </Button>
       <div className="flex gap-3 justify-center">
         Have an Account?{" "}
         <Link
           to="?mode=login"
           className="text-green-500"
         >
           Login
         </Link>
       </div>
     </div>
   </div>
 ); 
};

export default Signup;