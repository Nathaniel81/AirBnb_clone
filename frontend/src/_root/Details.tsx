import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreationBottomBar from "@/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { RootState } from "@/redux/store";
import { useToast } from "@/components/ui/use-toast";
import {
  setTitle,
  setDescription,
  setPrice,
  setGuests,
  setRooms,
  setBathrooms,
  setFile
} from "@/redux/state";
import axios from 'axios';
import { Loader2 } from "lucide-react";


const Counter = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
  const increase = () => onChange(value + 1);
  const decrease = () => onChange(value > 0 ? value - 1 : 0);

  return (
    <div className="flex items-center gap-x-4">
      <Button variant="outline" size="icon" type="button" onClick={decrease}>
        <Minus className="h-4 w-4 text-primary" />
      </Button>
      <p className="font-medium text-lg">{value}</p>
      <Button variant="outline" size="icon" type="button" onClick={increase}>
        <Plus className="h-4 w-4 text-primary" />
      </Button>
    </div>
  );
};

const Details = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.details);
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleClick = () => {
    fileInput.current?.click();
  };
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setUploading(true);
      const file = event.target.files[0];
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'property_image');
      
      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dqm9mc5da/image/upload', formData);
        const fileUrl = response.data.secure_url;
        dispatch(setFile(fileUrl));
      } catch (error) {
        console.error('Error uploading file:', error);
        toast({
          title: 'Error uploading file',
          variant: 'destructive',
        })
      }
    } else {
      dispatch(setFile(null));
    }
    setUploading(false);
  };

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

          <div className="flex flex-col items-center justify-center border rounded-xl cursor-pointer p-6 md:p-8 lg:p-10">
            <input
              type="file"
              ref={fileInput}
              hidden
              accept=".png,.jpeg,.jpg"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            {formState.fileUrl ? (
              <>
                <div className="flex flex-1 justify-center w-full p-5 lg:p-10 h-40" onClick={handleClick}> 
                  <img
                    src={formState.fileUrl}
                    alt="image"
                    className="rounded-lg object-contain h-[200px]"
                  />
                </div>
                <p className="mt-4 text-sm text-gray-400">Click photo to replace</p>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-40">
                <img
                  src="/image-upload.svg"
                  width={96}
                  height={77}
                  alt="file upload"
                  className=""
                />
                <h3 className="base-medium text-lg font-semibold">
                  Upload Your Image
                </h3>
                <p className="small-regular text-gray-400 my-1">SVG, PNG, JPG</p>
                <Button 
                  type="button" 
                  onClick={handleClick} 
                  disabled={uploading}
                  className="">
                  {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Select from your device
                </Button>
              </div>
            )}
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

        <CreationBottomBar />
      </div>
    </>
  );
};

export default Details;
