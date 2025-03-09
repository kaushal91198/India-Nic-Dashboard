"use client";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import { IoChevronDownOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { FaDoorClosed } from "react-icons/fa";
import { useAppDispatch } from "../redux/store/store";
import { logout } from "../redux/slices/authslice";
import { toast } from "react-toastify";
import { SidebarProps } from "../types/common/common";

type Props = {
  DashMenubar: SidebarProps[];
  Logo: string;
};

const Sidebar = ({ DashMenubar, Logo }: Props) => {
  const Menubar: Array<{ label?: string; data: SidebarProps[] }> = [];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sessionId = localStorage.getItem("sessionid");
  const logoutDash = () => {
    console.log("s", sessionId);
    if (sessionId) {
      dispatch(logout({ sessionId })).then((res) => {
        if (logout.fulfilled.match(res)) {
          toast.success("Logout Successfully");
          navigate("/");
        }
      });
    }
  };

  const [show, setShow] = useState(false);

  return (
    <div className="flex border bg-baseline-100 items-center py-100 w-[220px] m-60 px-60 rounded-xl  flex-col">
      <div>
        <img
          width={40}
          height={40}
          alt=""
          className="rounded-full w-[40px] h-[40px]"
          src={"/vite.svg"}
        />
      </div>
      <p className="text-text-baseline-400 font-semibold text-2xl">{Logo}</p>
      <hr className="hr-1 w-full my-100" />
      <>
        {DashMenubar.map((i, index) => (
          <div className="flex gap-30 w-full flex-col" key={index}>
            <div
              role="button"
              onClick={() => setShow((prev) => !prev)}
              className=" flex  w-full  flex-col  "
            >
              <div className="flex items-center rounded-lg py-60 bg-baseline-200 px-90 justify-between">
                <div className="flex items-center gap-50">
                  <img
                    width={40}
                    height={40}
                    alt=""
                    className="rounded-full w-[40px] h-[40px]"
                    src={
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                  />
                  <span className="text-text-baseline-400 font-medium text-sm ">
                    <Link to={i.path ? i.path : "#"}>{i.label}</Link>
                  </span>
                </div>
                <IoChevronDownOutline />
              </div>
            </div>
            {show &&
              i.children?.map((j, index) => (
                <div key={index} className=" flex  w-full  flex-col gap-100 ">
                  <div className="flex items-center rounded-lg py-60 hover:bg-baseline-300    px-90 justify-between">
                    <div className="flex items-center gap-50">
                      <span className="h-[20px] text-sm text-text-baseline-400 font-medium   m-auto items-center justify-center text-center rounded-full bg-slate-200 w-[20px]">
                        L
                      </span>
                      <span className="text-sm text-text-baseline-400 font-medium ">
                        <Link to={j.path ? j.path : "/"}>{j.label}</Link>
                      </span>
                    </div>
                    {/* <IoChevronDownOutline /> */}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </>
      <hr className="hr-1 w-full my-100" />
      <SidebarItem showFullBar menubar={Menubar} />
      <div className="flex flex-col gap-80">
        <button
          className="text-text-baseline-200 flex cursor-pointer  w-full px-30 items-center gap-70"
          onClick={() => logoutDash()}
        >
          <div>
            <FaDoorClosed />
          </div>
          <div>Logout</div>
        </button>
        <button
          className="text-text-baseline-200 flex cursor-pointer  w-full px-30 items-center gap-70"
          onClick={() => logoutDash()}
        >
          <div>
            <FaDoorClosed />
          </div>
          <div>Logout All Devices</div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
