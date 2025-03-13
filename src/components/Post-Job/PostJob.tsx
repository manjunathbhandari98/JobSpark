import { TagsInput } from "@mantine/core";
import { fields } from "../../data/PostJob";
import SelectInput from "./SelectInput";

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
            {/* <label>
              {item.label}{" "}
              <span className="text-red-600">
                *
              </span>
            </label> */}
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
      <div></div>
    </div>
  );
};

export default PostJob;
