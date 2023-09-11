import { FC, useState } from "react";
import { FaMale, FaFemale } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { AiOutlineCheck } from "react-icons/ai";
import { MenuItem, ServerResponse } from "../types";
import { fullYearsCount } from "../utils/fullYearsCount";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";
import CaretLeftLine from "../icons/CaretLeftLine";
import CaretRightLine from "../icons/CaretRightLine";
import CaretLeft from "../icons/CaretLeft";
import CaretRight from "../icons/CaretRight";
import { useAppSelector } from "../hooks/redux";
import { useActions } from "../hooks/actions";
import { shouldRenderColumn } from "../utils/shouldRenderColumn";

interface UserTableProps {
  data: ServerResponse | undefined;
}

const UsersTable: FC<UserTableProps> = ({ data }) => {
  const { settings } = useAppSelector((state) => state.settings);
  const {
    setItemsPerPage,
    setPage,
    setLastPage,
    increasePage,
    descreasePage,
    setFirstPage,
    toggleColumn,
  } = useActions();

  const handleCheched = (e: Event, menuItem: MenuItem) => {
    toggleColumn(menuItem);
  };

  const handleSelectItemsPerPage = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(e.target.value);
  };

  const handlePage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);

    const maxPage = Math.ceil(data?.total! / settings.itemsPerPage);
    if (!isNaN(value)) {
      if (value >= maxPage) {
        setPage(maxPage);
      } else {
        setPage(value);
      }
    } else {
      setPage(1);
    }
  };

  const handleInceasePageCount = () => {
    const maxPage = Math.ceil(data?.total! / settings.itemsPerPage);
    if (settings.page < maxPage) {
      increasePage(1);
    }
  };

  const handleDeacreasePageCount = () => {
    if (settings.page <= 1) {
      return;
    }
    descreasePage(1);
  };

  const handleGoToFirstPage = () => {
    setFirstPage(1);
  };

  const handleGotoLastPage = () => {
    if (data?.total) {
      const maxPage = Math.ceil(data?.total / settings.itemsPerPage);
      setLastPage(maxPage);
    }
  };

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
              {settings.columns.map((column: MenuItem) => (
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
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <select
                onChange={handleSelectItemsPerPage}
                value={settings.itemsPerPage}
                name="items"
                id="items"
                className="bg-gray-100 border border-gray-200 rounded-md text-[13px] mr-2 py-1 px-3 focus:outline-none cursor-pointer"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span className="uppercase text-gray-500 text-[10px] font-semibold">
                Items per page
              </span>
            </div>
            <div className="flex items-center">
              <div className="uppercase text-gray-500 text-[10px] font-semibold pt-[1px] mr-4">
                {settings.skip + 1} -{data?.users.length + settings.skip} of{" "}
                {data?.total}
              </div>
              <div className="flex items-center">
                <button className="mr-3" onClick={handleGoToFirstPage}>
                  <CaretLeftLine />
                </button>
                <button className="mr-3" onClick={handleDeacreasePageCount}>
                  <CaretLeft />
                </button>
                <input
                  className="w-[64px] border mr-3 rounded-md bg-gray-100 text-[13px] text-center py-1"
                  value={settings.page}
                  onChange={handlePage}
                />
                <button className="mr-3" onClick={handleInceasePageCount}>
                  <CaretRight />
                </button>
                <button className="mr-3" onClick={handleGotoLastPage}>
                  <CaretRightLine />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersTable;
