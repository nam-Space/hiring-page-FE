import SearchClient from '@/components/client/search.client';
import { Col, Divider, Row } from 'antd';
import styles from 'styles/client/client.module.scss';
import JobCard from '@/components/client/card/job.card';
import { useState } from 'react';
import { IJob } from '@/types/backend';
import { useLocation } from 'react-router-dom';

const ClientJobPage = (props: any) => {
    const location = useLocation()
    const [searchJob, setSearchJob] = useState(location.state?.searchJob ?? {});


    return (
        <div className={styles["container"]} style={{ marginTop: 20 }}>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <SearchClient searchJob={searchJob} setSearchJob={setSearchJob} />
                </Col>
                <Divider />

                <Col span={24}>
                    <JobCard
                        showPagination={true}
                        searchJob={searchJob}
                        setSearchJob={setSearchJob}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ClientJobPage;