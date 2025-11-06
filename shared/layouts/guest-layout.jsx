import SharedLayout from "@/shared/layouts/shared-layout";

const GuestLayout = ({ children }) => {
  return (
    <SharedLayout>
      <div className="overflow-y-scroll h-screen md:h-screen  bg-black_300 text-white ptt-10  md:pttt-[90px]">
        {children}
      </div>
    </SharedLayout>
  );
};

export default GuestLayout;
