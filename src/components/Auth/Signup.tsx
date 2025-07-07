import {
  Button,
  Group,
  Loader,
  PasswordInput,
  Radio,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconAt } from "@tabler/icons-react";
import { Lock } from "lucide-react";
import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { registerUser } from "../../Services/UserService";
import { signupValidation } from "../../Validations/FormValidation";

const Signup = () => {
  const navigate = useNavigate();
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";
  const [visible, { toggle }] =
    useDisclosure(false);
  const [loading, setLoading] = useState(false); 

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
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes with validation
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    let errorMessage = signupValidation(
      name,
      value
    );

    // If password changes, revalidate confirmPassword
    if (name === "password") {
      setFormError((prev) => ({
        ...prev,
        password: errorMessage,
        confirmPassword:
          data.confirmPassword &&
          data.confirmPassword !== value
            ? "Passwords do not match!"
            : "",
      }));
    } else if (name === "confirmPassword") {
      setFormError((prev) => ({
        ...prev,
        confirmPassword:
          value !== data.password
            ? "Passwords do not match!"
            : "",
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        [name]: errorMessage,
      }));
    }
  };
  
  // Handle signup with final validation
  const handleSignup = async () => {
    const newErrors = {
      name: signupValidation("name", data.name),
      email: signupValidation(
        "email",
        data.email
      ),
      password: signupValidation(
        "password",
        data.password
      ),
      confirmPassword:
        data.password !== data.confirmPassword
          ? "Passwords do not match!"
          : "",
    };

    setFormError(newErrors);

    // If any error exists, stop the function
    if (
      Object.values(newErrors).some(
        (error) => error
      )
    ) {
      return;
    }

    try {
      setLoading(true); 

      // Ensure we send only required fields (NO profileId)
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        accountType: data.accountType, // Keep it if your backend requires it
      });

      setLoading(false); 

      //  Delay navigation to show the notification
      setTimeout(() => {
        notifications.show({
          title: "Account Created! 🎉",
          message: `Hey ${data.name}, welcome to JobSpark! Start exploring now.`,
          color: "greenTheme.5",
        });
        navigate("/");
      }, 2500);
    } catch (error: any) {
      setLoading(false); 
      notifications.show({
        title: "Signup Failed",
        message: error.errorMessage,
        color: "red.7",
      });
    }
  };

  return (
    <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto px-4 sm:px-6 md:px-12 py-10">
      <div className="text-2xl font-semibold mb-6 text-center">
        Create Account
      </div>

      <div className="form flex flex-col gap-5">
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
          <Group className="flex flex-col sm:flex-row gap-3 mt-2">
            {/* Apply styling to the wrapper div */}
            <div
              className={`flex-1 px-4 py-3 border rounded-lg cursor-pointer border-green-500 transition ${
                data.accountType === "APPLICANT"
                  ? isDark
                    ? "bg-gray-700"
                    : "bg-gray-200"
                  : "" // Optional: Add selected state style
              } ${
                isDark
                  ? "hover:bg-gray-900"
                  : "hover:bg-gray-100"
              }`}
            >
              <Radio
                value="APPLICANT"
                label="Employee"
                // Ensure label click works - no className needed here
              />
            </div>

            {/* Apply styling to the wrapper div */}
            <div
              className={`flex-1 px-4 py-3 border rounded-lg cursor-pointer border-green-500 transition ${
                data.accountType === "EMPLOYER"
                  ? isDark
                    ? "bg-gray-700"
                    : "bg-gray-200"
                  : "" // Optional: Add selected state style
              } ${
                isDark
                  ? "hover:bg-gray-900"
                  : "hover:bg-gray-100"
              }`}
            >
              <Radio
                value="EMPLOYER"
                label="Employer"
                // Ensure label click works - no className needed here
              />
            </div>
          </Group>
        </Radio.Group>

        <Button
          fullWidth
          color="greenTheme.5"
          className="!py-2 !text-black"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <Loader
              color="blue"
              type="dots"
            />
          ) : (
            "Sign Up"
          )}
        </Button>

        <div className="text-center text-sm">
          Have an Account?{" "}
          <Link
            to="?mode=login"
            className="text-green-500 font-medium hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
