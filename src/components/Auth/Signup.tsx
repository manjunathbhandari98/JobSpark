import { Button, Group, Loader, PasswordInput, Radio, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAt } from "@tabler/icons-react";
import { Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { useState } from "react";
import { registerUser } from "../../Services/UserService";
import NotificationBar from "../common/Notification"; // ✅ Import NotificationBar
import { signupValidation } from "../../Validations/FormValidation"; 
import { notifications } from '@mantine/notifications';

const Signup = () => {
  const navigate = useNavigate();
  const [visible, { toggle }] = useDisclosure(false);
  const [loading, setLoading] = useState(false); // ✅ Added loading state


  // State for form data
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "APPLICANT",
  });

  // State for form errors
  const [formError, setFormError] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Handle input changes with validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));

    let errorMessage = signupValidation(name, value);

    // If password changes, revalidate confirmPassword
    if (name === "password") {
      setFormError(prev => ({
        ...prev,
        password: errorMessage, 
        confirmPassword: data.confirmPassword && data.confirmPassword !== value ? "Passwords do not match!" : ""
      }));
    } else if (name === "confirmPassword") {
      setFormError(prev => ({
        ...prev,
        confirmPassword: value !== data.password ? "Passwords do not match!" : ""
      }));
    } else {
      setFormError(prev => ({
        ...prev,
        [name]: errorMessage, 
      }));
    }
  };

  // Handle signup with final validation
  const handleSignup = async () => {
    const newErrors = {
      name: signupValidation("name", data.name),
      email: signupValidation("email", data.email),
      password: signupValidation("password", data.password),
      confirmPassword: data.password !== data.confirmPassword ? "Passwords do not match!" : "",
    };

    setFormError(newErrors);

    // If any error exists, stop the function
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    try {
      setLoading(true); // ✅ Show loader
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        accountType: data.accountType,
      });

      setLoading(false); // ✅ Hide loader
    


      // ✅ Delay navigation to show the notification
      setTimeout(() => {
          notifications.show({
  title: "Account Created! 🎉",
  message: `Hey ${data.name}, welcome to JobSpark! Start exploring now.`,
  color: "greenTheme.5",
});
        navigate("/");
      }, 2500);

    } catch (error: any) {
      setLoading(false); // ✅ Hide loader in case of error
      notifications.show({
  title: "Signup Failed",
  message: error.errorMessage,
  color: "red.7",
});

    }
  };

  return (
    <div className="px-20 w-full flex flex-col gap-3">
     
      <div className="text-xl font-medium">Create Account</div>
      <div className="form flex flex-col gap-4">
        <TextInput
          label="Full Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Your Full Name"
          withAsterisk
          error={formError.name}
        />
        <TextInput
          leftSection={<IconAt size={18} />}
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Your Email"
          withAsterisk
          error={formError.email}
        />
        <PasswordInput
          leftSection={<Lock size={18} />}
          label="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
          visible={visible}
          onVisibilityChange={toggle}
          placeholder="Password"
          withAsterisk
          error={formError.password}
        />
        <PasswordInput
          leftSection={<Lock size={18} />}
          label="Confirm Password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleChange}
          visible={visible}
          onVisibilityChange={toggle}
          placeholder="Confirm Password"
          withAsterisk
          error={formError.confirmPassword}
        />
        <Radio.Group
          name="accountType"
          label="You are"
          value={data.accountType}
          onChange={(value) =>
            setData({
              ...data,
              accountType: value,
            })
          }
          withAsterisk
        >
          <Group    className="[&>*]:px-6 [&>*]:py-4 [&>*]:border [&>*]:rounded-lg [&>*]:border-green-500 [&>*]:hover:bg-gray-800/50"
         >
            <Radio value="APPLICANT" label="Employee" />
            <Radio value="EMPLOYER" label="Employer" />
          </Group>
        </Radio.Group>
        <Button color="greenTheme.5" className="!py-2 !text-black" onClick={handleSignup} disabled={loading}>
          {loading ? <Loader color="blue" type="dots" /> : "Sign Up"} {/* ✅ Show loader */}
        </Button>
        <div className="flex gap-3 justify-center">
          Have an Account?{" "}
          <Link to="?mode=login" className="text-green-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
