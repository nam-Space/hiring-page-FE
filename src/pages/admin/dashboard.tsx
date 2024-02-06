import { Card, Col, Row, Statistic } from "antd";
import { Container } from "react-bootstrap";
import CountUp from 'react-countup';
import ProjectsStats from '../../components/admin/dashboard/ProjectsStatsData';
import StatRightTopIcon from './../../components/admin/dashboard/StatRightTopIcon';
import TasksPerformance from "@/components/admin/dashboard/TasksPerformance";
import Teams from "@/components/admin/dashboard/Teams";
import { useEffect, useState } from "react";
import { callFetchJobDashboard, callFetchResumeDashboard } from "@/config/api";
import { IJob, IResume } from "@/types/backend";

const DashboardPage = () => {

    const [resumeQuantity, setResumeQuantity] = useState(0)
    const [memberAvgQuantity, setMemberAvgQuantity] = useState(0)
    const [salaryAvg, setSalaryAvg] = useState(0)

    const formatter = (value: number | string) => {
        return (
            <CountUp end={Number(value)} separator="," />
        );
    };

    useEffect(() => {
        const getAllData = async () => {
            const resumesData = await callFetchResumeDashboard()
            const jobsData = await callFetchJobDashboard()
            if (resumesData.data?.length) {
                setResumeQuantity(resumesData.data.length)
            }
            if (jobsData.data?.length) {
                let sumQuantity = 0
                let sumSalary = 0
                let cnt = 0
                jobsData.data.forEach(job => {
                    sumQuantity += job.quantity
                    sumSalary += job.salary
                    cnt++
                })
                setMemberAvgQuantity(Math.ceil(sumQuantity / cnt))
                setSalaryAvg(Math.ceil(sumSalary / cnt))
            }
        }

        getAllData()
    }, [])

    return (
        <Row gutter={[20, 20]}>
            <Col span={24} md={8}>
                <Card title="Tổng số CV đã nộp" bordered={false} >
                    <Statistic
                        title="Số lượng"
                        value={resumeQuantity}
                        formatter={formatter}
                    />

                </Card>
            </Col>
            <Col span={24} md={8}>
                <Card title="Tuyển thành viên" bordered={false} >
                    <Statistic
                        title="Số lượng trung bình"
                        value={memberAvgQuantity}
                        formatter={formatter}
                    />
                </Card>
            </Col>
            <Col span={24} md={8}>
                <Card title="Lương trung bình" bordered={false} >
                    <Statistic
                        title="Mức giá order"
                        value={salaryAvg}
                        formatter={formatter}
                    />
                </Card>
            </Col>

            <Col span={24} md={8}>
                <TasksPerformance />
            </Col>
            <Col span={24} md={16}>
                <Teams />
            </Col>
        </Row >
    )
}

export default DashboardPage;