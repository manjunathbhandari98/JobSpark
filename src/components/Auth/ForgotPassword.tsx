import { useState } from "react";
import {
  Button,
  Loader,
  TextInput,
} from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { loginValidation } from "../../Validations/FormValidation";
import { sendOTP } from "../../Services/UserService";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setEmail(value);
    setFormError(loginValidation("email", value)); // Validate dynamically
  };

  const handleSendOTP = async () => {
    const errorMessage = loginValidation(
      "email",
      email
    );
    setFormError(errorMessage);
    if (errorMessage) return;

    setLoading(true);
    try {
      await sendOTP(email);
      setLoading(false);
      notifications.show({
        title: "OTP Sent",
        message:
          "OTP has been sent to your email. Please check your inbox.",
        color: "greenTheme.5",
      });
       navigate(`/auth?mode=verify-otp&email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      setLoading(false);
      notifications.show({
        title: "Error",
        message:
          error.errorMessage ||
          "Failed to send OTP. Please try again.",
        color: "red.7",
      });
    }
  };


  return (
   <div className="flex items-center justify-center min-h-screen mx-auto px-4">
      <div className="w-full max-w-lg p-6 rounded-lg shadow-md flex flex-col gap-4">
      <div className="text-xl font-medium">
        Forgot Password?
      </div>
      <p className="text-gray-600">
        Please enter the email address associated
        with your account, and we’ll send you
        step-by-step instructions to reset your
        password.
      </p> <p className="text-gray-600">
        For your security, we do not
        store your password. This means we will
        never send your actual password via
        email—only a secure link to reset it.
      </p>
      <div className="form flex flex-col gap-4">
        <TextInput
          leftSection={<IconAt size={18} />}
          label="Email"
          placeholder="Your Email"
          variant="default"
          name="email"
          color="gray-8"
          withAsterisk
          value={email}
          onChange={handleChange}
          error={formError} // Dynamically show/hide error
        />
        <Button
          color="greenTheme.5"
          className="!py-2 !text-black"
          onClick={handleSendOTP}
          disabled={loading}
        >
          {loading ? (
            <Loader
              color="blue"
              type="dots"
            />
          ) : (
            "Send OTP"
          )}
        </Button>
        <div className="flex gap-3 justify-center">
          Remembered your password?{" "}
          <a
            href="/login"
            className="text-green-500"
          >
            Login
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ForgotPassword;
