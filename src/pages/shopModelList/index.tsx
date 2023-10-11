import { model, addBrand } from '@/services/ant-design-pro/model';
import { useAntdTable, useBoolean } from 'ahooks';
import { Table, Space, Modal, Form, Input, Switch } from 'antd';
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
  return model({ pageNo: current, pageSize }).then((res) => {
    return { total: res.data.total, list: res.data.result };
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
          新增模型
        </Button>
        <Table {...tableProps} columns={columns} rowKey="id" />
        <Modal title="新增品牌" open={modalState} onOk={onOk} onCancel={() => toggle()}>
          <Form form={form}>
            <Form.Item name="modelName" label="模型名称" required rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="modelDesc" label="模型描述" required rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="brandDesc" label="系列" required rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="rate" label="系列" required rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="publishTime"
              label="是否进入首页"
              required
              rules={[{ required: true }]}
            >
              <Switch />
            </Form.Item>
            <Form.Item name="saleStatus" label="是否已开售" required rules={[{ required: true }]}>
              <Switch />
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </>
  );
};

export default BrandList;
