import { brand } from "@/services/ant-design-pro/brand";
import { useAntdTable } from "ahooks";
import { Result, Table } from "antd";


interface Result {
  total: number;
  list: any[];
}

const getTableData = ({ current, pageSize }: { current: number, pageSize: number }): Promise<Result> => {
  return brand({ current, pageSize }).then((res) => ({ total: 0, list: res as any }))
}

const BrandList = () => {
  const { tableProps } = useAntdTable(getTableData)
  const columns = [{ title: '名称', dataIndex: 'brandName' },
    { title: '品牌描述', dataIndex: 'brandDesc' },
    { title: '创建时间', dataIndex: 'createdAt' },
     { title: '更新时间', dataIndex: 'updatedAt' }]
  return <>
    <Table {...tableProps} columns={columns} />
  </>
}

export default BrandList;
