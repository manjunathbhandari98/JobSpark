import {
  Button,
  Divider,
  FileInput,
  LoadingOverlay,
  Notification,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Edit, Upload } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconCheck } from "@tabler/icons-react";
import Jobs from './../Find-Jobs/Jobs';

const JobApply = () => {
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] =
    useState(false);
    // const[sec,setSec] = useState(5)
    const navigate = useNavigate();

  const handlePreview = () => {
    setPreview(!preview);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = () => {
    setSubmit(true);
    let x = 5;
    setInterval(() =>{
      x--;
      if (x === 0){
        navigate('/jobs')
      }
    },1000)
   
  };

  return (
    <>
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
        <div className="flex gap-3 items-center">
          <div className="bg-gray-700 rounded-xl p-2">
            <img
              src="/Icons/Google.png"
              alt="logo"
              className="h-14"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-medium text-xl">
              Data Analyst
            </div>
            <div className="text-sm">
              Google • 1 month ago • 100
              Applicants
            </div>
          </div>
        </div>

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

          <div
            className={`${
              preview ? "flex flex-col" : "flex"
            } gap-3 [&>*]:w-1/2`}
          >
            <TextInput
              readOnly={preview}
              variant={
                preview ? "unstyled" : "default"
              }
              withAsterisk
              label="Full Name"
              placeholder="Enter Your Full Name"
            />
            <TextInput
              readOnly={preview}
              variant={
                preview ? "unstyled" : "default"
              }
              withAsterisk
              label="Email"
              placeholder="Enter Your Email"
            />
          </div>

          <div
            className={`${
              preview ? "flex flex-col" : "flex"
            } gap-3 [&>*]:w-1/2`}
          >
            <NumberInput
              readOnly={preview}
              variant={
                preview ? "unstyled" : "default"
              }
              withAsterisk
              label="Phone Number"
              placeholder="Enter Your Phone Number"
              hideControls
              clampBehavior="strict"
              min={0}
              max={9999999999}
            />
            <TextInput
              readOnly={preview}
              variant={
                preview ? "unstyled" : "default"
              }
              label="Personal Website"
              placeholder="Enter Your Personal Website Url"
            />
          </div>

          <FileInput
            readOnly={preview}
            variant={
              preview ? "unstyled" : "default"
            }
            withAsterisk
            label="Resume/CV"
            placeholder="Upload Your Resume/CV"
            leftSection={<Upload size={18} />}
            accept=".pdf, .doc, .docx"
          />

          <Textarea
            readOnly={preview}
            variant={
              preview ? "unstyled" : "default"
            }
            label="Cover Letter"
            placeholder="Type something about yourself"
            autosize
            minRows={3}
          />

          <Button
            variant={`${!preview && "outline"}`}
            size="md"
            color="greenTheme.4"
            onClick={
              preview
                ? handleSubmit
                : handlePreview
            }
          >
            {preview ? "Submit" : "Preview"}
          </Button>
        </div>
      </div>

      <Notification
        className={`!border-green-500 z-1001 border -translate-y-20 !fixed top-0 right-5 transition duration-1000 ease-in-out
        ${
          submit
            ? "translate-y-0"
            : "-translate-y-20"
        }
        `}
        icon={<IconCheck size={20} />}
        color="teal"
        title="Application Submited"
        mt="md"
        withCloseButton={false}
      >
        Redirecting to Jobs
      </Notification>

      {/* {showNotif && (
        <NotificationBar
          title="Success!"
          type="success"
          message="Your action was successful."
          onClose={() => {
            setShowNotif(false);
            navigate("/jobs");
          }} // Set state to false when notification disappears
        />
      )} */}
    </>
  );
};

export default JobApply;
