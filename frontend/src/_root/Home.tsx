import Filter from "@/components/Filter"
import Properties from "@/components/Properties";


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

  return (
    <>
      <Filter />
      <Properties searchParams={searchParams} />
    </>
  )
}

export default Home