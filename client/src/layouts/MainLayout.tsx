import Sidebar from "@/components/sidebar";


const MainLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="flex w-full h-screen">
        <Sidebar />
        <main className="flex-1">{children}</main>
    </div>
);
export default MainLayout;