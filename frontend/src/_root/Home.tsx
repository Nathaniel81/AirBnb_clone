import Filter from "@/components/Filter"
import Properties from "@/components/Properties";
// import { setPropertyDetail } from "@/redux/state";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

const Home = ({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(setPropertyDetail({}));
  // }, [dispatch])

  return (
    <>
      <Filter />
      <Properties searchParams={searchParams} />
    </>
  )
}

export default Home