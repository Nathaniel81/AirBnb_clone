import { Button } from "@/components/ui/button";
import { useCreateListing } from "@/lib/react-query/queries";
import { resetLocation, resetCategory, resetDetails } from "@/redux/state";
import { AppDispatch, RootState } from "@/redux/store";
import { IPropertyPayLoad } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";

interface creationBarProps {
  step: number;
  photos?: File[];
}

const CreationBottomBar = ({ step, photos }: creationBarProps) => {
  const category = useSelector((state: RootState) => state.category);
  const details = useSelector((state: RootState) => state.details);
  const amenities = useSelector((state: RootState) => state.amenities);
  const location = useSelector((state: RootState) => state.location);
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
    const showToast = (title: string, description: string) => {
      toast({
        title,
        description,
        variant: 'destructive',
      });
    };
  
    switch (step) {
      case 1:
        if (category) {
          navigate('details');
        } else {
          showToast('Category required', 'Please select a category to proceed.');
        }
        break;
  
      case 2:
        if (details?.title && details?.price && details.description) {
          navigate('/create/amenities');
        } else {
          showToast('Incomplete details', 'Please fill in all the required fields.');
        }
        break;

      case 3:
        if (amenities) {
          navigate('/create/location')
        } else {
          showToast('Amenity required', 'Please fill in all the required fields.');
        }
        break;

      case 4:
        if (location) {
          navigate('/create/photos')
        } else {
          showToast('Country required', 'Please provide a country to proceed.');
        }
        break;
  
      case 5:
        if (photos) {
          console.log(amenities)
          const payload: IPropertyPayLoad = {
            category,
            details,
            amenities,
            location,
            photos,
          };
          createListing(payload);
        } else {
          showToast('Photos required', 'Please provide a country to proceed.');
        }
        break;
  
      default:
        showToast('Invalid step', 'Please follow the steps in order.');
        break;
    }
  };
  
 
  const handleCancel = () => {
    dispatch(resetLocation());
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
