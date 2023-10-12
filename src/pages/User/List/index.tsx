import { user } from '@/services/ant-design-pro/user';
import { useAntdTable } from 'ahooks';
import { Space, Table } from 'antd';
import dayjs from 'dayjs';

interface Result {
  total: number;
  list: any[];
}

const getTableData = ({
  current,
  pageSize,
}: {
  current: number;
  pageSize: number;
}): Promise<Result> => {
  return user({ pageNo: current, pageSize }).then((res) => {
    return { total: res.data.total, list: res.data.result };
  });
};

const BrandList = () => {
  const { tableProps } = useAntdTable(getTableData);

  const columns = [
    { title: '用户名', dataIndex: 'username' },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render: (value: string) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm');
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      render: (value: string) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm');
      },
    },
  ];

  return (
    <>
      <Space direction="vertical">
        <Table {...tableProps} columns={columns} rowKey="id" />
      </Space>
    </>
  );
};

export default BrandList;
