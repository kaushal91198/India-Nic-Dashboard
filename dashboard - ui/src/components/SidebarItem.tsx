import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";

type Props = {
  showFullBar: boolean;
  menubar: any;
};

const SidebarItem = ({ menubar }: Props) => {
  return (
    <>
      {menubar.map((i: any, index: number) => (
        <div key={index} className="w-full">
          {i.label ? (
            <span className="text-start  py-40 w-full px-90 text-sm font-semibold text-text-baseline-400">
              {i.label}
            </span>
          ) : (
            <></>
          )}

          {i.data.map((j: any, index: number) => {
            const [showItem, setShowItem] = useState(false);
            return (
              <div className="flex w-full flex-col" key={index}>
                <div
                  role="button"
                  onClick={() => setShowItem((prev) => !prev)}
                  className=" flex  w-full  flex-col  "
                >
                  <div className="flex items-center rounded-lg py-60 hover:bg-baseline-200 px-90 justify-between">
                    <div className="flex items-center gap-50">
                      <RiDashboardFill className="text-xl text-text-baseline-400" />
                      <span className="text-text-baseline-200 text-sm font-medium  ">
                        {j.label}
                      </span>
                    </div>
                    <IoChevronDownOutline />
                  </div>
                </div>

                {showItem &&
                  j.children?.map((k: any, index: number) => (
                    <div
                      key={index}
                      className=" flex  w-full  flex-col gap-100 "
                    >
                      <div className="flex items-center rounded-lg py-60 hover:bg-baseline-200    px-90 justify-between">
                        <div className="flex items-center gap-50">
                          <span className="h-[20px] text-sm   m-auto items-center justify-center text-center rounded-full bg-slate-200 w-[20px]">
                            L
                          </span>
                          <span className="text-sm text-text-baseline-400 font-medium ">
                            {k.label}
                          </span>
                        </div>
                        {/* <IoChevronDownOutline /> */}
                      </div>
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      ))}
      <hr />
    </>
  );
};

export default SidebarItem;
