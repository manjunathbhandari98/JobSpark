import { Button, TagsInput } from "@mantine/core";
import { fields } from "../../data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";

const PostJob = () => {
  const data = fields;
  return (
    <div>
      {/* Title */}
      <div className="text-2xl py-3 font-semibold">
        Post a Job
      </div>
      {/* Form */}
      <div className="flex flex-wrap">
        {data.map((item, index) => (
          <div
            key={index}
            className="w-1/2 px-2 space-y-7"
          >
            {/* Each item takes half the width */}

            <SelectInput {...item} />
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
        />
        <span className="text-xs">
          Press Enter to submit the skills
        </span>
      </div>

      {/* About job */}
      <div className="px-2 py-4 [&_button[data-active='true']]:!bg-green-500/8 [&_button[data-active='true']]:!text-green-500">
        <label className="text-sm font-medium">
          About Job
          <span className="text-red-600 text-sm">
            {" "}
            *
          </span>
        </label>
        <TextEditor />
      </div>
      <div className="flex gap-4 px-2 py-4">
        <Button
          variant="light"
          color="greenTheme.4"
          size="md"
        >
          Publish Job
        </Button>
        <Button
          variant="outline"
          color="greenTheme.5"
          size="md"
        >
          Save as Draft
        </Button>
      </div>
    </div>
  );
};

export default PostJob;
