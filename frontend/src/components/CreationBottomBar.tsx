import { Button } from "@/components/ui/button";
import { resetAddress, resetCategory, resetDetails } from "@/redux/state";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { initialState } from "@/redux/state";
import { useCreateListing } from "@/lib/react-query/queries";
import { IListingPayLoad } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "./ui/use-toast";


const CreationBottomBar = () => {
  const category = useSelector((state: RootState) => state.category);
  const details = useSelector((state: RootState) => state.details);
  const address = useSelector((state: RootState) => state.address);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const { 
    mutate: createListing, 
    isPending: pending, 
    isSuccess,
    isError
  } = useCreateListing();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Property created successfully'
      })
      navigate('/')
    }
    if (isError) {
        toast({
          title: 'Something went wrong',
          variant: 'destructive',
        })
    }
    //eslint-disable-next-line
  }, [isSuccess, isError]);

  const handleClick = () => {
    if(category && (JSON.stringify(details) !== JSON.stringify(initialState.details)) && address){
      const payload: IListingPayLoad = {
        category, 
        details,
        address
      }
      createListing(payload)

    } else if (category && (JSON.stringify(details) !== JSON.stringify(initialState.details))) {
      navigate('/create/address');
    } else if (category) {
      navigate('details');
  }}
 
  const handleCancel = () => {
    dispatch(resetAddress());
    dispatch(resetCategory());
    dispatch(resetDetails());
  }

  return (
    <div className="fixed w-full bottom-0 left-0 z-10 bg-white border-t h-24">
      <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
        <Button variant="secondary" size="lg" asChild>
          <Link 
            to="/"
            onClick={() => handleCancel()}
          >
            Cancel
          </Link>
        </Button>
        <>
         {pending ? (
           <Button disabled size="lg">
             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
             Please Wait
           </Button>
           ) : (
           <Button 
             size="lg"
             onClick={() => handleClick()}>
             Next
           </Button>
         )}
        </>
      </div>
    </div>
  );
}

export default CreationBottomBar;
