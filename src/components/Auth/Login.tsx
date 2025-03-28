import {
  Button,
  Loader,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAt } from "@tabler/icons-react";
import { Lock } from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../Services/UserService";
// import NotificationBar from "../common/Notification";
import { loginValidation } from "../../Validations/FormValidation";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slices/UserSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, { toggle }] =
    useDisclosure(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    name:'',
    id:''
  });

  const [loading, setLoading] = useState(false);

  // Form errors state
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  // Handle input changes with validation
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // Clear error as soon as user types
    setFormError((prev) => ({
      ...prev,
      [name]: "", // Clear the error immediately
    }));
  };


  // Handle login with final validation
  const handleLogin = async () => {
  const newErrors = {
    email: loginValidation("email", data.email),
    password: loginValidation("password", data.password),
  };

  setFormError(newErrors);

  if (Object.values(newErrors).some((error) => error)) {
    return;
  }

  try {
    setLoading(true);
    const response = await loginUser({
      email: data.email,
      password: data.password,
    });

    // Ensure the response contains user details
    if (response?.data) {
      const { name, id, accountType } = response.data;

      const updatedUserData = {
        email: data.email,
        password:data.password,
        name,
        id,
        accountType,
      };

      // Update state & Redux store
      setData(updatedUserData);
      dispatch(setUser(updatedUserData));

      notifications.show({
        title: "Welcome Back!",
        message: "You have successfully logged in. Enjoy your session! 🎉",
        color: "greenTheme.5",
      });

      setTimeout(() => {
        navigate("/");
      }, 2500);
    } else {
      throw new Error("Invalid response from server.");
    }
  } catch (error: any) {
    notifications.show({
      title: "Login Failed",
      message: "Invalid credentials. Please check your email and password.",
      color: "red.7",
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="px-20 w-full flex flex-col gap-3">
      <div className="text-xl font-medium">
        Login to Your Account
      </div>
      <div className="form flex flex-col gap-4">
        <TextInput
          leftSectionPointerEvents="none"
          leftSection={<IconAt size={18} />}
          label="Email"
          placeholder="Your Email"
          variant="default"
          name="email"
          color="gray-8"
          withAsterisk
          value={data.email}
          onChange={handleChange}
          error={formError.email} // Dynamically show/hide error
        />
        <PasswordInput
          leftSectionPointerEvents="none"
          leftSection={<Lock size={18} />}
          label="Password"
          name="password"
          placeholder="Password"
          variant="default"
          color="gray-8"
          visible={visible}
          onVisibilityChange={toggle}
          withAsterisk
          value={data.password}
          onChange={handleChange}
          error={formError.password} // Dynamically show/hide error
        />
        <Button
          color="greenTheme.5"
          className="!py-2 !text-black"
          onClick={handleLogin}
        >
          {loading ? (
            <Loader
              color="blue"
              type="dots"
            />
          ) : (
            "Login"
          )}
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
        <div className="flex justify-center">
          <Link to='/auth?mode=forgot' className="text-green-500">
          Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
