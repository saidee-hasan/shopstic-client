import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import Input from "../../../components/Common/Input";
import { inputData } from "../../../data/input";
import SelectInput from "../../../components/Common/SelectInput";
import { useGetUser } from "../../../hooks/useGetUser";
import toast from "react-hot-toast";
import { useUploadImageMutation } from "../../../store/main/service/imageUpload/imageUploadApi";

import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../store/main/service/user/auth_api_service";
import SubmitButton from "../../../components/Common/SubmitButton";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import { useDispatch } from "react-redux";
import { addUser } from "../../../store/main/features/user/userSlice";

const EditProfile = () => {
  const [photo, setPhoto] = useState();
  const { handleSubmit, register, setValue } = useForm();

  const { user } = useGetUser();
  const { data: userData, isLoading: userLoading } = useGetUserQuery(
    user?.email
  );

  const dispatch = useDispatch();

  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await uploadImage(formData).unwrap();
      setPhoto(response.data?.display_url);
    } catch (error) {
      toast.error("Something went wrong 😓", { id: error });
    }
  };

  const handleUpdatePersonalInfo = async (data) => {
    if (!photo) {
      toast.error("Photo is required", { id: "submit_error" });
      return;
    }

    try {
      const res = await updateUser({
        _id: userData?._id,
        data: { ...data, photo },
      });
      if (!res?.error) {
        toast.success("Updated successfully", { id: "update_seller" });
        dispatch(addUser({ ...data, photo, _id: user?._id }));
      } else {
        toast.error(res?.error?.data?.message, { id: "update_error" });
      }
    } catch (error) {
      toast.error("Something went wrong 😓", { id: error });
    }
  };

  useEffect(() => {
    for (const key in userData) {
      if (Object.prototype.hasOwnProperty.call(userData, key)) {
        if (key === "_id") {
          continue;
        } else {
          setValue(key, userData[key]);
        }
      }
    }
    setPhoto(userData?.photo);
  }, [setValue, userData]);

  return (
    <div>
      <div className="p-5 flex flex-col gap-5">
        <div>
          <span className="font-bold text-xl text-white">Edit profile</span>
        </div>
        <div className="shadow-md bg-widget rounded-md overflow-hidden">
          {!userLoading ? (
            <form
              onSubmit={handleSubmit(handleUpdatePersonalInfo)}
              className="p-5"
            >
              <div className="rounded-full">
                <label
                  htmlFor="photo"
                  className="mb-1 inline-block rounded-full h-32 w-32 relative z-0"
                >
                  <div
                    className="h-32 w-32 border-2 border-accent rounded-full relative flex flex-col items-center justify-center cursor-pointer"
                    title="Personal photo"
                  >
                    {photo ? (
                      <img
                        className="w-full h-full rounded-full object-fill"
                        src={photo}
                        alt="photo"
                      />
                    ) : (
                      <FaUserAlt className="absolute w-full h-full p-2 rounded-full text-[#047857]" />
                    )}
                    {isLoading && (
                      <div className="absolute h-full w-full bg-black opacity-100 rounded-full">
                        <ImSpinner9 className="h-full w-full animate-spin text-accent" />
                      </div>
                    )}

                    <div className="absolute h-full w-full rounded-full z-50">
                      <FaUserAlt className="h-full w-full text-[#047857] rounded-full opacity-0 hover:opacity-100 bg-black duration-300 p-2" />
                    </div>
                  </div>
                </label>

                <Input
                  onChange={handleImageUpload}
                  className="hidden"
                  id="photo"
                  type="file"
                  accept="image/*"
                  required={false}
                  label="Select your photo"
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-5 mt-5">
                {inputData?.personalData?.map(
                  ({
                    registerName,
                    label,
                    isRequired,
                    type,
                    data,
                    placeholder,
                  }) =>
                    !data ? (
                      <Input
                        {...register(registerName)}
                        key={registerName}
                        label={label}
                        required={isRequired}
                        type={type}
                        placeholder={placeholder}
                        className={"bg-[#1C2822] text-white rounded-sm"}
                        value={
                          registerName === "email" ? user?.email : undefined
                        }
                        disabled={registerName == "email"}
                      />
                    ) : (
                      <SelectInput
                        {...register(registerName)}
                        label={label}
                        required={isRequired}
                        key={registerName}
                        placeholder={placeholder}
                        className={"bg-[#1C2822] text-white rounded-sm"}
                      >
                        <option selected disabled value="">
                          Select
                        </option>
                        {data?.map((op) => (
                          <option className="capitalize" value={op} key={op}>
                            {op}
                          </option>
                        ))}
                      </SelectInput>
                    )
                )}
              </div>
              <div className="mt-5 flex flex-col justify-end items-end">
                <SubmitButton
                  isLoading={updateLoading || userLoading}
                  className="py-2 w-40"
                >
                  Save
                </SubmitButton>
              </div>
            </form>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
