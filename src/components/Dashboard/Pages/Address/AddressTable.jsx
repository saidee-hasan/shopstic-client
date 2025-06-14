import { useGetAddressQuery } from "../../../../store/dashboard/service/address/addressApi";
import { useGetUser } from "../../../../hooks/useGetUser";
import LoadingSpinner from "../../../Common/LoadingSpinner";
import UpdateAddress from "./UpdateAddress";
import DeleteAddress from "./DeleteAddress";

const AddressTable = () => {
  const { user } = useGetUser();

  const query = new URLSearchParams({
    userId: user?._id,
    email: user?.email,
  }).toString();

  const { data, isLoading } = useGetAddressQuery(query);

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-md">
      {!isLoading ? (
        <table className="min-w-full text-gray-800 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Phone", "Country", "State", "City", "Actions"].map((title) => (
                <th
                  key={title}
                  className="px-6 py-3 text-xs font-semibold tracking-wider text-left uppercase select-none"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.map((item) => (
              <tr
                key={item._id}
                className="transition-colors duration-200 cursor-default hover:bg-gray-100"
                tabIndex={0}
                aria-label={`Address for ${item.fullName}`}
              >
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                  {item.fullName}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{item.phoneNumber}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{item.country}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{item.state}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{item.city}</td>
                <td className="flex gap-3 px-6 py-4">
                  <UpdateAddress item={item} />
                  <DeleteAddress
                    userId={user?._id}
                    _id={item?._id}
                    email={user?.email}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center p-10">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default AddressTable;
