"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useSession } from "@/lib/auth-client";
import Logout from "@/components/Logout";
import Spinner from "../Spinner";

const UserCard = () => {

  const { data: session, isPending, error, refetch } = useSession();

  console.log(session.user)
  return (
    <Card>
      
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        {isPending && (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        )}

        {error && (
          <Alert>
            <AlertTitle>Session Error</AlertTitle>
            <AlertDescription>
              
              <button
                onClick={() => refetch()}
                className="underline hover:no-underline"
              >
                Retry
              </button>
            </AlertDescription>
          </Alert>
        )}

        {session && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">

                  <AvatarFallback>{session.user?.name!.charAt(0)}</AvatarFallback>

              </Avatar>
              <div>
                <p className="text-lg font-semibold">{session?.user?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </div>

            <Tabs defaultValue="details" className="w-full">
            </Tabs>

            <div className="pt-4">
              <Logout />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCard;
