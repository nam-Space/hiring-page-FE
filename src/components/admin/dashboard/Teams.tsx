
import { useEffect, useRef, useState } from "react";
import { Card } from 'react-bootstrap';
import { Card as CardAntd } from "antd";
import styles from 'styles/admin/dashboard/teams.module.scss';
import { callFetchJobWithUserApply } from "@/config/api";
import { ICompany, IJob } from "@/types/backend";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import queryString from "query-string";
import DataTable from "@/components/client/data-table";

const Teams = () => {
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