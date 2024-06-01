import React from "react";
import { Link } from "react-router-dom";
import { categoryItems } from "../constants";


const Filter = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const search = searchParams.get("filter");
  const pathname = window.location.pathname;

  const createQueryString = React.useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex justify-between gap-x-10 mt-5 w-full overflow-x-scroll no-scrollbar">
      {categoryItems.map((item) => (
        <Link
          key={item.id}
          to={pathname + "?" + createQueryString("filter", item.name)}
          className={`${
            search === item.name
              ? "border-b-2 border-black pb-2 flex-shrink-0"
              : "opacity-70 flex-shrink-0"
          } flex flex-col gap-y-3 items-center`}
        >
          <div className="relative w-6 h-6">
            <img
              src={item.imageUrl}
              alt="Category image"
              className="w-6 h-6"
              width={24}
              height={24}
            />
          </div>
          <p className="text-xs font-medium">{item.title}</p>
        </Link>
      ))}
    </div>
  );
}

export default Filter;
