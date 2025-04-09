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
import { loginValidation } from "../../Validations/FormValidation";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";
import { loginUser } from "../../Services/AuthService";
import { setToken } from "../../Slices/JWTSlice";
import { setUser } from "../../Slices/UserSlice";
import { useMantineColorScheme } from "@mantine/core";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, { toggle }] =
    useDisclosure(false);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    id: "",
  });

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setFormError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleLogin = async () => {
    const newErrors = {
      email: loginValidation("email", data.email),
      password: loginValidation(
        "password",
        data.password
      ),
    };

    setFormError(newErrors);
    if (
      Object.values(newErrors).some(
        (error) => error
      )
    )
      return;

    try {
      setLoading(true);
      const response = await loginUser({
        username: data.email,
        password: data.password,
      });

      if (response) {
        const { name, id, accountType } =
          response;
        const updatedUserData = {
          email: data.email,
          name,
          id,
          accountType,
        };

        dispatch(setToken(response.token));
        const profileResponse = await getProfile(
          id
        );
        if (profileResponse?.data) {
          dispatch(
            setProfile(profileResponse.data)
          );
          dispatch(setUser(updatedUserData));
        }

        notifications.show({
          title: "Welcome Back!",
          message:
            "You have successfully logged in. 🎉",
          color: "greenTheme.5",
        });

        setTimeout(() => navigate("/"), 1000);
      } else {
        throw new Error(
          "Invalid response from server."
        );
      }
    } catch (error: any) {
      notifications.show({
        title: "Login Failed",
        message:
          "Invalid credentials. Please check your email and password.",
        color: "red.7",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full max-w-md mx-auto px-6 md:px-16 py-10 rounded-xl shadow-md transition-colors duration-300 ${
        isDark
          ? "bg-[#1A1B1E] text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Login to Your Account
      </h2>

      <div className="flex flex-col gap-5">
        <TextInput
          leftSectionPointerEvents="none"
          leftSection={<IconAt size={18} />}
          label="Email"
          placeholder="Your Email"
          name="email"
          withAsterisk
          value={data.email}
          onChange={handleChange}
          error={formError.email}
        />
        <PasswordInput
          leftSectionPointerEvents="none"
          leftSection={<Lock size={18} />}
          label="Password"
          name="password"
          placeholder="Password"
          visible={visible}
          onVisibilityChange={toggle}
          withAsterisk
          value={data.password}
          onChange={handleChange}
          error={formError.password}
        />

        <Button
          fullWidth
          color="greenTheme.5"
          className={`!py-2 ${
            isDark ? "!text-white" : "!text-black"
          }`}
          onClick={handleLogin}
          radius="md"
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

        <div
          className={`text-center text-sm ${
            isDark
              ? "text-gray-400"
              : "text-gray-600"
          }`}
        >
          Don't have an account?{" "}
          <Link
            to="?mode=signup"
            className="text-green-600 font-medium hover:underline"
          >
            Signup
          </Link>
        </div>
        <div
          className={`text-center text-sm ${
            isDark
              ? "text-gray-400"
              : "text-gray-600"
          }`}
        >
          <Link
            to="/auth?mode=forgot"
            className="text-green-600 font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
