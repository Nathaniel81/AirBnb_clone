import CreationBottomBar from "@/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
// import { categoryItems } from "@/constants";
import { useGetCategories } from "@/lib/react-query/queries";
import { resetAddress, resetCategory, resetDetails, setCategory } from "@/redux/state";
import { AppDispatch } from "@/redux/store";
import { ICategory } from "@/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


const Create = () => {
  const {data: categoryItems} = useGetCategories();
  const dispatch = useDispatch<AppDispatch>();

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
      undefined
    );

    useEffect(() => {
      dispatch(resetAddress());
      dispatch(resetCategory());
      dispatch(resetDetails());
      //eslint-disable-next-line
    }, []);

    const handleClick = (item: ICategory) => {
      setSelectedCategory(item.name);
      dispatch(setCategory(item.id));
    }
    
  return (
    <div className='mt-10'>
      <div className="md:w-3/5 w-full mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-3/5 mx-auto mb-36">
        <input
          type="hidden"
          name="categoryName"
          value={selectedCategory as string}
        />
        {categoryItems?.map((item: ICategory) => (
          <div key={item.id} className="cursor-pointer">
            <Card
              className={selectedCategory === item.name ? "border-primary" : ""}
              onClick={() => handleClick(item)}
            >
              <CardHeader>
                <img
                  src={item.picture_url}
                  alt={item.name}
                  height={32}
                  width={32}
                  className="w-8 h-8"
                />

                <h3 className="font-medium">{item.title}</h3>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
      <CreationBottomBar step={1} />
    </div>
  );
}

export default Create;
