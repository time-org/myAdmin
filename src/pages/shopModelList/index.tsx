import { brandList } from '@/services/ant-design-pro/brand';
import { addModel, model } from '@/services/ant-design-pro/model';
import { seriesList } from '@/services/ant-design-pro/series';
import { useAntdTable, useBoolean, useRequest } from 'ahooks';
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Switch,
  Table,
  message,
} from 'antd';
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

  const { data } = useRequest(brandList);
  const { data: seriesData } = useRequest(seriesList);

  const columns = [
    { title: '名称', dataIndex: 'modelName' },
    { title: '模型描述', dataIndex: 'modelDesc' },
    { title: '品牌比例', dataIndex: 'rate' },
    { title: '品牌名称', dataIndex: 'brandName' },
    { title: '长', dataIndex: 'modelLength' },
    { title: '宽', dataIndex: 'modelWidth' },
    { title: '高', dataIndex: 'modelHeight' },
    { title: '重量', dataIndex: 'modelWeight' },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      render: (value: string) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '是否进入首页',
      dataIndex: 'homeStatus',
      render: (value: boolean) => (value ? '是' : '否'),
    },
    {
      title: '是否开售',
      dataIndex: 'saleStatus',
      render: (value: boolean) => (value ? '是' : '否'),
    },
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
    {
      title: '操作',
      dataIndex: 'op',
      fixed: 'right',
      render: () => {
        return (
          <Space>
            <Button type="link">更新模型</Button>
          </Space>
        );
      },
    },
  ];

  const onOk = async () => {
    const values = await form.validateFields();
    addModel({ ...values })
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
          新增模型
        </Button>
        <Table {...tableProps} columns={columns} rowKey="id" scroll={{ x: 'max-content' }} />
        <Modal
          title="新增品牌"
          open={modalState}
          onOk={onOk}
          onCancel={() => toggle()}
          width="700px"
        >
          <Form form={form}>
            <Form.Item name="modelName" label="模型名称" required rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="modelDesc" label="模型描述" required rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="brandId" label="品牌" required rules={[{ required: true }]}>
              <Select options={data?.data} />
            </Form.Item>
            <Form.Item name="series" label="系列" required rules={[{ required: true }]}>
              <Select options={seriesData?.data} />
            </Form.Item>
            <Form.Item name="rate" label="品牌比例" required rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Space>
              <Form.Item name="modelLength" label="尺寸信息" required rules={[{ required: true }]}>
                <InputNumber addonBefore="长" />
              </Form.Item>
              <Form.Item name="modelWidth" required rules={[{ required: true }]}>
                <InputNumber addonBefore="宽" />
              </Form.Item>
              <Form.Item name="modelHeight" required rules={[{ required: true }]}>
                <InputNumber addonBefore="高" />
              </Form.Item>
              <Form.Item name="modelWeight">
                <InputNumber addonBefore="重" />
              </Form.Item>
            </Space>
            <Form.Item name="publishTime" label="发布时间">
              <DatePicker showTime />
            </Form.Item>
            <Form.Item name="homeStatus" label="是否进入首页" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item name="saleStatus" label="是否已开售">
              <Switch />
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </>
  );
};

export default BrandList;
