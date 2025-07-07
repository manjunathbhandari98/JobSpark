import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { sendOTP, verifyOTP } from "../../Services/UserService";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const email = searchParams.get("email") || "";

  const [resendCount, setResendCount] = useState(0);
  const [resendTimer, setResendTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const enteredOTP = otp.join("");
    if (enteredOTP.length !== 6) {
      notifications.show({
        title: "Invalid OTP",
        message: "Please enter all six digits of the OTP.",
        color: "red.7",
      });
      return;
    }

    setLoading(true);
    try {
      await verifyOTP(email, enteredOTP);
      notifications.show({
        title: "OTP Verified",
        message: "Your OTP has been successfully verified.",
        color: "greenTheme.5",
      });
      navigate(`/auth?mode=reset-password&email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      notifications.show({
        title: "Verification Failed",
        message: error.errorMessage || "Invalid OTP. Please try again.",
        color: "red.7",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isResendDisabled && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [isResendDisabled, resendTimer]);

  const handleResendOTP = async () => {
    if (resendCount >= 3) return;
    try {
      await sendOTP(email);
      setResendCount((prev) => prev + 1);
      setResendTimer(60);
      setIsResendDisabled(true);
      notifications.show({
        title: "OTP Resent",
        message: "A new OTP has been sent to your email.",
        color: "greenTheme.5",
      });
    } catch (error: any) {
      notifications.show({
        title: "Resend Failed",
        message: error.errorMessage || "Unable to resend OTP. Try again later.",
        color: "red.7",
      });
    }
  };

  const handleChangeEmail = () => {
    navigate(-1);
  };

  return (
    <div className="flex m-auto">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Verify OTP</h2>
        <p className="mb-6">
          Enter the six-digit OTP sent to <b>{email}</b> to continue.
          <Button
            variant="subtle"
            className="w-full ml-4"
            onClick={handleChangeEmail}
            color="blue.6"
            styles={{
              root: {
                backgroundColor: "transparent",
                border: "none",
                padding: 0,
              },
            }}
          >
            Change Email
          </Button>
        </p>

        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength={1}
              className="w-12 h-12 text-2xl font-semibold text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          ))}
        </div>

        <Button
          className="py-3 rounded-lg text-lg font-semibold transition"
          onClick={handleVerifyOTP}
          disabled={loading}
          color="greenTheme.5"
          fullWidth
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>

        <Button
          variant="subtle"
          className="w-full mt-3 text-green-600 font-semibold hover:text-green-700 disabled:opacity-50 bg-transparent"
          onClick={handleResendOTP}
          disabled={isResendDisabled || resendCount >= 3}
          styles={{
            root: {
              backgroundColor: "transparent",
              border: "none",
              padding: 0,
              height: "auto",
            },
          }}
        >
          {resendCount >= 3
            ? "Max attempts reached"
            : `Resend OTP ${isResendDisabled ? `(${resendTimer}s)` : ""}`}
        </Button>
      </div>
    </div>
  );
};

export default VerifyOTP;
