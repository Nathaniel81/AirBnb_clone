import React from 'react';
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

type CounterProps = {
  value: number;
  onChange: (value: number) => void;
};

const Counter: React.FC<CounterProps> = ({ value, onChange }) => {
    const increase = () => onChange(value + 1);
    const decrease = () => onChange(value > 1 ? value - 1 : 1);
  
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

  export default Counter;
