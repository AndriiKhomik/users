import { FC, useState } from "react";
import { FaMale, FaFemale } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { AiOutlineCheck } from "react-icons/ai";
import { MenuItem, ServerResponse } from "../types";
import { fullYearsCount } from "../utils/fullYearsCount";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";

interface UserTableProps {
  data: ServerResponse | undefined;
}

const columns = [
  { key: "fullName", value: "Full name", isShow: true, isCanHide: false },
  { key: "birthDate", value: "Birthday", isShow: true, isCanHide: true },
  { key: "gender", value: "Gender", isShow: true, isCanHide: true },
  { key: "email", value: "Email", isShow: true, isCanHide: false },
  { key: "phone", value: "Phone", isShow: true, isCanHide: true },
  { key: "username", value: "Username", isShow: true, isCanHide: false },
  { key: "generalInfo", value: "General Info", isShow: true, isCanHide: true },
  { key: "domain", value: "Domain", isShow: true, isCanHide: true },
  { key: "ip", value: "IP", isShow: true, isCanHide: true },
  { key: "macAddress", value: "Mac address", isShow: true, isCanHide: true },
];

const shouldRenderColumn = (columns: any, key: string) => {
  const displayColumns = columns.filter((column: any) => column.isShow);
  return displayColumns.some((column: any) => column.key === key);
};

const UsersTable: FC<UserTableProps> = ({ data }) => {
  const [selectedColumns, setSelectedColumns] = useState(columns);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleCheched = (e: Event, menuItem: MenuItem) => {
    if (menuItem.isCanHide) {
      const idx = selectedColumns.findIndex(
        (column) => column.key === menuItem.key
      );
      const beforeIndex = selectedColumns.slice(0, idx);
      const afterIndex = selectedColumns.slice(idx + 1);
      const selectedItem = {
        ...selectedColumns[idx],
        isShow: !selectedColumns[idx].isShow,
      };
      setSelectedColumns([...beforeIndex, selectedItem, ...afterIndex]);
    }
  };

  const handleSelectItemsPerPage = (e: any) => {
    setItemsPerPage(e.target.value);
  };
  console.log(data?.total, data?.users.length);

  return (
    <>
      <div className="p-4 font-sans flex flex-col h-screen relative">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="absolute z-20 top-[30px] right-[38px] rounded-full w-[14px] h-[14px] inline-flex items-center justify-center bg-white outline-none"
              aria-label="Customise options"
            >
              <FaGear />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="z-20 min-w-[228px] bg-white rounded-lg p-[5px] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade cursor-pointer"
              sideOffset={5}
            >
              {selectedColumns.map((column) => (
                <DropdownMenu.CheckboxItem
                  key={column.key}
                  checked
                  onSelect={(e) => handleCheched(e, column)}
                  className="text-[13px] leading-none rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                >
                  <DropdownMenu.ItemIndicator className="w-full flex items-center justify-between">
                    <span>{column.value}</span>
                    {column.isShow && (
                      <AiOutlineCheck className="text-blue-500" />
                    )}
                  </DropdownMenu.ItemIndicator>
                </DropdownMenu.CheckboxItem>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <div className="overflow-scroll border-gray-200 rounded-t-lg">
          <table className="w-full border">
            <thead className="z-10 border">
              <tr className="border">
                {columns.map((column) => {
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
              {data?.users.map((user) => {
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
                    {shouldRenderColumn(selectedColumns, "birthDate") && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div>
                          {user.birthDate}
                          <span> ({fullYearsCount(user.birthDate)})</span>
                        </div>
                      </td>
                    )}
                    {shouldRenderColumn(selectedColumns, "gender") && (
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
                    {shouldRenderColumn(selectedColumns, "phone") && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {user.phone}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user.username}
                    </td>
                    {shouldRenderColumn(selectedColumns, "generalInfo") && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span>Bloodgroup: {user.bloodGroup} </span>
                        <span>Height: {user.height} </span>
                        <span>Weight: {user.weight} </span>
                        <span>Hair color: {user.hair.color} </span>
                      </td>
                    )}
                    {shouldRenderColumn(selectedColumns, "domain") && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {user.domain}
                      </td>
                    )}
                    {shouldRenderColumn(selectedColumns, "ip") && (
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {user.ip}
                      </td>
                    )}
                    {shouldRenderColumn(selectedColumns, "macAddress") && (
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
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <select
                onChange={handleSelectItemsPerPage}
                value={itemsPerPage}
                name="items"
                id="items"
                className="bg-gray-100 border border-gray-200 rounded-md text-[13px] mr-2 py-1 px-3 focus:outline-none cursor-pointer"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span className="uppercase text-gray-500 text-[10px] font-semibold">
                Items per page
              </span>
            </div>
            <div>pages</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersTable;
