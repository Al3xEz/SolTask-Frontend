import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto pt-7 md:pt-12 p-5 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-5/12">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
