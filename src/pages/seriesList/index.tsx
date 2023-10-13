import { brandList } from '@/services/ant-design-pro/brand';
import { addSeries, series, updateSeries } from '@/services/ant-design-pro/series';
import { useAntdTable, useBoolean, useRequest } from 'ahooks';
import { Form, Input, Modal, Select, Space, Table, message } from 'antd';
import Button from 'antd/es/button';
import dayjs from 'dayjs';
import { useState } from 'react';

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
  const [options, setOptions] = useState();
  const [id, setId] = useState<number | undefined>(undefined);
  const { runAsync } = useRequest(brandList, { manual: true });

  const columns = [
    { title: '名称', dataIndex: 'seriesName' },
    { title: '品牌名称', dataIndex: 'brandName' },
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
      dataIndex: 'id',
      render: (id: number) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setId(id);
                toggle();
              }}
            >
              更新
            </Button>
          </>
        );
      },
    },
  ];

  const onOk = async () => {
    const values = await form.validateFields();
    try {
      if (id) {
        await updateSeries({ id, ...values });
      } else {
        await addSeries({ ...values });
        message.success(id ? '更新成功' : '新增成功');
        toggle();
        refresh();
        form.resetFields();
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <>
      <Space direction="vertical">
        <Button
          type="primary"
          onClick={async () => {
            const data = await runAsync({});
            setOptions(data);
            toggle();
          }}
        >
          新增系列
        </Button>
        <Table {...tableProps} columns={columns} rowKey="id" scroll={{ x: 'max' }} />
        <Modal
          title="新增系列"
          open={modalState}
          onOk={onOk}
          onCancel={() => {
            toggle();
          }}
        >
          <Form form={form}>
            <Form.Item name="seriesName" label="系列名称" required rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="brandId" label="品牌" required rules={[{ required: true }]}>
              <Select options={options} />
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </>
  );
};

export default SeriesList;
