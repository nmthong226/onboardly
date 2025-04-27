import Header from "@/components/header";
import Sidebar from "@/components/sidebar/sidebar";


const MainLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="flex w-full h-screen">
        <Sidebar />
        <main className="flex-1">
            <Header />
            {children}
        </main>
    </div>
);
export default MainLayout;