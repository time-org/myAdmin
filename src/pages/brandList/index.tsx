import { brand, addBrand, updateBrand } from '@/services/ant-design-pro/brand';
import { useAntdTable, useBoolean } from 'ahooks';
import { Table, Space, Modal, Form, Input, message } from 'antd';
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
  return brand({ pageNo: current, pageSize }).then((res) => {
    return { total: res.data.total, list: res.data.result };
  });
};

const BrandList = () => {
  const { tableProps, refresh } = useAntdTable(getTableData);
  const [form] = Form.useForm();
  const [modalState, { toggle }] = useBoolean(false);
  const [updateId, setUpdateId] = useState<number | undefined>(undefined);

  const columns = [
    { title: '名称', dataIndex: 'brandName' },
    { title: '品牌描述', dataIndex: 'brandDesc' },
    { title: '模型数量', dataIndex: 'modelCount' },
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
      render: (id: number, data) => {
        return (
          <Space>
            <Button
              type="link"
              onClick={() => {
                console.error(data);
                const { brandName, brandDesc } = data;
                form.setFieldsValue({ brandName, brandDesc });
                toggle();
                setUpdateId(id);
              }}
            >
              更新
            </Button>
          </Space>
        );
      },
    },
  ];

  const onOk = () => {
    form.validateFields().then(async (values) => {
      console.log(values);
      if (updateId) {
        await updateBrand({ id: updateId, ...values });
        message.success('更新成功');
      } else {
        await addBrand({ ...values });
        message.success('新增成功');
      }
      toggle();
      refresh();
    });
  };
  return (
    <>
      <Space direction="vertical">
        <Button
          type="primary"
          onClick={() => {
            toggle();
            form.resetFields();
          }}
        >
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
