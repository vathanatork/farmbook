import  { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import DetailProfile from "./pages/DetailProfile";
import _404 from "./pages/_404";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import GuestLayout from "./components/layouts/GuestLayout";
import CaoUser from "./pages/CAO/CaoUser";
import AddCoa from "./pages/CAO/AddCoa";
import EditCao from "./pages/CAO/EditCao";
import PendingCAO from "./pages/CAO/PendingCAO";
import CaoDetail from "./pages/CAO/CaoDetail";
import AdminList from "./pages/Admin/AdminList";
import AdminDetail from "./pages/Admin/AdminDetail";
import AdminCreate from "./pages/Admin/AdminCreate";
import AdminEdit from "./pages/Admin/AdminEdit";
import SupplierList from "./pages/Supplier/SupplierList";

const router = createBrowserRouter ([
    {
        path: '/',
        element: <DefaultLayout/>,
        children:[
            {
                path: '/',
                element: <Dashboard/>
            },
            {
                path: '/profile',
                element: <DetailProfile/>
            },
            {
                path: '/cao',
                element: <CaoUser/>
            },
            {
                path: '/cao/pending',
                element: <PendingCAO/>
            },
            {
                path: '/cao/addCoa',
                element: <AddCoa/>
            },
            {
                path: '/cao/edit/:id',
                element: <EditCao/>
            },
            {
                path: '/cao/detail/:id',
                element: <CaoDetail/>
            },
            {
                path: '/admin',
                element: <AdminList/>
            },
            {
                path: '/admin/detail/:id',
                element: <AdminDetail/>
            },
            {
                path: '/admin/add',
                element: <AdminCreate/>
            },
            {
                path: '/admin/edit/:id',
                element: <AdminEdit/>
            },
            {
                path: '/supplier',
                element: <SupplierList/>
            }
        ]
    },
    {
        path:'/login',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
        ]
    },
    {
        path: '*',
        element: <_404/>
    }
])

export default router