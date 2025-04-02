import {
  Bookmark,
  Calendar,
  Dot,
  MapPin,
} from "lucide-react";
import { Button, Divider, Modal } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { DateInput, PickerControl, TimeInput } from "@mantine/dates";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

const TalentCard = (data: any) => {
  useEffect(() =>{
    console.log(data);
    
  },[])
  const [opened, { open, close }] =
    useDisclosure(false);
     const [value, setValue] =
       useState<Date | null>(null);
       const ref = useRef<HTMLInputElement>(null);
       const navigate = useNavigate();
  return (
    <div className="gap-4">
      <div className="bg-gray-900 rounded-xl gap-3 p-4 hover:shadow-[0_0_5px_1px_green] !shadow-green-500">
        {/* Profile, role, company */}
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="bg-gray-800 p-1 rounded-full h-16 flex items-center">
              <img
                src={`/${data.picture}.png`}
                alt={data.image}
                className="h-15 rounded-full"
              />
            </div>
            <div>
              <div className="text-xl font-semibold truncate max-w-[14ch] overflow-hidden whitespace-nowrap">
                {data.name || "unknown"}
              </div>
              <div className="text-sm flex">
                {data.jobTitle} <Dot />{" "}
                {data.company}
              </div>
            </div>
          </div>

          <div className="cursor-pointer">
            <Bookmark />
          </div>
        </div>

        {/* Skills */}
        {/* Skills Section */}
        <div className="flex gap-3 py-4 flex-wrap">
          {Array.isArray(data.skills) ? (
            data.skills.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className="text-sm shadow-2xl bg-gray-700 py-1 px-2 rounded-lg"
                >
                  {item}
                </div>
              )
            )
          ) : (
            <div className="text-sm text-gray-400">
              No skills listed
            </div>
          )}
        </div>

        {/* About */}
        <div className="text-sm line-clamp-3">
          {data.about}
        </div>

        <Divider
          size="xs"
          className="my-3"
        />

        {/* Salary & location */}
        {data.invite ? (
          <div className="flex gap-2 items-center">
            <Calendar size={18} />
            Interview : 12, August 2025 10:30 AM
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">
              Exc: {data.expectedCtc}
            </div>
            <div className="flex gap-2">
              <MapPin size={18} />
              <div className="text-sm">
                {data.location}
              </div>
            </div>
          </div>
        )}
        <Divider
          size="xs"
          className="my-2"
        />

        {/* Buttons */}
        <div className="px-4 my-3 flex gap-3 [&>*]:w-1/2 [&>*]:py-2 [&>*]:rounded-lg [&>*]:cursor-pointer [&>*]:font-bold [&>*]:text-green-500 [&>*]:text-center">
          {data.invite ? (
            <>
              {/* Buttons for invited talents */}
              <Button
                color="greenTheme.5"
                variant="outline"
                fullWidth
              >
                Accept
              </Button>
              <Button
                color="red.7"
                variant="outline"
                fullWidth
              >
                Reject
              </Button>
            </>
          ) : (
            // Buttons For Applicants
            <>
              <Button
                color="greenTheme.5"
                variant="outline"
                fullWidth
                onClick={() =>
                  navigate("/talent-profile")
                }
              >
                Profile
              </Button>
              {data.manage ? (
                <Button
                  color="greenTheme.5"
                  variant="light"
                  fullWidth
                  rightSection={
                    <Calendar size={18} />
                  }
                >
                  Schedule
                </Button>
              ) : (
                // Button for Find Talents
                <Button
                  color="greenTheme.5"
                  variant="light"
                  fullWidth
                  onClick={() =>
                    navigate("/message")
                  }
                >
                  Message
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title="Schedule Date"
      >
        <div>
          <DateInput
            minDate={new Date()}
            maxDate={dayjs(new Date())
              .add(1, "month")
              .toDate()}
            value={value}
            onChange={setValue}
            label="Schedule Date"
            placeholder="Enter Date"
          />
          <TimeInput
            label="Time"
            ref={ref}
            onClick={() =>
              ref.current?.showPicker()
            }
          />
          <Button
            color="greenTheme.5"
            variant="light"
            fullWidth
          >
            Schedule
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TalentCard;
