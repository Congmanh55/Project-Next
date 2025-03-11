'use client'

import { Layout } from "antd";

const { Content } = Layout

const AdminContent = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: "#ccc",
                borderRadius: "#ccc",
            }}
        >
            Content
        </Content>
    )
}

export default AdminContent