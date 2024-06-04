import { Link, useLocation } from "react-router-dom";
// import { categoryItems } from "../constants";
import { useGetCategories, useGetProperties } from "@/lib/react-query/queries";
import { ICategory } from "@/types";
import { useEffect } from "react";


const Filter = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("filter");
  console.log(search)
  const pathname = location.pathname;
  const {data: categoryItems} = useGetCategories();
  const { refetch: refetchProperties } = useGetProperties(search ? `?category=${search}` : '');

  useEffect(() => {
    refetchProperties()
  }, [search, refetchProperties])

  const createQueryString = (name: string, cat:ICategory) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat.name === search) {
      params.delete(name);
    } else {
      params.set(name, cat.name);
    }
    return params.toString();
  };

  return (
    <div className="flex justify-between gap-x-10 mt-5 w-full overflow-x-scroll no-scrollbar">
      {categoryItems?.map((item: ICategory) => (
        <Link
          key={item.id}
          to={pathname + "?" + createQueryString("filter", item)}
          className={`${
            search === item.name
              ? "border-b-2 border-[#F8395A] pb-2 flex-shrink-0"
              : "opacity-70 flex-shrink-0"
          } flex flex-col gap-y-3 items-center`}
        >
          <div className="relative w-6 h-6">
            <img
              src={item.picture_url}
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
};

export default Filter;
