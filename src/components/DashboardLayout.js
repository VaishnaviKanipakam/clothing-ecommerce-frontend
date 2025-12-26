import DashboardHeader from "./DashboardHeader";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="flex-1">
        {children}
      </div>
    </div> 
  );
};

export default DashboardLayout;
