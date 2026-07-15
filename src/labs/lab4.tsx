import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Image, Input, Popconfirm, Spin, Table } from "antd";
import axios from "axios";

function Lab4() {
  const queryClient = useQueryClient();

  // Bài 5 - Search
  const [keyword, setKeyword] = useState("");

  // useQuery
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/stories");
      return res.data;
    },
  });

  // Bài 2 + Bài 4
  const deleteStory = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3000/stories/${id}`);
    },

    onSuccess: () => {
      // Bài 4
      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });
    },
  });

  const handleDelete = (id: number) => {
    deleteStory.mutate(id);
  };

  // Bài 5
  const filteredData = data?.filter((item: any) =>
    item.title.toLowerCase().includes(keyword.toLowerCase()),
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },

    {
      title: "Ten truyen",
      dataIndex: "title",
    },

    {
      title: "Tac gia",
      dataIndex: "author",
    },

    {
      title: "Hinh anh",
      dataIndex: "cover",
      render: (url: string) => <Image src={url} width={80} />,
    },

    // ===== Bài 1 =====
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },

    // ===== Bài 2 =====
    {
      title: "Action",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Bạn có chắc muốn xóa?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  if (isLoading) return <Spin />;

  if (isError) return <p>Lỗi khi tải dữ liệu</p>;

  return (
    <div>
      <h2>Lab4</h2>

      {/* ===== Bài 5 ===== */}
      <Input
        placeholder="Tìm kiếm truyện..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          width: 300,
          marginBottom: 20,
        }}
      />

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        // ===== Bài 3 =====
        pagination={{
          pageSize: 5,
        }}
      />
    </div>
  );
}

export default Lab4;
