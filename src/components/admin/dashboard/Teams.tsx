// import node module libraries
import React, { useEffect, useRef, useState } from "react";
import { Card, Table, Dropdown, Image } from 'react-bootstrap';
import { Button, Card as CardAntd, Col, Popconfirm, Row, Space, Statistic, message, notification } from "antd";
import { MoreVertical } from 'react-feather';

// import required data files
import TeamsData from "@/constants/TeamsData";
import { Link } from "react-router-dom";
import styles from 'styles/admin/dashboard/teams.module.scss';
import { callDeleteCompany, callFetchJobWithUserApply } from "@/config/api";
import { ICompany, IJob } from "@/types/backend";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import dayjs from "dayjs";
import Access from "@/components/share/access";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ALL_PERMISSIONS } from "@/config/permissions";
import queryString from "query-string";
import DataTable from "@/components/client/data-table";
import { fetchCompany } from "@/redux/slice/companySlide";

const Teams = () => {
    // const [jobsData, setJobsData] = useState<IJob[]>([])

    // useEffect(() => {
    //     const getAllData = async () => {
    //         const resumesData = await callFetchJobWithUserApply()
    //         if (resumesData.data?.length) {
    //             setJobsData(resumesData.data)
    //         }
    //     }

    //     getAllData()
    // }, [])

    const tableRef = useRef<ActionType>();

    const [isFetching, setIsFetching] = useState(false);
    const [meta, setMeta] = useState({
        "current": 1,
        "pageSize": 10,
        "pages": 3,
        "total": 8
    });
    const [job, setJob] = useState<IJob[]>([]);

    const getAllData = async (query: string) => {
        setIsFetching(true)
        const jobsData = await callFetchJobWithUserApply(query)
        if (jobsData.data) {
            setMeta(jobsData.data.meta)
            setJob(jobsData.data.result)
        }
        setIsFetching(false)
    }

    useEffect(() => {
        getAllData('')
    }, [])

    const reloadTable = () => {
        tableRef?.current?.reload();
    }

    const columns: ProColumns<IJob>[] = [
        {
            title: 'Tên job',
            dataIndex: 'name',
            width: 330,
            render: (text, record, index, action) => {
                return (
                    <>
                        {record?.name}
                    </>
                )
            },
        },
        {
            title: 'Ảnh công ty',
            dataIndex: 'company.logo',
            width: 180,
            render: (text, record, index, action) => {
                return (
                    <img className={styles['company-img']} src={`${import.meta.env.VITE_BACKEND_URL}/images/company/${record?.company?.logo}`} />
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Tên công ty',
            dataIndex: 'company.name',
            width: 330,
            render: (text, record, index, action) => {
                return (
                    <>
                        {record?.company?.name}
                    </>
                )
            },
        },
        {
            title: 'Lương',
            dataIndex: 'salary',
            width: 200,
            render: (text, record, index, action) => {
                return (
                    <>&nbsp;{(record?.salary + "")?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ</>
                )
            },
        },
        {
            title: 'Số lượng apply',
            dataIndex: 'userApply',
            width: 200,
            render: (text, record, index, action) => {
                return (
                    <>{record?.userApply}</>
                )
            },
            hideInSearch: true,
        },
    ];

    const buildQuery = (params: any, sort: any, filter: any) => {
        const clone = { ...params };



        if (clone['company.name']) clone['company.name'] = `/${clone['company.name']}/i`;
        if (clone.name) clone.name = `/${clone.name}/i`;

        let temp = queryString.stringify(clone);

        return temp;
    }

    return (
        <CardAntd className="h-100">
            <Card.Header className={styles['heading']}>
                <h1>Top những job được nhiều người quan tâm nhất</h1>
            </Card.Header>
            {/* <Table responsive className={styles['table-wrapper']}>
                <thead>
                    <tr>
                        <th>Ảnh công ty</th>
                        <th>Tên công ty</th>
                        <th>Tên job</th>
                        <th>Lương</th>
                        <th>Số lượng apply</th>
                    </tr>
                </thead>
                <tbody>
                    {jobsData.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <img className={styles['company-img']} src={`${import.meta.env.VITE_BACKEND_URL}/images/company/${item?.company?.logo}`} />
                                </td>
                                <td>
                                    <h5 className={styles['name']}>{item?.company?.name}</h5>
                                </td>
                                <td>
                                    <h5 className={styles['name']}>{item?.name}</h5>
                                </td>
                                <td>&nbsp;{(item?.salary + "")?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ</td>
                                <td>{item?.userApply}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table> */}
            <DataTable<IJob>
                actionRef={tableRef}
                headerTitle="Danh sách Job"
                rowKey="_id"
                loading={isFetching}
                columns={columns}
                dataSource={job}
                request={async (params, sort, filter): Promise<any> => {
                    const query = buildQuery(params, sort, filter);
                    getAllData(query)
                }}
                scroll={{ x: true }}
                pagination={
                    {
                        current: meta.current,
                        pageSize: meta.pageSize,
                        showSizeChanger: true,
                        total: meta.total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }
                }
                rowSelection={false}
            />
        </CardAntd>
    )
}

export default Teams