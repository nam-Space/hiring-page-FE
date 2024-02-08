import { Button, Divider, Form, Input, message, notification } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { callFetchAccount, callFetchJobDashboard, callGenerateTokenPassword, callLogin, callRefreshToken } from 'config/api';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserLoginInfo } from '@/redux/slice/accountSlide';
import styles from 'styles/auth/auth.module.scss';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const ForgotPage = (props: any) => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);

    useEffect(() => {
        //đã login => redirect to '/'
        if (isAuthenticated) {
            navigate('/');
            // window.location.href = '/';
        }
    }, [isAuthenticated])

    const onFinish = async (values: any) => {
        const { email } = values;
        setIsSubmit(true);
        const res = await callGenerateTokenPassword({ email });
        setIsSubmit(false);
        if (res?.data) {
            message.success(`Gửi email thành công! Vui lòng bạn check email: ${email}`);
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
        <div className={styles["forgot-page"]}>
            <main className={styles.main}>
                <div className={styles.container}>
                    <section className={styles.wrapper}>
                        <div className={styles.heading}>
                            <h2 className={`${styles.text} ${styles["text-large"]}`}>Quên Mật Khẩu</h2>
                            <Divider />

                        </div>
                        <Form
                            name="basic"
                            // style={{ maxWidth: 600, margin: '0 auto' }}
                            onFinish={onFinish}
                            autoComplete="off"

                        >
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Email không được để trống!' }]}
                            >
                                <Input placeholder='Vui lòng điền email của bạn' />
                            </Form.Item>
                            <Form.Item
                            // wrapperCol={{ offset: 6, span: 16 }}
                            >
                                <Button type="primary" htmlType="submit" loading={isSubmit}>
                                    Gửi
                                </Button>
                            </Form.Item>
                            <Divider>Or</Divider>
                            <p className="text text-normal" > Đã có tài khoản ?
                                <span>
                                    <Link to='/login' > Đăng Nhập </Link>
                                </span>
                            </p>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default ForgotPage;