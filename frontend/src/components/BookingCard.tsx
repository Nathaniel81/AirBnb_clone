import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";


interface bookingCardProps {
    price: number;
    isReservationLoading: boolean | undefined;
    start: string;
    end: string;
    dayCount: number;
    serviceFee: number;
    totalPrice: number;
    handleSubmit: () => void;
}

export function BookingCard(
  { 
    price, 
    isReservationLoading, 
    handleSubmit, 
    start, 
    end, 
    serviceFee,
    totalPrice,
    dayCount 
  }: bookingCardProps) {
  return (
    <Card className='md:w-[380px] mt-6'>
      <CardHeader>
        <CardTitle>
            ${price} <span className="text-sm text-muted-foreground">per night</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="w-full mx-auto lg:px-0">
            <table className="table-fixed w-full rounded-md border p-4">
              <tbody>
                <tr className=''>
                  <td className="w-1/2 border p-2">
                    <p className="text-xs text-muted-foreground">CHECK-IN</p>
                    <p>{start}</p>
                  </td>
                  <td className="w-1/2 border p-2">
                    <p className="text-xs text-muted-foreground">CHECKOUT</p>
                    <p>{end}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='flex-col'>
        <div className="mt-4 flex justify-between items-center">
          <p>${price.toFixed(2)} x {dayCount} nights</p>
          <p>${(price * dayCount).toFixed(2)}  </p>
        </div>
          <div className="mt-4 flex justify-between items-center">
            <p>Easebnb service fee</p>
            <p>${serviceFee.toFixed(2)}</p>
          </div>
        </div>
        <Separator className="my-7" />
        <div className="flex justify-between items-center">
          <p className="font-medium text-lg">Total</p>
          <p className="font-medium text-lg">${totalPrice.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter>
        {isReservationLoading ? (
          <Button className="w-full mt-4" disabled>
              <Loader2 className="w-4 h-4 animate-spin mr-2" /> Please wait...
            </Button>
          ) : (
            <Button className="w-full mt-4" onClick={handleSubmit}>
              Make a Reservation!
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
