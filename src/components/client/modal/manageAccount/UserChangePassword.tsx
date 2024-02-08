import { callRefreshToken, callUpdateUserPassword, callUpdateUserProfileHomepage, callUploadSingleFile } from "@/config/api";
import { useAppSelector } from "@/redux/hooks";
import { setUserLoginInfo } from "@/redux/slice/accountSlide";
import { CheckSquareOutlined } from "@ant-design/icons";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { Col, ConfigProvider, Form, Row, message, notification } from "antd"
import enUS from 'antd/lib/locale/en_US';
import { useEffect, useState } from "react";


const UserChangePassword = (props: any) => {
    const dataInit = useAppSelector(state => state.account.user);
    const [form] = Form.useForm();


    useEffect(() => {
        return () => form.resetFields()
    }, [dataInit]);

    const submitUser = async (valuesForm: any) => {
        const { password, new_password, renew_password } = valuesForm;
        if (dataInit?._id) {
            console.log(valuesForm)
            const res = await callUpdateUserPassword({
                _id: dataInit._id,
                password,
                new_password,
                renew_password
            });
            if (res.data) {
                message.success("Cập nhật mật khẩu thành công");
                handleReset();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        }
    }

    const handleReset = async () => {
        form.resetFields();
    }

    return (
        <ConfigProvider locale={enUS}>
            <ProForm
                form={form}
                style={{ maxWidth: '300px' }}
                onFinish={submitUser}
                submitter={
                    {
                        searchConfig: {
                            resetText: "Reset",
                            submitText: <>Xác nhận</>
                        },
                        onReset: () => handleReset(),
                        submitButtonProps: {
                            icon: <CheckSquareOutlined />
                        },
                    }
                }
            >
                <Row gutter={16}>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <ProFormText.Password
                            label="Mật khẩu cũ"
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập mật khẩu cũ"
                        />
                    </Col>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <ProFormText.Password
                            label="Mật khẩu mới"
                            name="new_password"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập mật khẩu mới"
                        />
                    </Col>
                    <Col lg={24} md={24} sm={24} xs={24}>
                        <ProFormText.Password
                            label="Nhập lại mật khẩu mới"
                            name="renew_password"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập lại mật khẩu mới"
                        />
                    </Col>
                </Row>
            </ProForm>
        </ConfigProvider>
    )
}

export default UserChangePassword