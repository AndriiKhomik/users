import { FC } from "react";
import { FaMale, FaFemale } from "react-icons/fa";
import { fullYearsCount } from "../utils/fullYearsCount";
import * as Avatar from "@radix-ui/react-avatar";
import { useAppSelector } from "../hooks/redux";
import { shouldRenderColumn } from "../utils/shouldRenderColumn";
import UsersDropdownMenu from "./UsersDropdownMenu";
import Pagination from "./Pagination";
import { MenuItem, ServerResponse } from "../types";

interface UserTableProps {
  data: ServerResponse | undefined;
}

const UsersTable: FC<UserTableProps> = ({ data }) => {
  const { settings } = useAppSelector((state) => state.settings);

  const filteredData = data?.users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(settings.filter.toLowerCase()) ||
      user.lastName.toLowerCase().includes(settings.filter.toLowerCase())
  );

  return (
    <>
      <div className="p-4 font-sans flex flex-col h-screen relative">
        <UsersDropdownMenu />
        <div className="overflow-scroll border-gray-200 rounded-t-lg">
          <table className="w-full border">
            <thead className="z-10 border">
              <tr className="border">
                {settings.columns.map((column: MenuItem) => {
                  if (column.isShow) {
                    return (
                      <th
                        key={column.key}
                        className="px-6 py-3 text-left text-[10px] text-gray-500 uppercase bg-gray-100 border"
                      >
                        {column.value}
                      </th>
                    );
                  }
                  return null;
                })}
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {filteredData?.map((user) => {
                return (
                  <tr key={user.id} className="divide-x text-[13px]">
                    <th className="px-6 py-4 whitespace-nowrap bg-white">
                      <div className="flex items-center">
                        <div className="w-8 h-8 flex items-center justify-center object-cover rounded-full border mr-1 overflow-hidden">
                          <Avatar.Root>
                            <Avatar.Image src={user.image} alt={user.image} />
                            <Avatar.Fallback>
                              {user.firstName.slice(0, 1).toUpperCase()}
                            </Avatar.Fallback>
                          </Avatar.Root>
                        </div>
                        <div className="pt-[6px]">{`${user.firstName} ${user.lastName}`}</div>
                      </div>
                    </th>
                    {shouldRenderColumn(settings.columns, "birthDate") && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div>
                          {user.birthDate}
                          <span> ({fullYearsCount(user.birthDate)})</span>
                        </div>
                      </td>
                    )}
                    {shouldRenderColumn(settings.columns, "gender") && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center">
                          {user.gender === "male" ? <FaMale /> : <FaFemale />}
                          <span>{user.gender}</span>
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user.email}
                    </td>
                    {shouldRenderColumn(settings.columns, "phone") && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {user.phone}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user.username}
                    </td>
                    {shouldRenderColumn(settings.columns, "generalInfo") && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span>Bloodgroup: {user.bloodGroup} </span>
                        <span>Height: {user.height} </span>
                        <span>Weight: {user.weight} </span>
                        <span>Hair color: {user.hair.color} </span>
                      </td>
                    )}
                    {shouldRenderColumn(settings.columns, "domain") && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {user.domain}
                      </td>
                    )}
                    {shouldRenderColumn(settings.columns, "ip") && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {user.ip}
                      </td>
                    )}
                    {shouldRenderColumn(settings.columns, "macAddress") && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {user.macAddress}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="border border-gray-200 rounded-b-lg p-2">
          <Pagination data={data} />
        </div>
      </div>
    </>
  );
};

export default UsersTable;
