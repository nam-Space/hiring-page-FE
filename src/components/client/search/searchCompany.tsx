import { Button, Col, Form, Input, Row, Select } from 'antd';
import { EnvironmentOutlined, MonitorOutlined } from '@ant-design/icons';
import { LOCATION_LIST, SKILLS_LIST } from '@/config/utils';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SearchCompanyClient = (props: any) => {
    const { searchCompany, setSearchCompany } = props
    const optionsLocations = LOCATION_LIST;
    const [form] = Form.useForm();


    const onFinish = async (values: any) => {
        // console.log(values)
    }

    return (
        <ProForm
            form={form}
            onFinish={onFinish}
            submitter={
                {
                    render: () => <></>
                }
            }
        >
            <Row gutter={[20, 20]}>
                <Col span={24}><h2>Tìm kiếm Công Ty</h2></Col>
                <Col span={24} md={16}>
                    <ProForm.Item name="name">
                        <Input placeholder="Nhập tên Công Ty" onChange={(e) => setSearchCompany({
                            ...searchCompany,
                            name: e.target.value
                        })} />
                    </ProForm.Item >
                </Col>
                <Col span={12} md={4}>
                    <ProForm.Item name="location">
                        <Select
                            mode="multiple"
                            allowClear
                            showArrow={false}
                            style={{ width: '100%' }}
                            placeholder={
                                <>
                                    <EnvironmentOutlined /> Vị trí...
                                </>
                            }
                            optionLabelProp="label"
                            options={optionsLocations}
                            value={searchCompany.location}
                            onChange={(value) => setSearchCompany({
                                ...searchCompany,
                                location: value
                            })}
                        />
                    </ProForm.Item>
                </Col>
                <Col span={12} md={4}>
                    <Button type='primary' onClick={() => form.submit()}>Search</Button>
                </Col>
            </Row>
        </ProForm>
    )
}
export default SearchCompanyClient;