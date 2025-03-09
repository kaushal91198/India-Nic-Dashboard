// Layout.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { profileAPI } from "../redux/slices/authslice";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(profileAPI());
  }, []);

  const profile = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-baseline-400">
      <div className="flex flex-col justify-center items-center h-screen bg-baseline-400">
        <div className="flex w-[600px] justify-between text-text-baseline-200 font-medium text-lg">
          <div className="font-semibold text-primary-200">First Name</div>
          <div>{profile.firstname}</div>
        </div>
        <div className="flex w-[600px] justify-between text-text-baseline-200 font-medium text-lg">
          <div className="font-semibold text-primary-200">Last Name</div>
          <div>{profile.lastname}</div>
        </div>
        <div className="flex w-[600px] justify-between text-text-baseline-200 font-medium text-lg">
          <div className="font-semibold text-primary-200">Address</div>
          <div>{profile.address}</div>
        </div>
        <div className="flex w-[600px] justify-between text-text-baseline-200 font-medium text-lg">
          <div className="font-semibold text-primary-200">Country Name</div>
          <div>{profile.country}</div>
        </div>
        <div className="flex w-[600px] justify-between text-text-baseline-200 font-medium text-lg">
          <div className="font-semibold text-primary-200">Gender</div>
          <div>{profile.gender}</div>
        </div>
        <div className="flex w-[600px] justify-between text-text-baseline-200 font-medium text-lg">
          <div className="font-semibold text-primary-200">Role</div>
          <div>{profile.role}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
