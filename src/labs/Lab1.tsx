import { useState } from "react";
import { Layout, Form, Input, Button, Table, Modal } from "antd";

const { Header, Sider, Content } = Layout;

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

const data = [
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
];

function Lab1() {
  const [open, setOpen] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Header style={{ color: "white" }}>Header</Header>

        <Content style={{ padding: 20 }}>
          <h2>Form Đăng Ký</h2>

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

          <Button type="primary" onClick={() => setOpen(true)}>
            Add User
          </Button>

          <Modal
            title="Thêm User"
            open={open}
            onCancel={() => setOpen(false)}
            onOk={() => setOpen(false)}
          >
            <Form layout="vertical">
              <Form.Item label="Name">
                <Input />
              </Form.Item>

              <Form.Item label="Email">
                <Input />
              </Form.Item>

              <Form.Item label="Role">
                <Input />
              </Form.Item>
            </Form>
          </Modal>

          <br />
          <br />

          <Table columns={columns} dataSource={data} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Lab1;
