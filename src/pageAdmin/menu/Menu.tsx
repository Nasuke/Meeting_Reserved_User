import { Outlet, useLocation } from "react-router-dom";
import { Menu as AntdMenu, MenuProps } from 'antd';
import './menu.css';
import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { router } from "../..";
import { log } from "console";

const items: MenuProps['items'] = [
    {
        key: '0',
        label: "会议室管理"
    },
    {
        key: '1',
        label: "预定管理"
    },
    {
        key: '2',
        label: "用户管理"
    },
    {
        key: '3',
        label: "统计"
    },
];

const handleMenuItemClick: MenuClickEventHandler = (info) => {
    let path = '';
    switch(info.key) {
        case '0':
            path = '/admin/meeting_room_manage';
            break;
        case '1':
            path = '/admin/booking_manage';
            break;    
        case '2':
            path = '/admin/user_manage';
            break;
        case '3':
            path = '/admin/statistics';
            break;                    
    }
    router.navigate(path);
}

interface PathMap {
    [key: string]: string[];
}

const pathMap: PathMap = {
    '/admin/meeting_room_manage': ['0'],
    '/admin/booking_manage': ['1'],
    '/admin/user_manage': ['2'],
    '/admin/statistics': ['3']
};




export function AdminMenu() {

    const location = useLocation();

    function getSelectedKeys():string[] {
      return pathMap[location.pathname] || ["1"] ;
    }

    return <div id="menu-container">
        <div className="menu-area">
            <AntdMenu
                defaultSelectedKeys={getSelectedKeys()}
                items={items}
                onClick={handleMenuItemClick}
            />
        </div>
        <div className="content-area">
            <Outlet></Outlet>
        </div>
    </div>
}
