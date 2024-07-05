import { Badge, Button, Form, Image, Input, Table, TableColumnsType, message } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import './um.css';
import { freeze, userSearch } from "../../interface/interfaces";
import { useForm } from "antd/es/form/Form";

interface SearchUser {
    username: string;
    nickName: string;
    email: string;
}

interface UserSearchResult {
    username: string;
    nickName: string;
    email: string;
    headPic: string;
    createTime: Date;
    key: React.Key;
    id: number;
    isFrozen: boolean
}





// const data: UserSearchResult[] = [
//     {
//         key: '1',
//         username: 'xx',
//         headPic: 'xxx.png',
//         nickName: 'xxx',
//         email: 'xx@xx.com',
//         createTime: new Date()
//     },
//     {
//         key: '12',
//         username: 'yy',
//         headPic: 'yy.png',
//         nickName: 'yyy',
//         email: 'yy@yy.com',
//         createTime: new Date()
//     }
// ]

export function UserManage() {

    const [pageNo, setPageNo] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(3)
    const [total, setTotal] = useState<number>(0)
    const [userResult, setUserResult] = useState<UserSearchResult[]>()
    const [num, setNum] = useState(0)

    useEffect(() => {
        searchUser({
            username: form.getFieldValue('username'),
            nickName: form.getFieldValue('nickName'),
            email: form.getFieldValue('email')
        })
    }, [pageNo, pageSize, num])

    const changePage = useCallback(function(pageNo: number, pageSize: number) {
        setPageNo(pageNo);
        setPageSize(pageSize);
    }, []);

    const searchUser = useCallback(async (values: SearchUser) => {
        const result = await userSearch(values.username, values.nickName, values.email, pageNo, pageSize);
        
        const { data } = result.data

        if(result.status === 201 || result.status ===200) {
            setTotal(data.totalCount)
            setUserResult(data.users.map((item: UserSearchResult) => {
                return {
                    ...item,
                    key: item.username,
                }
            }))
        } else {
            message.error(data || '服务繁忙 稍后再试')
        }

    }, []);

    const freezeUser = useCallback(async (id: number) => {
        const res = await freeze(id);
    
        const { data } = res.data;
        if(res.status === 201 || res.status === 200) {
            message.success('冻结成功');
            // refresh the page
            setNum(Math.random())
        } else {
            message.error(data || '系统繁忙，请稍后再试');
        }
    }, []);

    const columns: TableColumnsType<UserSearchResult> = useMemo(() => [
        {
            title: '用户名',
            dataIndex: 'username'
        },
        {
            title: '头像',
            dataIndex: 'headPic',
            render: value => {
                return value ? <Image width={50} src={`http://localhost:3005/${value}`} /> : ''
            }
        },
        {
            title: '昵称',
            dataIndex: 'nickName'
        },
        {
            title: '邮箱',
            dataIndex: 'email'
        },
        {
            title: '注册时间',
            dataIndex: 'createTime'
        },
        {
            title: '状态',
            dataIndex: 'isFrozen',
            render: (_, record) => {
                return record.isFrozen ? <Badge status="success">已冻结</Badge>  : '正常'
            }
        },
        {
            title: '操作',
            dataIndex: 'operate',
            render: (_, record) => {
                return <a href="#" onClick={() => freezeUser(record.id)}>冻结</a>
            }
        },
    ], [])
    


    const [form] = useForm()

    return <div id="userManage-container">
        <div className="userManage-form">
            <Form
                onFinish={searchUser}
                name="search"
                layout='inline'
                colon={false}
                form={form}
            >
                <Form.Item label="用户名" name="username">
                    <Input />
                </Form.Item>

                <Form.Item label="昵称" name="nickName">
                    <Input />
                </Form.Item>

                <Form.Item label="邮箱" name="email" rules={[
                    { type: "email", message: '请输入合法邮箱地址!'}
                ]}>
                    <Input/>
                </Form.Item>

                <Form.Item label=" ">
                    <Button type="primary" htmlType="submit">
                        搜索用户
                    </Button>
                </Form.Item>
            </Form>
        </div>
        <div className="userManage-table">
            <Table columns={columns} dataSource={userResult} pagination={{
                current: pageNo,
                pageSize,
                onChange: changePage,
                total
            }}/>
        </div>
    </div>
}


