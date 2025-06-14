import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import Input from "../../../Common/Input";
import SelectInput from "../../../Common/SelectInput";
import { country } from "../../../../data/country";
import {
  useCreateAddressMutation,
  useUpdateAddressMutation,
} from "../../../../store/dashboard/service/address/addressApi";
import { useGetUser } from "../../../../hooks/useGetUser";
import SubmitButton from "../../../Common/SubmitButton";
import { useDispatch } from "react-redux";
import { useAddress } from "../../../../hooks/useAddress";
import { add_address } from "../../../../store/dashboard/features/address/addressSlice";

const AddressForm = ({ updateData, setIsModalOpen }) => {
  const [cities, setCities] = useState([]);

  const { handleSubmit, register, watch, setValue } = useForm();
  const name = watch("state");
  const { user } = useGetUser();
  const { selectedAddress } = useAddress();
  const dispatch = useDispatch();

  const [create, { isLoading: createLoading }] = useCreateAddressMutation();
  const [update, { isLoading: updateLoading }] = useUpdateAddressMutation();

  const handleAddress = async (data) => {
    const newData = {
      ...data,
      userId: user?._id,
      email:user?.email
    };

    if (selectedAddress?._id === updateData?._id) {
      dispatch(add_address({ _id: updateData?._id, ...newData }));
    }

    if (updateData?._id) {
      try {
        const res = await update({ _id: updateData?._id, data: newData });
        if (!res?.error) {
          toast.success("Updated address successfully", {
            id: "update_address",
          });

          setIsModalOpen(false);
        } else {
          toast.error("Something went wrong 😓", { id: "error" });
        }
      } catch (error) {
        toast.error("Something went wrong 😓", { id: error });
      }
    } else {
      try {
        const res = await create(newData);
        if (!res?.error) {
          toast.success("Created address successfully", {
            id: "update_address",
          });
          setIsModalOpen(false);
        } else {
          toast.error("Something went wrong 1 😓", { id: "error" });
        }
      } catch (error) {
        toast.error("Something went wrong 2 😓", { id: error });
      }
    }
  };

  useEffect(() => {
    if (name) {
      const selectedDivision = country.countryInfoData.find(
        (division) =>
          division.name === name[0].toUpperCase() + name.substring(1)
      );
      setCities([...selectedDivision.districts]);
    }
  }, [name]);

  useEffect(() => {
    for (const key in updateData) {
      if (Object.prototype.hasOwnProperty.call(updateData, key)) {
        if (key === "_id") {
          continue;
        } else {
          setValue(key, updateData[key]);
        }
      }
    }
  }, [setValue, updateData]);

  return (
    <div>
      <form onSubmit={handleSubmit(handleAddress)}>
        <div className="grid md:grid-cols-2 gap-5">
          <Input
            {...register("fullName")}
            placeholder="Full name"
            required
            className="bg-[#1C2822] text-white rounded-sm"
          />
          <Input
            {...register("phoneNumber")}
            placeholder="Phone number"
            required
            className="bg-[#1C2822] text-white rounded-sm"
          />
          <SelectInput
            required
            {...register("country")}
            defaultValue={"bangladesh"}
            className="bg-[#1C2822] text-white rounded-sm"
          >
            <option value="bangladesh" selected>
              Bangladesh
            </option>
          </SelectInput>
          <SelectInput
            {...register("state")}
            required
            className="bg-[#1C2822] text-white rounded-sm"
          >
            <option value="" selected disabled>
              Select state
            </option>
            {country?.countryInfoData?.map((state) => (
              <option
                value={state?.name?.toLowerCase()}
                key={state.name}
                selected={updateData?.state == state?.name?.toLowerCase()}
              >
                {state.name}
              </option>
            ))}
          </SelectInput>
          <SelectInput
            {...register("city")}
            required
            className="bg-[#1C2822] text-white rounded-sm"
          >
            <option value="">Select city</option>
            {cities?.map((city) => (
              <option
                value={city?.toLowerCase()}
                key={city}
                selected={updateData?.city === city?.toLowerCase()}
              >
                {city}
              </option>
            ))}
          </SelectInput>
          <Input
            {...register("zipcode")}
            placeholder="Zipcode"
            required
            className="bg-[#1C2822] text-white rounded-sm"
          />
          <Input
            {...register("addressLine1")}
            placeholder="Address line1"
            required
            className="bg-[#1C2822] text-white rounded-sm"
          />
          <Input
            {...register("addressLine2")}
            placeholder="Address line2"
            required
            className="bg-[#1C2822] text-white rounded-sm"
          />
        </div>
        <SubmitButton
          isLoading={createLoading || updateLoading}
          className="mt-5"
        >
          Add address
        </SubmitButton>
      </form>
    </div>
  );
};

AddressForm.propTypes = {
  updateData: PropTypes.object,
  setIsModalOpen: PropTypes.func,
};

export default AddressForm;
