import { addSeries, series } from '@/services/ant-design-pro/series';
import { useAntdTable, useBoolean } from 'ahooks';
import { Form, Input, Modal, Space, Table, message } from 'antd';
import Button from 'antd/es/button';
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
  return series({ pageNo: current, pageSize }).then((res) => {
    return { total: res.data.total, list: res.data.result };
  });
};

const SeriesList = () => {
  const { tableProps, refresh } = useAntdTable(getTableData);
  const [form] = Form.useForm();
  const [modalState, { toggle }] = useBoolean(false);

  const columns = [
    { title: '名称', dataIndex: 'seriesName' },
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

  const onOk = async () => {
    const values = await form.validateFields();
    addSeries({ ...values })
      .then(() => {
        message.success('新增成功');
        toggle();
        refresh();
        form.resetFields();
      })
      .catch((error) => message.error(error.message));
  };
  return (
    <>
      <Space direction="vertical">
        <Button type="primary" onClick={() => toggle()}>
          新增系列
        </Button>
        <Table {...tableProps} columns={columns} rowKey="id" scroll={{ x: 'max' }} />
        <Modal title="新增品牌" open={modalState} onOk={onOk} onCancel={() => toggle()}>
          <Form form={form}>
            <Form.Item name="seriesName" label="系列名称" required rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </>
  );
};

export default SeriesList;
