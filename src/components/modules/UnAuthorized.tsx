import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { Link } from "react-router";

const UnAuthorized = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-800">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">Unauthorized</h1>
        <p className="mt-2 text-gray-100">
          Oops! You don’t have permission to access this page.
        </p>

        <Link to="/" className="flex justify-center underline mt-3">
          {" "}
          <Button className="bg-black">
            {" "}
            <HomeIcon /> Go To Home{" "}
          </Button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default UnAuthorized;
