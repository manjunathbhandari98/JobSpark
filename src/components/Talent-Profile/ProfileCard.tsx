import { Button, Divider } from "@mantine/core";
import Experience from "./Experience";
import {
  Briefcase,
  Dot,
  MapPin,
} from "lucide-react";
import Certification from "./Certification";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProfiles } from "../../Services/ProfileService";
import { getAllUsers } from "../../Services/UserService";
import useImage from "../../hooks/useImage";
import RecommendedTalents from "./RecommendedTalents";

const ProfileCard = () => {
  const { id } = useParams();
  const talentId = Number(id);

  const [profiles, setProfiles] = useState<any[]>(
    []
  );
  const [users, setUsers] = useState<any[]>([]);
  const [selectedProfile, setSelectedProfile] =
    useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [
    recommendedTalents,
    setRecommendedTalents,
  ] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfilesUsers = async () => {
      try {
        const response = await getAllProfiles();
        const usersData = await getAllUsers();
        setProfiles(response.data);
        setUsers(usersData);

        const currentUser = usersData.find(
          (u: any) => u.id === talentId
        );
        setUser(currentUser);

        const profile = response.data.find(
          (p: any) => p.id === talentId
        );
        setSelectedProfile(profile || null);
      } catch (error) {
        console.error(
          "Error fetching profiles/users:",
          error
        );
      }
    };

    fetchProfilesUsers();
  }, [talentId]);

  useEffect(() => {
    if (
      !selectedProfile ||
      profiles.length === 0 ||
      users.length === 0
    )
      return;

    const selectedSkills = new Set(
      selectedProfile.skills?.map(
        (skill: string) => skill.toLowerCase()
      )
    );

    const recommendations = profiles
      .filter((profile: any) => {
        if (profile.id === selectedProfile.id)
          return false;

        const hasMatchingSkill =
          profile.skills?.some((skill: string) =>
            selectedSkills.has(
              skill.toLowerCase()
            )
          );

        return hasMatchingSkill;
      })
      .map((profile: any) => {
        const matchedUser = users.find(
          (u: any) => u.id === profile.id
        );
        return {
          ...profile,
          name: matchedUser?.name || "Unknown",
        };
      });

    setRecommendedTalents(recommendations);
  }, [selectedProfile, profiles, users]);

  const imageSource = useImage(
    selectedProfile?.picture
  );

  if (!selectedProfile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="flex gap-5">
      <div className="my-4 w-2/3">
        {/* Profile Section */}
        <div className="mb-16">
          {/* Banner */}
          <div className="relative mb-28">
            <img
              src="/Profile/banner.jpg"
              alt="banner"
              className="rounded-t-3xl"
            />
            <div className="top-16 left-5 absolute p-2 dark:bg-[#040611] light:bg-white rounded-full">
              <img
                src={imageSource}
                alt="profile_pic"
                className="h-45 w-45 rounded-full"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex justify-between items-center">
            <div className="[&>*]:flex [&>*]:gap-2 space-y-2">
              <div className="font-bold text-3xl">
                {user?.name}
              </div>
              <div className="text-xl flex items-center gap-2">
                <Briefcase />
                <div>
                  {selectedProfile.jobTitle}
                </div>
                <Dot />
                <div>
                  {selectedProfile.company}
                </div>
              </div>
              <div className="text-xl flex items-center gap-2">
                <MapPin />
                <div>
                  {selectedProfile.location}
                </div>
              </div>
              <div className="text-xl flex items-center gap-2">
                <Briefcase />
                <div>
                  Experience:{" "}
                  {
                    selectedProfile.totalExperience
                  }{" "}
                  years
                </div>
              </div>
            </div>
            <div>
              <Button
                color="green"
                variant="light"
                className="px-2 py-1"
              >
                Message
              </Button>
            </div>
          </div>

          <Divider
            size="xs"
            className="mt-10"
          />

          {/* About */}
          <div className="pt-5 space-y-5">
            <div className="font-bold text-2xl">
              About
            </div>
            <div>{selectedProfile.about}</div>
          </div>

          <Divider
            size="xs"
            className="mt-10"
          />

          {/* Skills */}
          <div className="pt-5 space-y-5">
            <div className="font-bold text-2xl">
              Skills
            </div>
            <div className="flex flex-wrap gap-3">
              {selectedProfile.skills?.map(
                (
                  skill: string,
                  index: number
                ) => (
                  <div
                    key={index}
                    className="bg-green-500/8 px-2 py-1 rounded-2xl"
                  >
                    {skill}
                  </div>
                )
              )}
            </div>
          </div>

          <Divider
            size="xs"
            className="mt-10"
          />

          {/* Experience */}
          <div className="pt-5 space-y-5">
            <div className="font-bold text-2xl">
              Experience
            </div>
            {selectedProfile.experiences?.map(
              (data: any, index: number) => (
                <div key={index}>
                  <Experience {...data} />
                </div>
              )
            )}
          </div>

          <Divider
            size="xs"
            className="mt-10"
          />

          {/* Certifications */}
          <div className="pt-5 space-y-5">
            <div className="font-bold text-2xl">
              Certificates
            </div>
            {selectedProfile.certificates?.map(
              (data: any, index: number) => (
                <div key={index}>
                  <Certification {...data} />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Recommended Talents Section */}
      <div className="w-1/3 pt-4">
        <RecommendedTalents
          talents={recommendedTalents}
        />
      </div>
    </div>
  );
};

export default ProfileCard;
