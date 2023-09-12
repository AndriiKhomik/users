import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaGear } from "react-icons/fa6";
import { AiOutlineCheck, AiOutlineSearch } from "react-icons/ai";
import { useAppSelector } from "../hooks/redux";
import { MenuItem } from "../types";
import { useActions } from "../hooks/actions";
import { useState } from "react";

const UsersDropdownMenu = () => {
  const { settings } = useAppSelector((state) => state.settings);
  const { toggleColumn } = useActions();

  const [search, setSearch] = useState("");

  const handleCheched = (e: Event, menuItem: MenuItem) => {
    toggleColumn(menuItem);
  };

  return (
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
          <DropdownMenu.Item className="px-4 mt-3 relative focus:outline-none">
            <span className="absolute inset-y-0 left-4 flex items-center pl-2">
              <AiOutlineSearch className="text-gray-500" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-lg bg-gray-100 w-full focus:outline-none p-1 text-[13px] pl-7"
              onClick={(e) => e.stopPropagation()}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </DropdownMenu.Item>
          {settings.columns.map((column: MenuItem) => (
            <DropdownMenu.CheckboxItem
              key={column.key}
              checked
              onSelect={(e) => handleCheched(e, column)}
              className="text-[13px] leading-none rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
            >
              <DropdownMenu.ItemIndicator className="w-full flex items-center justify-between">
                <span>{column.value}</span>
                {column.isShow && <AiOutlineCheck className="text-blue-500" />}
              </DropdownMenu.ItemIndicator>
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UsersDropdownMenu;
