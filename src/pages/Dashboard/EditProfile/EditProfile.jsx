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
  const { data: userData, isLoading: userLoading } = useGetUserQuery(user?.email);

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
    if (userData) {
      for (const key in userData) {
        if (Object.prototype.hasOwnProperty.call(userData, key)) {
          if (key === "_id") continue;
          setValue(key, userData[key]);
        }
      }
      setPhoto(userData.photo);
    }
  }, [setValue, userData]);

  return (
    <div className="flex justify-center items-center p-6 min-h-screen bg-gray-50">
      <div className="p-8 w-full max-w-3xl bg-white rounded-xl shadow-xl">
        <h2 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900">
          Edit Profile
        </h2>

        {!userLoading ? (
          <form
            onSubmit={handleSubmit(handleUpdatePersonalInfo)}
            className="space-y-8"
          >
            {/* Profile Photo */}
            <div className="flex justify-center mb-6">
              <label
                htmlFor="photo"
                className="flex overflow-hidden relative justify-center items-center w-36 h-36 rounded-full border-4 border-green-600 shadow-lg transition-all duration-300 cursor-pointer hover:border-green-700"
                title="Personal photo"
              >
                {photo ? (
                  <img
                    src={photo}
                    alt="Profile"
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : (
                  <FaUserAlt className="w-20 h-20 text-green-600" />
                )}

                {isLoading && (
                  <div className="flex absolute inset-0 justify-center items-center bg-black bg-opacity-50 rounded-full">
                    <ImSpinner9 className="text-5xl text-green-400 animate-spin" />
                  </div>
                )}

                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Form Inputs */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                      key={registerName}
                      {...register(registerName)}
                      label={label}
                      required={isRequired}
                      type={type}
                      placeholder={placeholder}
                      className="placeholder-gray-400 text-gray-900 bg-white rounded-lg border border-gray-300 shadow-inner transition duration-300 focus:ring-3 focus:ring-green-400 focus:border-green-600"
                      value={registerName === "email" ? user?.email : undefined}
                      disabled={registerName === "email"}
                    />
                  ) : (
                    <SelectInput
                      key={registerName}
                      {...register(registerName)}
                      label={label}
                      required={isRequired}
                      placeholder={placeholder}
                      className="text-gray-900 bg-white rounded-lg border border-gray-300 shadow-inner transition duration-300 focus:ring-3 focus:ring-green-400 focus:border-green-600"
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {data?.map((op) => (
                        <option key={op} className="capitalize" value={op}>
                          {op}
                        </option>
                      ))}
                    </SelectInput>
                  )
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <SubmitButton
                isLoading={updateLoading || userLoading}
                className="px-10 py-3 font-semibold text-white bg-green-600 rounded-xl shadow-lg transition duration-300 hover:bg-green-700 active:bg-green-800 focus:ring-4 focus:ring-green-300"
              >
                Save
              </SubmitButton>
            </div>
          </form>
        ) : (
          <div className="flex justify-center py-24">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
