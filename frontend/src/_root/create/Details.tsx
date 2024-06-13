import Counter from "@/components/Counter";
import CreationBottomBar from "@/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  setBathrooms,
  setDescription,
  setGuests,
  setPrice,
  setRooms,
  setTitle
} from "@/redux/state";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";


const Details = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.details);

  if (!formState) {
    return null;
  }

  return (
    <>
      <div className="w-3/5 mx-auto mt-10">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Please describe your home as good as you can!
        </h2>
      </div>

      <div>
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              type="text"
              required
              placeholder="Short and simple..."
              value={formState.title}
              onChange={(e) => dispatch(setTitle(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              required
              placeholder="Please describe your home..."
              value={formState.description}
              onChange={(e) => dispatch(setDescription(e.target.value))}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              name="price"
              type="number"
              required
              placeholder="Price per Night in USD"
              min={10}
              value={formState.price === 0 ? '' : formState.price}
              onChange={(e) => dispatch(setPrice(Number(e.target.value)))}
            />
          </div>
          <Card>
            <CardHeader className="flex flex-col gap-y-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Guests</h3>
                  <p className="text-muted-foreground text-sm">
                    How many guests do you want?
                  </p>
                </div>
                <Counter value={formState.guests} onChange={(value) => dispatch(setGuests(value))} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Rooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many rooms do you have?
                  </p>
                </div>
                <Counter value={formState.rooms} onChange={(value) => dispatch(setRooms(value))} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Bathrooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many bathrooms do you have?
                  </p>
                </div>
                <Counter value={formState.bathrooms} onChange={(value) => dispatch(setBathrooms(value))} />
              </div>
            </CardHeader>
          </Card>
        </div>

        <CreationBottomBar step={2} />
      </div>
    </>
  );
};

export default Details;
