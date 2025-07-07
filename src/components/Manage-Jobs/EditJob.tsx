import { Button, TagsInput, Textarea, useMantineColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { useNavigate } from "react-router-dom";
import { fields } from "../../data/PostJob";
import { updateJob } from "../../Services/JobService";
import { editJob, setJob } from "../../Slices/JobSlice";
import TextEditor from "../Post-Job/TextEditor";
import SelectInput from "../Profile/SelectInput";

const EditJob: React.FC = () => {
    const navigate = useNavigate();
    const selectedJob = useSelector(
        (state: any) => state.job.selectedJob
    );


       const { colorScheme } = useMantineColorScheme(); 
        const isDark = colorScheme === "dark";

  const form = useForm({
    initialValues: {
      jobTitle: selectedJob?.jobTitle || "",
      location: selectedJob?.location || "",    
        jobType: selectedJob?.jobType || "",
        packageOffered: selectedJob?.packageOffered || "",
        experience: selectedJob?.experience || "",
        skillsRequired: selectedJob?.skillsRequired || [],
        description: selectedJob?.description || "",
        about: selectedJob?.about || "",
        jobStatus: selectedJob?.jobStatus || "",
        company: selectedJob?.company || "",
        applicants: selectedJob?.applicants || [],
        postTime: selectedJob?.postTime || "",

    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: form.values.description,
    onUpdate: ({ editor }) => {
      form.setFieldValue(
        "description",
        editor.getHTML()
      );
    },
  });

  const dispatch = useDispatch();

  const handleUpdate = async () => {
    if (!selectedJob?.id) {
      notifications.show({
        title: "Error",
        message: "Job ID is missing!",
        color: "red",
      });
      return;
    }

    const jobData = {
      id: selectedJob.id, 
      ...form.values,
    };

    try {
      const response = await updateJob(selectedJob.id,jobData);
      dispatch(editJob(response.data)); // Update Redux store with updated job
      dispatch(setJob(response.data));
  
      notifications.show({
        title: "Job Updated Successfully",
        message: "Your job has been updated.",
        color: "greenTheme.5",
      });
      navigate('/manage-jobs')
    } catch (error) {
      console.error("Failed to updated job:", error);
      notifications.show({
        title: "Error",
        message: "Failed to update job!",
        color: "red",
      });
    }
  };

  const activateJob = async () => {
    if (!selectedJob?.id) {
      notifications.show({
        title: "Error",
        message: "Job ID is missing!",
        color: "red",
      });
      return;
    }
  
    const jobData = {
      ...selectedJob,
      jobStatus: "ACTIVE",
    };
  
    try {
      const response = await updateJob(selectedJob.id,jobData);
      dispatch(editJob(response.data)); // Update Redux store with updated job
      dispatch(setJob(response.data));
  
      notifications.show({
        title: "Job Activated",
        message: "Your job is now active and visible.",
        color: "greenTheme.5",
      });
      navigate('/manage-jobs')
    } catch (error) {
      console.error("Failed to activate job:", error);
      notifications.show({
        title: "Error",
        message: "Failed to activate job!",
        color: "red",
      });
    }
  };
  


  return (
    <div
      className={`px-4 md:px-10 py-4 min-h-screen ${
        isDark
          ? "bg-[#040611] text-gray-200"
          : "bg-gray-200 text-black"
      }`}
    >
      <div className="text-2xl py-3 font-semibold text-center md:text-left">
        Post a Job
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        {fields.map((item, index) => (
          <div key={index}>
            <SelectInput
              {...item}
              form={form}
              name={item.name}
            />
          </div>
        ))}
      </div>

      {/* Skills Input */}
      <div className="mt-6">
        <TagsInput
          withAsterisk
          label="Skills"
          placeholder="Enter skills"
          clearable
          acceptValueOnBlur
          {...form.getInputProps(
            "skillsRequired"
          )}
          value={form.values.skillsRequired}
          onChange={(value: string[]) =>
            form.setFieldValue(
              "skillsRequired",
              value
            )
          }
        />
        <span className="text-xs">
          Press Enter to submit the skills
        </span>
      </div>

      {/* About TextArea */}
      <div className="mt-6">
        <Textarea
          withAsterisk
          label="About"
          placeholder="Enter about"
          autosize
          minRows={4}
          maxRows={6}
          value={form.values.about}
          onChange={(event) =>
            form.setFieldValue(
              "about",
              event.currentTarget.value
            )
          }
        />
      </div>

      {/* Job Description */}
      <div className="mt-6">
        <label className="text-sm font-medium block mb-1">
          Job Details
          <span className="text-red-600 text-sm">
            {" "}
            *
          </span>
        </label>
        <TextEditor editor={editor} />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
        <Button
          variant="light"
          color="greenTheme.4"
          size="md"
          onClick={handleUpdate}
          className="w-full sm:w-auto"
        >
          Update Job
        </Button>

        <Button
          variant="outline"
          color="greenTheme.5"
          size="md"
          onClick={() => navigate("/manage-jobs")}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>

        {selectedJob?.jobStatus === "DRAFT" && (
          <Button
            variant="filled"
            color="greenTheme.5"
            size="md"
            onClick={activateJob}
            className="w-full sm:w-auto"
          >
            Activate Job
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditJob;
