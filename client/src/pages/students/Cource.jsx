import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheckIcon } from "lucide-react";
import React from "react";

const Cource = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 py-0">
      <div className="relative">
        <img
          src="https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"
          className="w-full object-cover rounded-t-lg h-36"
          alt="cource"
        />
        <CardContent className="px-5 py-4 space-y-3">
          <h1 className="hover:underline font-bold text-lg truncate">
            Next Js complete Cource with App write 2025
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex  items-center gap-3">
              <Avatar className="rounded-lg h-8 w-8">
                <AvatarImage
                  className="rounded-full"
                  src="https://github.com/shadcn.png"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-sm">Aakash ASG</h1>
            </div>
            <Badge
              variant="secondary"
              className="bg-blue-500 text-white dark:bg-blue-600"
            >
              <BadgeCheckIcon />
              Verified
            </Badge>
          </div>
          <div className="text-lg font-bold">
            <span>499₹</span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default Cource;
