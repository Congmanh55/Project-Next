'use client'

import { sendRequest } from "@/utils/api"
import { useHasMounted } from "@/utils/customHook"
import { SmileOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Form, Input, Modal, notification, Steps } from "antd"
import { useEffect, useState } from "react"

const ModalReactive = (props: any) => {
    const hasMounted = useHasMounted()

    const { isModalOpen, setIsModalOpen, userEmail } = props

    const [current, setCurrent] = useState(0)
    const [userId, setUserId] = useState("");
    const [form] = Form.useForm()

    useEffect(() => {
        if (userEmail) {
            form.setFieldValue("email", userEmail)
        }
    }, [userEmail])

    if (!hasMounted) return <></>

    const onFinishStep0 = async (values: any) => {
        const { email } = values;
        const res = await sendRequest<IBackendRes<any>>({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-active`,
            body: {
                email
            }
        })

        if (res?.data) {
            setUserId(res?.data?._id)
            setCurrent(1)
        } else {
            notification.error({
                message: "Call APIs error",
                description: res.message
            })
        }
    }

    const onFinishStep1 = async (values: any) => {
        const { code } = values;
        const res = await sendRequest<IBackendRes<any>>({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`,
            body: {
                code, _id: userId
            }
        })

        if (res?.data) {
            setCurrent(2)
        } else {
            notification.error({
                message: "Call APIs error",
                description: res.message
            })
        }
    }

    return (
        <>
            <Modal
                title="Kich hoat Tai Khoan"
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                maskClosable={false}
                footer={null}
            >
                <Steps
                    current={current}
                    items={[
                        {
                            title: 'Login',
                            // status: 'finish',
                            icon: <UserOutlined />
                        },
                        {
                            title: 'Verification',
                            // status: 'finish',
                            icon: <SolutionOutlined />
                        },
                        {
                            title: 'Done',
                            status: 'wait',
                            icon: <SmileOutlined />
                        }
                    ]}
                />
                {current === 0 &&
                    <>
                        <div>
                            <p style={{ marginTop: "20px 0" }}>
                                Tai khoan cua ban chua duoc kich hoat
                            </p>
                        </div>
                        <Form
                            name="verify"
                            onFinish={onFinishStep0}
                            autoComplete="off"
                            layout="vertical"
                            form={form}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                            >
                                <Input disabled value={userEmail} />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                                    ReSend
                                </Button>
                            </Form.Item>

                        </Form>
                    </>

                }
                {current === 1 &&
                    <>
                        <div>
                            <p style={{ marginTop: "20px 0" }}>
                                Vui long nhap ma xac nhan
                            </p>
                        </div>
                        <Form
                            name="verify"
                            onFinish={onFinishStep1}
                            autoComplete="off"
                            layout="vertical"
                        >
                            <Form.Item
                                label="Code"
                                name="code"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your code"
                                    }
                                ]}
                            >
                                <Input disabled value={userEmail} />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Active
                                </Button>
                            </Form.Item>

                        </Form>
                    </>
                }
                {current === 2 &&
                    <div>
                        <p style={{ marginTop: "20px 0" }}>
                            Tai khoan cua ban da duoc kich hoat thanh cong. Vui long dang nhap lai
                        </p>
                    </div>
                }
            </Modal>
        </>
    )
}

export default ModalReactive