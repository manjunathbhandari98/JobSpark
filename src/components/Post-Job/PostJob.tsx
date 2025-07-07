import {
  Button,
  Divider,
  TagsInput,
  Textarea,
  useMantineColorScheme,
} from "@mantine/core";
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
import { addJob } from "../../Slices/JobSlice";
import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";

const PostJob: React.FC = () => {
  const user = useSelector(
    (state: any) => state.user
  );
  const { colorScheme } = useMantineColorScheme(); 
  const isDark = colorScheme === "dark";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      jobTitle: "",
      location: "",
      jobType: "",
      packageOffered: "",
      experience: "",
      skillsRequired: [] as string[],
      description: "",
      about: "",
      JobStatus: "",
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

  const handleSave = () => {
    const jobData = {
      ...form.values,
      jobStatus: "ACTIVE",
      postedBy: user.id,
    };

    dispatch(addJob(jobData));

    notifications.show({
      title: "Job Posted",
      message: "Your job has been posted",
      color: "greenTheme.5",
    });
    navigate('/manage-jobs')
  };

  const handleDrafts = () => {
    const jobData = {
      ...form.values,
      jobStatus: "DRAFT",
      postedBy: user.id
    };

    dispatch(addJob(jobData));
    navigate('/manage-jobs')
    notifications.show({
      title: "Job Saved as Draft",
      message:
        "Your job has been saved as a draft",
      color: "yellow",
    });
  };

  return (
    <div
      className={`rounded-xl px-4 py-6 shadow-lg space-y-6 ${
        isDark
          ? "bg-[#040611] text-gray-200"
          : "bg-gray-200 text-black"
      }`}
    >
      <div className="text-2xl font-bold text-green-400">
        Post a New Job
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {fields.map((item, index) => (
          <SelectInput
            key={index}
            {...item}
            form={form}
            name={item.name}
            isDark={isDark}
          />
        ))}
      </div>

      <div>
        <TagsInput
          withAsterisk
          label="Skills Required"
          placeholder="Type a skill and press Enter"
          clearable
          acceptValueOnBlur
          className="mt-2"
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
        <p className="text-xs mt-1 text-gray-400">
          Press Enter to add skills
        </p>
      </div>

      <Divider
        variant="dashed"
        label="Job Description"
        labelPosition="center"
        className={`${
          isDark
            ? "border-gray-700"
            : "border-gray-400"
        }`}
      />

      <div>
        <label className="text-sm font-medium block mb-1">
          About the Job{" "}
          <span className="text-red-500">*</span>
        </label>
        <Textarea
          value={form.values.about}
          minRows={3}
          autosize
          onChange={(event) =>
            form.setFieldValue(
              "about",
              event.currentTarget.value
            )
          }
          className={`${
            isDark
              ? "bg-[#1a1b1e] text-white"
              : "bg-white text-black"
          }`}
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">
          Job Details{" "}
          <span className="text-red-500">*</span>
        </label>
        <TextEditor
          editor={editor}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          variant="light"
          color="greenTheme.4"
          size="md"
          fullWidth
          onClick={handleSave}
        >
          Publish Job
        </Button>
        <Button
          variant="outline"
          color="greenTheme.5"
          size="md"
          fullWidth
          onClick={handleDrafts}
        >
          Save as Draft
        </Button>
      </div>
    </div>
  );
};

export default PostJob;
