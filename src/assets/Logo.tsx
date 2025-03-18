import {
  Briefcase,
  Sparkles,
} from "lucide-react";
import React, {
  FC,
  forwardRef,
  Ref,
} from "react";

interface JobSparkLogoProps {
  size?: "small" | "medium" | "large" | 'extra-larger' | number;
  textColor?: string;
  accentColor?: string;
  iconColor?: string;
  sparkleColor?: string;
  iconBackgroundFrom?: string;
  iconBackgroundTo?: string;
  textBase?: string;
  textAccent?: string;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  sparkleClassName?: string;
}

const JobSparkLogo: FC<JobSparkLogoProps> =
  forwardRef(
    (
      {
        size = "medium",
        textColor = "white",
        accentColor = "green-500",
        iconColor = "white",
        sparkleColor = "yellow-300",
        iconBackgroundFrom = "green-600",
        iconBackgroundTo = "green-400",
        textBase = "Job",
        textAccent = "Spark",
        className = "",
        textClassName = "",
        iconClassName = "",
        sparkleClassName = "",
        ...rest
      },
      ref: Ref<HTMLDivElement>
    ) => {
      const getSizeClasses = () => {
        switch (size) {
          case "small":
            return {
              icon: "w-8 h-8",
              iconInner: "w-4 h-4",
              text: "text-xl",
            };
          case "large":
            return {
              icon: "w-12 h-12",
              iconInner: "w-7 h-7",
              text: "text-3xl",
            };
          case 'extra-larger':
            return {
              icon: "w-16 h-16",
              iconInner: "w-10 h-10",
              text: "text-5xl",
            };
          case "medium":
          default:
            return {
              icon: "w-10 h-10",
              iconInner: "w-6 h-6",
              text: "text-2xl",
            };
        }
      };

      const sizeClasses =
        typeof size === "number"
          ? {
              icon: `w-${size} h-${size}`,
              iconInner: `w-${Math.round(
                size * 0.6
              )} h-${Math.round(size * 0.6)}`,
              text: `text-${Math.round(
                size * 0.25
              )}xl`,
            }
          : getSizeClasses();

      return (
        <div
          ref={ref}
          className={`flex items-center space-x-3 ${className}`}
          {...rest}
        >
          {/* Logo Icon - Stylish Briefcase with Spark */}
          <div
            className={`relative flex items-center justify-center rounded-xl shadow-lg bg-gradient-to-r from-${iconBackgroundFrom} to-${iconBackgroundTo} ${sizeClasses.icon} ${iconClassName}`}
          >
            <Briefcase
              className={`text-${iconColor} ${sizeClasses.iconInner}`}
            />
            <Sparkles
              className={`absolute -top-1 -right-1 text-${sparkleColor} w-3 h-3 ${sparkleClassName}`}
            />
          </div>

          {/* Logo Text */}
          <h1
            className={`font-extrabold tracking-wide text-${textColor} ${sizeClasses.text} ${textClassName}`}
          >
            {textBase}
            <span
              className={`text-${accentColor}`}
            >
              {textAccent}
            </span>
          </h1>
        </div>
      );
    }
  );

JobSparkLogo.displayName = "JobSparkLogo";

export default JobSparkLogo;
