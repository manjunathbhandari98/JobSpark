import { Button, Loader, PasswordInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Lock } from "lucide-react";
import { useNavigate,useSearchParams } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../../Services/UserService";
import { signupValidation } from "../../Validations/FormValidation";
import { notifications } from "@mantine/notifications";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [visible, { toggle }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  // State for form data
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  // State for form errors
  const [formError, setFormError] = useState({
    password: "",
    confirmPassword: "",
  });

 const [searchParams] = useSearchParams();
    const email = searchParams.get("email"); 

  // Handle input changes with validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    let errorMessage = signupValidation(name, value);

   

    if (name === "password") {
      setFormError((prev) => ({
        ...prev,
        password: errorMessage,
        confirmPassword:
          data.confirmPassword && data.confirmPassword !== value
            ? "Passwords do not match!"
            : "",
      }));
    } else if (name === "confirmPassword") {
      setFormError((prev) => ({
        ...prev,
        confirmPassword:
          value !== data.password ? "Passwords do not match!" : "",
      }));
    } else {
      setFormError((prev) => ({
        ...prev,
        [name]: errorMessage,
      }));
    }
  };

  // Handle password reset with validation
  const handleResetPassword = async () => {
    const newErrors = {
      password: signupValidation("password", data.password),
      confirmPassword:
        data.password !== data.confirmPassword ? "Passwords do not match!" : "",
    };

    setFormError(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email,data.password);
      setLoading(false);

      notifications.show({
        title: "Password Reset Successful",
        message: "You can now log in with your new password.",
        color: "greenTheme.5",
      });

      setTimeout(() => {
        navigate("/auth?mode=login");
      }, 2500);
    } catch (error: any) {
      setLoading(false);
      notifications.show({
        title: "Reset Failed",
        message: error.errorMessage,
        color: "red.7",
      });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-5">
      <div className="text-xl font-medium">Reset Password</div>
      <div className="form flex flex-col gap-4">
        <PasswordInput
          leftSection={<Lock size={18} />}
          label="New Password"
          name="password"
          value={data.password}
          onChange={handleChange}
          visible={visible}
          onVisibilityChange={toggle}
          placeholder="Enter new password"
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
          placeholder="Confirm new password"
          withAsterisk
          error={formError.confirmPassword}
        />
        <Button
          color="greenTheme.5"
          className="!py-2 !text-black"
          onClick={handleResetPassword}
          disabled={loading}
        >
          {loading ? <Loader color="blue" type="dots" /> : "Reset Password"}
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;