import { 
  useGetCategories, 
} from "@/lib/react-query/queries";
import { ICategory } from "@/types";
import { Link, useLocation } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

const Filter = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("category");
  const pathname = location.pathname;
  const { data: categoryItems, isLoading } = useGetCategories();

  const createQueryString = (name: string, cat: ICategory) => {
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
      {isLoading
        ? Array.from({ length: 13 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-y-1 items-center flex-shrink-0"
            >
              <Skeleton className="w-7 h-7" />
              <Skeleton className="w-12 h-2" />
            </div>
          ))
        : categoryItems?.map((item: ICategory) => (
            <Link
              key={item.id}
              to={pathname + "?" + createQueryString("category", item)}
              className={`${
                search === item.name
                  ? "border-b-2 border-[#F8395A] pb-2 flex-shrink-0"
                  : "opacity-70 flex-shrink-0"
              } flex flex-col gap-y-3 items-center`}
            >
              <div className="relative w-6 h-6">
                {item.picture_url ? (
                  <img
                    src={item.picture_url}
                    alt="Category image"
                    className="w-6 h-6"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Skeleton className="w-6 h-6" />
                )}
              </div>
              <p className="text-xs font-medium">{item.title}</p>
            </Link>
          ))}
    </div>
  );
};

export default Filter;
