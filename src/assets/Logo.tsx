import { useMantineColorScheme } from "@mantine/core";
import {
  Briefcase,
  Sparkles,
} from "lucide-react";
import {
  FC,
  forwardRef,
  Ref,
} from "react";

interface JobSparkLogoProps {
  size?:
    | "small"
    | "medium"
    | "large"
    | "extra-larger"
    | number;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  sparkleClassName?: string;
  textBase?: string;
  textAccent?: string;
}

const JobSparkLogo: FC<JobSparkLogoProps> =
  forwardRef(
    (
      {
        size = "medium",
        className = "",
        textClassName = "",
        iconClassName = "",
        sparkleClassName = "",
        textBase = "Job",
        textAccent = "Spark",
        ...rest
      },
      ref: Ref<HTMLDivElement>
    ) => {
      const { colorScheme } =
        useMantineColorScheme();
      const isDark = colorScheme === "dark";

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
          case "extra-larger":
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
              text: `text-[${size * 0.25}rem]`,
            }
          : getSizeClasses();

      // Dynamic colors based on theme
      const textColor = isDark
        ? "text-white"
        : "text-gray-900";
      const accentColor = "text-green-500";
      const iconColor = isDark
        ? "text-white"
        : "text-gray-800";
      const sparkleColor = "text-yellow-300";
      const iconBgFrom = isDark
        ? "from-green-600"
        : "from-green-400";
      const iconBgTo = isDark
        ? "to-green-400"
        : "to-green-200";

      return (
        <div
          ref={ref}
          className={`flex items-center space-x-3 ${className}`}
          {...rest}
        >
          {/* Logo Icon */}
          <div
            className={`relative flex items-center justify-center rounded-xl shadow-lg bg-gradient-to-r ${iconBgFrom} ${iconBgTo} ${sizeClasses.icon} ${iconClassName}`}
          >
            <Briefcase
              className={`${iconColor} ${sizeClasses.iconInner}`}
            />
            <Sparkles
              className={`absolute -top-1 -right-1 ${sparkleColor} w-3 h-3 ${sparkleClassName}`}
            />
          </div>

          {/* Logo Text */}
          <h1
            className={`font-extrabold tracking-wide ${textColor} ${sizeClasses.text} ${textClassName}`}
          >
            {textBase}
            <span className={`${accentColor}`}>
              {textAccent}
            </span>
          </h1>
        </div>
      );
    }
  );

JobSparkLogo.displayName = "JobSparkLogo";
export default JobSparkLogo;
