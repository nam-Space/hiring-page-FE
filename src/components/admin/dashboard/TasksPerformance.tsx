import React, { useEffect, useState } from "react";
import { Card, Dropdown } from 'react-bootstrap';
import { Card as CardAntd, } from "antd";
import dynamic from 'next/dynamic';
import styles from 'styles/admin/dashboard/tasks.module.scss';
import { callFetchResumeDashboard } from "@/config/api";
import { APPROVED, REJECTED, REVIEWING } from "@/constants/status";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const TasksPerformance = () => {
    const [approveResumePercent, setApproveResumePercent] = useState(0)
    const [reviewingResumePercent, setReviewingResumePercent] = useState(0)
    const [rejectResumePercent, setRejectResumePercent] = useState(0)

    const [approveResumeCount, setApproveResumeCount] = useState(0)
    const [reviewingResumeCount, setReviewingResumeCount] = useState(0)
    const [rejectResumeCount, setRejectResumeCount] = useState(0)

    const [perfomanceChartSeries, setPerfomanceChartSeries] = useState([0, 0, 0])

    useEffect(() => {
        const getAllData = async () => {
            const resumesData = await callFetchResumeDashboard()
            if (resumesData.data?.length) {
                let cntApproveResume = 0
                let cntReviewingResume = 0
                let cntRejectResume = 0
                resumesData.data.forEach(resume => {
                    if (resume.status === APPROVED) {
                        cntApproveResume++
                    }
                    else if (resume.status === REVIEWING) {
                        cntReviewingResume++
                    }
                    else if (resume.status === REJECTED) {
                        cntRejectResume++
                    }
                })
                let approveResumePercentCalc = cntApproveResume * 100 / (cntApproveResume + cntReviewingResume + cntRejectResume)
                let reviewingResumePercentCalc = cntReviewingResume * 100 / (cntApproveResume + cntReviewingResume + cntRejectResume)
                let rejectResumePercentCalc = cntRejectResume * 100 / (cntApproveResume + cntReviewingResume + cntRejectResume)
                setApproveResumePercent(approveResumePercentCalc)
                setReviewingResumePercent(reviewingResumePercentCalc)
                setRejectResumePercent(rejectResumePercentCalc)

                setApproveResumeCount(cntApproveResume)
                setReviewingResumeCount(cntReviewingResume)
                setRejectResumeCount(cntRejectResume)

                setPerfomanceChartSeries([approveResumePercentCalc, reviewingResumePercentCalc, rejectResumePercentCalc])
            }
        }

        getAllData()
    }, [])

    // const perfomanceChartSeries = [100, 78, 89];
    const perfomanceChartOptions = {
        dataLabels: { enabled: !1 },
        labels: ['Direct', 'Referral', 'Organic'],
        colors: ['#28a745', '#ffc107', '#dc3545'],
        plotOptions: {
            radialBar: {
                startAngle: -168,
                endAngle: -450,
                hollow: {
                    size: '55%',
                },
                track: {
                    background: 'transaprent',
                },
                dataLabels: {
                    show: false,
                }
            }
        },
        chart: { type: 'radialBar' },
        stroke: { lineCap: "round" },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        height: 300
                    }
                }
            },
            {
                breakpoint: 5000,
                options: {
                    chart: {
                        height: 320
                    }
                }
            }
        ]
    };

    return (
        <CardAntd className="h-100">
            {/* card body  */}
            <Card.Body>
                <div className={styles["heading"]}>
                    <div>
                        <h1>Trạng thái CV</h1>
                    </div>
                </div>
                <div className={styles["chart"]}>
                    <Chart options={perfomanceChartOptions as any} series={perfomanceChartSeries} type="radialBar" />
                </div>
                {/* icon with content  */}
                <div className={styles["wrapper"]}>
                    <div className={styles['success']}>
                        <h1>{(approveResumePercent).toFixed(2)}%</h1>
                        <p>Thành công</p>
                    </div>
                    <div className={styles['reviewing']}>
                        <h1>{(reviewingResumePercent).toFixed(2)}%</h1>
                        <p>Đang xem xét</p>
                    </div>
                    <div className={styles['reject']}>
                        <h1>{(rejectResumePercent).toFixed(2)}%</h1>
                        <p>Loại</p>
                    </div>
                </div>
                <div className={styles['quantity-wrapper']}>
                    <div className={styles['success']}>
                        Số CV được chấp thuận: {approveResumeCount}
                    </div>
                    <div className={styles['reviewing']}>
                        Số CV đang xem xét: {reviewingResumeCount}
                    </div>
                    <div className={styles['reject']}>
                        Số CV đã bị loại: {rejectResumeCount}
                    </div>
                </div>
            </Card.Body>
        </CardAntd >
    )
}

export default TasksPerformance