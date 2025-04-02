import { Button, TagsInput, Textarea } from "@mantine/core";
import { fields } from "../../data/PostJob";
import { useForm } from "@mantine/form";
import { useEditor, Editor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { addJob, editJob, setJob } from "../../Slices/JobSlice";
import { notifications } from "@mantine/notifications";
import SelectInput from "../Profile/SelectInput";
import TextEditor from "../Post-Job/TextEditor";
import { useNavigate } from "react-router-dom";

const EditJob: React.FC = () => {
    const navigate = useNavigate();
    const selectedJob = useSelector(
        (state: any) => state.job.selectedJob
    );

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

  const handleUpdate = () => {
    if (!selectedJob?.id) {
      notifications.show({
        title: "Error",
        message: "Job ID is missing!",
        color: "red",
      });
      return;
    }

    const jobData = {
      id: selectedJob.id, // ✅ Ensuring ID is included
      ...form.values,
    };

    dispatch(editJob(jobData)); 
    dispatch(setJob(jobData));
    notifications.show({
      title: "Job Updated Successfully",
      message: "Your job has been updated",
      color: "greenTheme.5",
    });

    navigate("/manage-jobs"); 
  };

  const activateJob = () => {
    if (!selectedJob?.id) {
      notifications.show({
        title: "Error",
        message: "Job ID is missing!",
        color: "red",
      });
      return;
    }

    const jobData = {
      ...selectedJob, // Keep existing job data
      jobStatus: "ACTIVE", // Set status to ACTIVE
    };

    dispatch(editJob(jobData));
    dispatch(setJob(jobData));

    notifications.show({
      title: "Job Activated",
      message:
        "Your job is now active and visible.",
      color: "greenTheme.5",
    });

  };


  return (
    <div className="px-10 py-3">
      <div className="text-2xl py-3 font-semibold">
        Post a Job
      </div>

      <div className="flex flex-wrap">
        {fields.map((item, index) => (
          <div
            key={index}
            className="w-1/2 px-2 space-y-7"
          >
            <SelectInput
              {...item}
              form={form}
              name={item.name}
            />
          </div>
        ))}
      </div>

      <div className="px-2">
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

      <div className="px-2">
        <Textarea
          withAsterisk
          label="About"
          placeholder="Enter about"
          autosize
          minRows={4} // Ensures it starts with 4 visible rows
          maxRows={6} // (Optional) Allows it to expand up to 6 rows before scrolling
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
      <div className="px-2 py-4">
        <label className="text-sm font-medium">
          Job Details
          <span className="text-red-600 text-sm">
            {" "}
            *{" "}
          </span>
        </label>
        <TextEditor editor={editor} />
      </div>

      <div className="flex gap-4 px-2 py-4">
        <Button
          variant="light"
          color="greenTheme.4"
          size="md"
          onClick={handleUpdate}
        >
          Update Job
        </Button>
        <Button
          variant="outline"
          color="greenTheme.5"
          size="md"
          onClick={() => {
            navigate("/manage-jobs");
          }}
        >
          Cancel
        </Button>
        {selectedJob?.jobStatus === "DRAFT" && (
          <Button
            variant="fillded"
            color="greenTheme.5"
            size="md"
            onClick={activateJob}
          >
            Activate Job
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditJob;
