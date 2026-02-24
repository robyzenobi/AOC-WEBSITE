import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, LogOut, FileText } from 'lucide-react';

const AdminLayout = () => {
    const { currentUser, logout } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    if (!currentUser) {
        // In a real app, you might want to redirect to a specific login page
        // For now, we'll assume there's a login route or show a login form here
        return <Navigate to="/login" replace />;
    }

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
        } catch (error) {
            console.error("Failed to log out", error);
        }
        setIsLoggingOut(false);
    };

    return (
        <div className="flex min-h-[calc(100vh-80px)] mt-[80px]">
            <aside className="w-[250px] bg-[#0F172A] text-white flex flex-col fixed h-[calc(100vh-80px)] left-0 top-[80px] z-50">
                <div className="p-6 border-b border-white/10">
                    <h3 className="text-white text-xl m-0 font-bold">AOC Admin</h3>
                </div>
                <nav className="flex-1 p-4 flex flex-col gap-2">
                    <a href="/admin/blog" className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 bg-white/10 text-white hover:bg-white/10 hover:text-white">
                        <FileText size={20} />
                        Blog Posts
                    </a>
                </nav>
                <div className="p-4 border-t border-white/10">
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 bg-transparent border-none text-red-500 cursor-pointer rounded-lg transition-all duration-300 hover:bg-red-500/10" disabled={isLoggingOut}>
                        <LogOut size={18} />
                        {isLoggingOut ? 'Logging out...' : 'Logout'}
                    </button>
                </div>
            </aside>
            <main className="flex-1 ml-[250px] p-8 bg-surface min-h-[calc(100vh-80px)]">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
