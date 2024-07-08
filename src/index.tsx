import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, Link, Outlet } from 'react-router-dom';
import { Register } from './page/register/Register';
import { Login } from './page/login/Login';
import { UpdatePassword } from './page/update_password/UpdatePassword';
import { ErrorPage } from './page/error/ErrorPage';
import { Index } from './page/index';
import { UpdateInfo } from './page/update_info/UpdateInfo';
import { Menu } from './page/menu/Menu';
import { MeetingRoomList } from './page/meeting_room_list/MeetingRoomList';
import { BookingHistory } from './page/booking_history/BookingHistory';
import { AdminIndex } from './pageAdmin/index';
import { AdminMenu } from './pageAdmin/menu/Menu';
import { ChildProcess } from 'child_process';
import { UserManage } from './pageAdmin/user_manage/UserManage';
import { MeetingRoomManage } from './pageAdmin/MeetingRoomManage';
import { BookingManage } from './pageAdmin/BookingManage';
import { Statistics } from './pageAdmin/Statistics';

const routes = [
  {
    path: "/",
    element: <Index></Index>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'update_info',
        element: <UpdateInfo/>
      },
      {
        path: '/',
        element: <Menu/>,
        children: [
          {
            path: '/',
            element: <MeetingRoomList/>
          },
          {
            path: 'meeting_room_list',
            element: <MeetingRoomList/>
          },
          {
            path: 'booking_history',
            element: <BookingHistory/>
          }
        ]
      }
    ]
  },
  {
    path: "admin",
    element: <AdminIndex></AdminIndex>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'update_info',
        element: <UpdateInfo/>
      },
      {
        path: '',
        element: <AdminMenu/>,
        children:[
          {
            path: '',
            element: <MeetingRoomManage/>
          },
          {
              path: 'user_manage',
              element: <UserManage/>
          },
          {
              path: 'meeting_room_manage',
              element: <MeetingRoomManage/>
          },
          {
              path: 'booking_manage',
              element: <BookingManage/>
          },
          {
              path: 'statistics',
              element: <Statistics/>
          }  
        ]
      }
    ]
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "update_password",
    element: <UpdatePassword />,
  }
];
export const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<RouterProvider router={router}/>);
