import { Divider } from 'antd';
import styles from 'styles/client/client.module.scss';
import SearchJobClient from '@/components/client/search/searchJob.client';
import JobCard from '@/components/client/card/job.card';
import CompanyCard from '@/components/client/card/company.card';
import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';

const HomePage = () => {
    const [searchJob, setSearchJob] = useState({
        skills: [],
        location: []
    });

    return (
        <div className={`${styles["container"]} ${styles["home-section"]}`}>
            <div className="search-content" style={{ marginTop: 20 }}>
                <SearchJobClient searchJob={searchJob} setSearchJob={setSearchJob} />
            </div>
            <Divider />
            <CompanyCard pageSizeRender={8} />
            <div style={{ margin: 50 }}></div>
            <Divider />
            <JobCard searchJob={searchJob} setSearchJob={setSearchJob} />
        </div>
    )
}

export default HomePage;