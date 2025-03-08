import {
  Briefcase,
  Sparkles,
} from "lucide-react";

const JobSparkLogo = () => {
  return (
    <div className="flex items-center space-x-3">
      {/* Logo Icon - Stylish Briefcase with Spark */}
      <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-r from-green-600 to-green-400 rounded-xl shadow-lg">
        <Briefcase className="w-6 h-6 text-white" />
        <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1" />
      </div>

      {/* Logo Text */}
      <h1 className="text-2xl font-extrabold tracking-wide text-white">
        Job
        <span className="text-green-500">
          Spark
        </span>
      </h1>
    </div>
  );
};

export default JobSparkLogo;
