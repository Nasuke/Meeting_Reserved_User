import { Outlet, useLocation } from "react-router-dom";
import { Menu as AntdMenu, MenuProps } from 'antd';
import './menu.css';
import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { router } from "../..";

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

const handleMenuItemClick: MenuClickEventHandler = (info:any) => {
    let path = '';
    switch(info.key) {
        case '1':
            path = '/meeting_room_list';
            break;
        case '2':
            path = '/booking_history';
            break;              
    }
    router.navigate(path);
}


export function AdminMenu() {

    const location = useLocation();

    function getSelectedKeys() {
        if(location.pathname === '/meeting_room_list') {
            return ['1']
        } else if(location.pathname === '/booking_history') {
            return ['2']
        } else {
            return ['3']
        }
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
