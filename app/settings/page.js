import useTracker from "../../lib/useTracker";
import Button from "../../components/Button";
import Link from "next/link";
import React from "react";

const page = () => {

  return (
    <div className="bg-main-bg h-[70vh] text-white">
      <div>
        <div className="pt-20 text-2xl pl-3 border-b">
          <Link href={"/settings/edit-profile"}>Edit your profile</Link>
        </div>
        <div className="mt-5 text-2xl pl-3 border-b">
          <Link href={"/settings/change-password"}>Change password</Link>
        </div>
        <div className="mt-5 text-2xl pl-3 border-b">
          <Link href={"/about-us"}>More about developers</Link>
        </div>

        <div className="mt-20 ml-36">
          <Button>
            <Link href={'/register'}>
              <span className="text-red-500">Sign Out</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
