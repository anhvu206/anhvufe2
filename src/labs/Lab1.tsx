import { useState } from "react";
import { Layout, Form, Input, Button, Table, Modal } from "antd";

const { Header, Content } = Layout;

function Lab1() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  // dữ liệu table
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      name: "Nguyễn Văn A",
      email: "a@gmail.com",
      role: "Admin",
    },
    {
      key: 2,
      name: "Trần Văn B",
      email: "b@gmail.com",
      role: "User",
    },
  ]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];

  // THÊM USER
  const handleAdd = () => {
    form.validateFields().then((values) => {
      const newUser = {
        key: Date.now(),
        ...values,
      };

      setDataSource([...dataSource, newUser]);

      form.resetFields();
      setOpen(false);
    });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Header style={{ color: "white" }}>Header</Header>

        <Content style={{ padding: 20 }}>
          <h2>Form Đăng Ký</h2>

          {/* FORM (demo, không lưu cũng được) */}
          <Form layout="vertical">
            <Form.Item label="Name">
              <Input />
            </Form.Item>

            <Form.Item label="Email">
              <Input />
            </Form.Item>

            <Form.Item label="Password">
              <Input.Password />
            </Form.Item>

            <Button type="primary">Submit</Button>
          </Form>

          <br />

          {/* BUTTON ADD */}
          <Button type="primary" onClick={() => setOpen(true)}>
            Add User
          </Button>

          {/* MODAL */}
          <Modal
            title="Thêm User"
            open={open}
            onCancel={() => setOpen(false)}
            onOk={handleAdd}
          >
            <Form form={form} layout="vertical">
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Nhập name!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Nhập email!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Nhập role!" }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>

          <br />
          <br />

          {/* TABLE */}
          <Table columns={columns} dataSource={dataSource} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Lab1;