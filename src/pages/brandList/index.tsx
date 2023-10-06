import { brand, addBrand } from '@/services/ant-design-pro/brand';
import { useAntdTable, useBoolean } from 'ahooks';
import { Table, Space, Modal, Form, Input } from 'antd';
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
  return brand({ pageNo: current, pageSize }).then((res) => {
    return { total: res.data.total, list: res.data.result as any };
  });
};

const BrandList = () => {
  const { tableProps, refresh } = useAntdTable(getTableData);
  const [form] = Form.useForm();
  const [modalState, { toggle }] = useBoolean(false);

  const columns = [
    { title: '名称', dataIndex: 'brandName' },
    { title: '品牌描述', dataIndex: 'brandDesc' },
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

  const onOk = () => {
    form.validateFields().then((values) => {
      console.log(values);
      addBrand({ ...values });
      toggle();
      refresh();
      form.setFieldsValue(null);
    });
  };
  return (
    <>
      <Space direction="vertical">
        <Button type="primary" onClick={() => toggle()}>
          新增品牌
        </Button>
        <Table {...tableProps} columns={columns} rowKey="id" />
        <Modal title="新增品牌" open={modalState} onOk={onOk} onCancel={() => toggle()}>
          <Form form={form}>
            <Form.Item name="brandName" label="品牌名称" required rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="brandDesc" label="品牌描述" required rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </>
  );
};

export default BrandList;
