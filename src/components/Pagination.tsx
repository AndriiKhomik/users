import React from "react";
import { useAppSelector } from "../hooks/redux";
import { useActions } from "../hooks/actions";
import CaretLeftLine from "../icons/CaretLeftLine";
import CaretLeft from "../icons/CaretLeft";
import CaretRight from "../icons/CaretRight";
import CaretRightLine from "../icons/CaretRightLine";
import { ServerResponse } from "../types";

const Pagination = ({ data }: { data?: ServerResponse }) => {
  const { settings } = useAppSelector((state) => state.settings);
  const {
    setItemsPerPage,
    setPage,
    setLastPage,
    increasePage,
    descreasePage,
    setFirstPage,
  } = useActions();

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

  const handleGoToFirstPage = () => {
    setFirstPage(1);
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

  const handleGotoLastPage = () => {
    if (data?.total) {
      const maxPage = Math.ceil(data?.total / settings.itemsPerPage);
      setLastPage(maxPage);
    }
  };

  return (
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
  );
};

export default Pagination;
