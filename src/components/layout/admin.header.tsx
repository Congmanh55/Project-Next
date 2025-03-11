import { Header } from "antd/es/layout/layout"

const AdminHeader = () => {
    return (
        <div>
            <Header style={{ padding: 0, background: '#ccc' }}>
                {/* <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                /> */}
            </Header>
        </div>
    )
}

export default AdminHeader