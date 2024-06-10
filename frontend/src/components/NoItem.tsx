import { FileQuestion } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface IappProps {
  title: string;
  description: string;
  isSearched?: boolean;
}

const NoItem = ({ description, title, isSearched }: IappProps) => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <FileQuestion className="h-10 w-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      { isSearched && (
        <Link to="/">
          <Button type="button" className="mt-6">Clear Searches</Button>
        </Link>
      )}
      
    </div>
  );
}

export default NoItem;
