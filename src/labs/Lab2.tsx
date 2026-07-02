import { useState } from "react";
import {
  Table,
  Image,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
} from "antd";

interface User {
  key: number;
  id: number;
  name: string;
  age: number;
  major: string;
  avatar: string;
}

function Lab2() {
  const [dataSource, setDataSource] = useState<User[]>([
    {
      key: 1,
      id: 1,
      name: "Nam",
      age: 20,
      major: "IT",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      key: 2,
      id: 2,
      name: "Linh",
      age: 21,
      major: "Business",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      key: 3,
      id: 3,
      name: "Hà",
      age: 19,
      major: "Design",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [form] = Form.useForm();

  // OPEN ADD
  const openAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // OPEN EDIT
  const openEdit = (record: User) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  // SAVE
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingUser) {
        // EDIT
        const newData = dataSource.map((item) =>
          item.id === editingUser.id ? { ...item, ...values } : item,
        );

        setDataSource(newData);
        message.success("Cập nhật thành công!");
      } else {
        // ADD
        const newUser: User = {
          key: Date.now(),
          id: Date.now(),
          ...values,
        };

        setDataSource([...dataSource, newUser]);
        message.success("Thêm user thành công!");
      }

      setIsModalOpen(false);
      form.resetFields();
    });
  };

  // DELETE
  const handleDelete = (id: number) => {
    setDataSource(dataSource.filter((item) => item.id !== id));
    message.success("Xoá thành công!");
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Age", dataIndex: "age" },
    { title: "Major", dataIndex: "major" },
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (value: string) => <Image width={50} src={value} />,
    },
    {
      title: "Action",
      render: (_: any, record: User) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button type="primary" onClick={() => openEdit(record)}>
            Sửa
          </Button>

          <Popconfirm
            title="Xoá user này?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={openAdd} style={{ marginBottom: 16 }}>
        + Thêm User
      </Button>

      <Table columns={columns} dataSource={dataSource} />

      <Modal
        title={editingUser ? "Sửa User" : "Thêm User"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Nhập tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tuổi"
            name="age"
            rules={[{ required: true, message: "Nhập tuổi!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Major"
            name="major"
            rules={[{ required: true, message: "Nhập ngành học!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Avatar URL"
            name="avatar"
            rules={[{ required: true, message: "Nhập avatar!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Lab2;
