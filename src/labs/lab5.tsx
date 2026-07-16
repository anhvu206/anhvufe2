import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Divider, Form, Input, message, Select } from "antd";
import axios from "axios";

interface Category {
  id?: number;
  title: string;
  description: string;
  active: boolean;
}

interface Story {
  title: string;
  author: string;
  cover: string;
  description: string;
  categoryId: number;
}

function Lab5() {
  const categoryMutation = useMutation({
    mutationFn: async (data: Category) => {
      const res = await axios.post("http://localhost:3000/categories", data);
      return res.data;
    },

    onSuccess: () => {
      message.success("Thêm danh mục thành công");
    },

    onError: () => {
      message.error("Thêm danh mục thất bại");
    },
  });

  const onCategoryFinish = (values: Category) => {
    categoryMutation.mutate(values);
  };

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],

    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/categories");
      return res.data;
    },
  });

  const storyMutation = useMutation({
    mutationFn: async (data: Story) => {
      const res = await axios.post("http://localhost:3000/stories", data);
      return res.data;
    },

    onSuccess: () => {
      message.success("Thêm truyện thành công");
    },

    onError: () => {
      message.error("Thêm truyện thất bại");
    },
  });

  const onStoryFinish = (values: Story) => {
    storyMutation.mutate(values);
  };

  return (
    <div style={{ maxWidth: 1000 }}>
      <h2>Lab 5 </h2>

      <h3>Bài 1 - Thêm danh mục</h3>

      <Form layout="vertical" onFinish={onCategoryFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên danh mục!",
            },
            {
              min: 3,
              message: "Tên danh mục phải có ít nhất 3 ký tự!",
            },
            {
              max: 50,
              message: "Tên danh mục không được quá 50 ký tự!",
            },
          ]}
        >
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả!",
            },
            {
              min: 10,
              message: "Mô tả phải có ít nhất 10 ký tự!",
            },
          ]}
        >
          <Input.TextArea rows={3} placeholder="Nhập mô tả" />
        </Form.Item>

        <Form.Item name="active" valuePropName="checked">
          <Checkbox>Active</Checkbox>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={categoryMutation.isPending}
        >
          Thêm danh mục
        </Button>
      </Form>

      <Divider />

      <h3>Thêm truyện</h3>

      <Form layout="vertical" onFinish={onStoryFinish}>
        <Form.Item
          label="Tên truyện"
          name="title"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên truyện!",
            },
            {
              min: 3,
              message: "Tên truyện phải có ít nhất 3 ký tự!",
            },
            {
              max: 100,
              message: "Tên truyện không được quá 100 ký tự!",
            },
          ]}
        >
          <Input placeholder="Nhập tên truyện" />
        </Form.Item>

        <Form.Item
          label="Tác giả"
          name="author"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên tác giả!",
            },
            {
              min: 3,
              message: "Tên tác giả phải có ít nhất 3 ký tự!",
            },
          ]}
        >
          <Input placeholder="Nhập tên tác giả" />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="cover"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập link ảnh!",
            },
            {
              type: "url",
              message: "Link ảnh không hợp lệ!",
            },
          ]}
        >
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả!",
            },
            {
              min: 10,
              message: "Mô tả phải có ít nhất 10 ký tự!",
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Nhập mô tả truyện" />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="categoryId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn danh mục!",
            },
          ]}
        >
          <Select
            placeholder="Chọn danh mục"
            options={categories.map((item: Category) => ({
              value: item.id,
              label: item.title,
            }))}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={storyMutation.isPending}
        >
          Thêm truyện
        </Button>
      </Form>
    </div>
  );
}

export default Lab5;
