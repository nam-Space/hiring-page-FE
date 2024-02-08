import { callGetUserByEmailAndTokenPassword, callUpdateUserPasswordForLogin } from "@/config/api";
import { IUser } from "@/types/backend";
import { Button, Divider, Form, Input, message, notification } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from 'styles/auth/auth.module.scss';

const ForgotPasswordPage = (props: any) => {
    const [isSubmit, setIsSubmit] = useState(false);

    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const [form] = Form.useForm();

    const [linkIsValid, setLinkIsValid] = useState(true)
    const [user, setUser] = useState<IUser>()

    const tokenPassword = params?.get('tokenPassword')
    const email = params?.get('email')

    useEffect(() => {
        const getUser = async () => {
            if (tokenPassword && email) {
                const user = await callGetUserByEmailAndTokenPassword({ tokenPassword, email })
                if (!user.data) {
                    setLinkIsValid(false)
                }
                else {
                    setUser(user.data)
                }
            }
            else {
                setLinkIsValid(false)
            }
        }
        getUser()
        return () => form.resetFields()
    }, [location]);

    const onFinish = async (values: any) => {
        const { new_password, renew_password } = values;
        setIsSubmit(true);
        const res = await callUpdateUserPasswordForLogin({ _id: user?._id, new_password, renew_password });
        setIsSubmit(false);
        if (res?.data) {
            message.success('Thay đổi mật khẩu thành công!');
            window.location.href = '/login';
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            })
        }
    };

    return (
        <div className={styles["login-page"]}>
            <main className={styles.main}>
                <div className={styles.container}>
                    {linkIsValid ? <section className={styles.wrapper}>
                        <div className={styles.heading}>
                            <h2 className={`${styles.text} ${styles["text-large"]}`}>Đặt lại mật khẩu</h2>
                            <Divider />

                        </div>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Mật khẩu mới"
                                name="new_password"
                                rules={[{ required: true, message: 'Mật khẩu mới không được để trống!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Nhập lại mật khẩu mới"
                                name="renew_password"
                                rules={[{ required: true, message: 'Mật khẩu nhập lại không được để trống!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                            >
                                <Button type="primary" htmlType="submit" loading={isSubmit}>
                                    Reset Password
                                </Button>
                            </Form.Item>
                        </Form>
                    </section> : <h2 className={`${styles.text} ${styles["text-large"]}`}>Link không hợp lệ! Xin vui lòng thử lại</h2>}

                </div>
            </main>
        </div>

    )
}

export default ForgotPasswordPage