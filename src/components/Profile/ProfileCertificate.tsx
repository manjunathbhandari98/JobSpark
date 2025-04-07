import {
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import {
  IconPlus,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import Certification from "./Certification";
import CertificateInput from "./CertificateInput";
import { useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { notifications } from "@mantine/notifications";
import { updateProfile } from "../../Services/ProfileService";

interface Certificate {
  name: string;
  issuer: string;
  issueDate: Date | null;
  certificateId: string;
}

const ProfileCertificate = () => {
  const [editingIndex, setEditingIndex] =
    useState<number | null>(null);
  const [addCert, setAddCert] = useState(false);
  const profile = useSelector(
    (state: any) => state.profile.selectedProfile
  );
  const certificates: Certificate[] =
    profile?.certificates || [];
  const dispatch = useDispatch();

  const handleSave = async (
  updatedCertificate: Certificate,
  index: number | null
) => {
  const updatedCertificates = [...certificates];
  if (index !== null) {
    updatedCertificates[index] = updatedCertificate;
  } else {
    updatedCertificates.push(updatedCertificate);
  }

  const updatedProfile = {
    ...profile,
    certificates: updatedCertificates,
  };

  try {
    const response = await updateProfile(updatedProfile); 
    dispatch(changeProfile(response.data));               

    notifications.show({
      title: "Certificate updated",
      message: "Certificate has been updated",
      color: "green.8",
    });
  } catch (error) {
    console.error("Error updating certificate:", error);
    notifications.show({
      title: "Error",
      message: "Failed to update certificate",
      color: "red.8",
    });
  }

  setEditingIndex(null);
  setAddCert(false);
};



  const handleDelete = async (index: number) => {
    const updatedCertificates =
      certificates.filter((_, i) => i !== index);
      try {
        const response = await updateProfile({
          ...profile,
          certificates: updatedCertificates,
        });
        dispatch(
          changeProfile(response.data)
        );
        notifications.show({
          title: "Certificate Deleted",   
          message: "Certificate deleted successfully",
          color: "red.8",
        });
      } catch (error) {
        notifications.show({
          title: "Error",
          message: "Failed to delete certificate",
          color: "red.8",
        });
        
      }
    
  };

  return (
    <div className="pt-5 space-y-5">
      <div className="font-bold text-2xl flex justify-between">
        <h2 className="text-2xl font-semibold ">
          Certificates
        </h2>
        <Tooltip
          label="Add Certificate"
          withArrow
        >
          <ActionIcon
            variant="filled"
            size="lg"
            onClick={() => setAddCert(true)}
          >
            <IconPlus size={20} />
          </ActionIcon>
        </Tooltip>
      </div>

      {certificates.map((data, index) => (
        <div
          key={index}
          className="p-4 rounded-lg"
        >
          {editingIndex === index ? (
            <CertificateInput
              initialValues={data}
              onSave={(updatedCertificate: any) =>
                handleSave(
                  updatedCertificate,
                  index
                )
              }
              onCancel={() =>
                setEditingIndex(null)
              }
            />
          ) : (
            <div className="flex justify-between items-center">
              <Certification {...data} />
              <div className="flex gap-3 ml-4">
                <Tooltip
                  label="Edit"
                  withArrow
                >
                  <ActionIcon
                    variant="light"
                    size="lg"
                    color="blue"
                    onClick={() =>
                      setEditingIndex(index)
                    }
                  >
                    <IconPencil size={20} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip
                  label="Delete"
                  withArrow
                >
                  <ActionIcon
                    variant="light"
                    size="lg"
                    color="red"
                    onClick={() =>
                      handleDelete(index)
                    }
                  >
                    <IconTrash size={20} />
                  </ActionIcon>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      ))}

      {addCert && (
        <CertificateInput
          onSave={(newCertificate: any) =>
            handleSave(newCertificate, null)
          }
          onCancel={() => setAddCert(false)}
        />
      )}
    </div>
  ); 
};

export default ProfileCertificate;
