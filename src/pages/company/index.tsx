import { Col, Row } from 'antd';
import styles from 'styles/client/client.module.scss';
import CompanyCard from '@/components/client/card/company.card';
import SearchCompanyClient from '@/components/client/search/searchCompany';
import { useState } from 'react';

const ClientCompanyPage = (props: any) => {
    const [searchCompany, setSearchCompany] = useState({
        name: '',
        location: []
    })

    return (
        <div className={styles["container"]} style={{ marginTop: 20 }}>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <SearchCompanyClient searchCompany={searchCompany} setSearchCompany={setSearchCompany} />
                    <CompanyCard
                        pageSizeRender={12}
                        showPagination={true}
                        searchCompany={searchCompany}
                        setSearchCompany={setSearchCompany}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ClientCompanyPage;