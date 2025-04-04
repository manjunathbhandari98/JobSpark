import { Button, TagsInput, Textarea } from "@mantine/core";
import { fields } from "../../data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";
import { useForm } from "@mantine/form";
import { useEditor, Editor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";
import { useDispatch, useSelector } from "react-redux";
import { addJob} from "../../Slices/JobSlice";
import { notifications } from "@mantine/notifications";

const PostJob: React.FC = () => {
  const user = useSelector((state:any)=>state.user);
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

  const dispatch = useDispatch();

  const handleSave = () => {
    const jobData = {
      ...form.values,
      jobStatus: "ACTIVE", 
      postedBy:user.id
    };

    dispatch(addJob(jobData));

    notifications.show({
      title: "Job Posted",
      message: "Your job has been posted",
      color: "greenTheme.5",
    });
  };

  const handleDrafts = () =>{
    const jobData = {
      ...form.values,
      jobStatus: 'DRAFT'
    };
    dispatch(addJob(jobData));

    notifications.show({
  title: "Job Saved as Draft",
  message: "Your job has been saved as a draft",
  color: "yellow", // Yellow for drafts (you can change the theme color)
});

  }


  return (
    <div>
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

      {/* About Job */}
      <div className="px-2 py-4">
        <label
          htmlFor=""
          className="text-sm font-medium"
        >
          About Job
          <span className="text-red-600 text-sm">
            {" "}
            *{" "}
          </span>
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
        />
      </div>

      {/* Job Details */}
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
          onClick={handleSave}
        >
          Publish Job
        </Button>
        <Button
          variant="outline"
          color="greenTheme.5"
          size="md"
          onClick={handleDrafts}
        >
          Save as Draft
        </Button>
      </div>
    </div>
  );
};

export default PostJob;
