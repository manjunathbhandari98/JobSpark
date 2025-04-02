import {
  Button,
  Divider,
  FileInput,
  Loader,
  LoadingOverlay,
  Textarea,
  TextInput,
  NumberInput,
} from "@mantine/core";
import { Edit, Upload } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRelativeTime } from "../../Utils/dateUtils";
import {
  isNotEmpty,
  useForm,
} from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { jobApply } from "../../Services/JobService";

const JobApply = () => {
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);
  const selectedJob = useSelector(
    (state: any) => state.job.selectedJob
  );
  const navigate = useNavigate();
  const user = useSelector(
    (state: any) => state.user
  );

  // Check if the job is already saved by matching the job ID with saved jobs
  const isJobSaved = user.savedJobs?.includes(
    selectedJob?.id
  );

  const form = useForm({
    mode: "controlled",
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      website: "",
      resume: null,
      coverLetter: "",
    },
    validate: {
      name: isNotEmpty("Name Cannot be Empty"),
      email: isNotEmpty("Email Cannot be Empty"),
      phone: isNotEmpty("Phone cannot be Empty"),
      resume: isNotEmpty(
        "Resume Cannot be Empty"
      ),
    },
  });

  const handlePreview = () => {
    form.validate();
    if (!form.isValid()) return;
    setPreview(!preview);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getBase64 = (file: File) => {
    return new Promise<string>(
      (resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>
          resolve(
            reader.result
              ?.toString()
              .split(",")[1] || ""
          );
        reader.onerror = (error) => reject(error);
      }
    );
  };

  const handleSubmit = async () => {
    if (!selectedJob?.id) {
      notifications.show({
        title: "Error",
        message: "Job ID is missing",
        color: "red.6",
      });
      return;
    }

    setSubmit(true);
    try {
      let resumeBase64 = "";
      if (form.values.resume) {
        resumeBase64 = await getBase64(
          form.values.resume
        );
      }

      const formData = {
        ...form.values,
        applicantId: user.id,
        resume: resumeBase64,
      };
      await jobApply(selectedJob.id, formData);
      notifications.show({
        title: "Success",
        message: "Job Applied Successfully",
        color: "greenTheme.5",
      });
      navigate("/applications");
    } catch (error: any) {
      notifications.show({
        title: "Failed",
        message:
          error.response.data.errorMessage ||
          "Something went wrong",
        color: "red.6",
      });
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className="py-4 flex flex-col gap-5 w-2/3 mx-auto">
      <LoadingOverlay
        visible={submit}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{
          color: "green",
          type: "bars",
        }}
      />

      {/* Company Info */}
      {selectedJob && (
        <div className="flex gap-3 items-center">
          <div className="bg-gray-700 rounded-xl p-2">
            <img
              src={`/Icons/${String(
                selectedJob.company || "default"
              )}.png`}
              alt="logo"
              className="h-14"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-medium text-xl">
              {typeof selectedJob.jobTitle ===
              "string"
                ? selectedJob.jobTitle
                : "Job Title Unavailable"}
            </div>
            <div className="text-sm">
              {selectedJob.company ||
                "Company Name Unavailable"}{" "}
              •{" "}
              Posted{' '}{getRelativeTime(
                selectedJob.postTime
              )}{" "}
              •{" "}
              {Array.isArray(
                selectedJob.applicants
              )
                ? selectedJob.applicants.length
                : 0}{" "}
              Applicants
            </div>
          </div>
        </div>
      )}

      <Divider size="xs" />

      {/* Application Form */}
      <div className="py-4 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="font-semibold text-xl">
            Submit Your Application
          </div>
          {preview && (
            <button
              className="cursor-pointer"
              onClick={handlePreview}
            >
              <Edit />
            </button>
          )}
        </div>

        <TextInput
          withAsterisk
          label="Full Name"
          placeholder="Enter Your Full Name"
          readOnly={preview}
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Enter Your Email"
          readOnly={preview}
          {...form.getInputProps("email")}
        />
        <NumberInput
          withAsterisk
          label="Phone Number"
          placeholder="Enter Your Phone Number"
          hideControls
          min={0}
          max={9999999999}
          readOnly={preview}
          {...form.getInputProps("phone")}
        />
        <TextInput
          label="Personal Website"
          placeholder="Enter Your Personal Website Url"
          readOnly={preview}
          {...form.getInputProps("website")}
        />
        <FileInput
          withAsterisk
          label="Resume/CV"
          placeholder="Upload Your Resume/CV"
          leftSection={<Upload size={18} />}
          accept=".pdf, .doc, .docx"
          readOnly={preview}
          {...form.getInputProps("resume")}
        />
        <Textarea
          label="Cover Letter"
          placeholder="Type something about yourself"
          autosize
          minRows={3}
          readOnly={preview}
          {...form.getInputProps("coverLetter")}
        />

        <Button
          variant={
            !preview ? "outline" : "filled"
          }
          size="md"
          color="greenTheme.4"
          onClick={
            preview ? handleSubmit : handlePreview
          }
        >
          {preview ? (
            submit ? (
              <Loader
                color="blue"
                type="dots"
              />
            ) : (
              "Submit"
            )
          ) : (
            "Preview"
          )}
        </Button>
      </div>
    </div>
  );
};

export default JobApply;
