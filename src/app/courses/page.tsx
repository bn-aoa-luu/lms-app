"use client";

import { Table, Select, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { PAGE_SIZE, CATEGORIES, LEVELS } from "@/constants";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<string | undefined>();
  const [level, setLevel] = useState<string | undefined>();

  const { logout } = useAuth();
  const router = useRouter();

  // 👉 FETCH COURSE DATA
  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setFiltered(data);
      });
  }, []);

  // 👉 FILTER LOGIC
  useEffect(() => {
    let result = courses;

    if (keyword) {
      result = result.filter((c) =>
        c.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (category) {
      result = result.filter((c) => c.category === category);
    }

    if (level) {
      result = result.filter((c) => c.level === level);
    }

    setFiltered(result);
  }, [keyword, category, level, courses]);

  // 👉 LOGOUT HANDLER
  const handleLogout = () => {
    logout();              // clear token
    router.push("/login"); // redirect
  };

  return (
    <ProtectedRoute>
      <div className="p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Course List</h1>
          <Button danger onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* FILTER */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <Input
            placeholder="Search by name"
            onChange={(e) => setKeyword(e.target.value)}
          />

          <Select
            placeholder="Category"
            allowClear
            options={CATEGORIES}
            onChange={setCategory}
            style={{ width: 150 }}
          />

          <Select
            placeholder="Level"
            allowClear
            options={LEVELS}
            onChange={setLevel}
            style={{ width: 150 }}
          />
        </div>

        {/* TABLE */}
        <Table
          rowKey="id"
          dataSource={filtered}
          pagination={{ pageSize: PAGE_SIZE }}
          columns={[
            { title: "Name", dataIndex: "title" },
            { title: "Category", dataIndex: "category" },
            { title: "Level", dataIndex: "level" },
            { title: "Lessons", dataIndex: "numberOfLesson" },
            { title: "Description", dataIndex: "description" },
            {
              title: "Thumbnail",
              dataIndex: "thumbnail",
              render: (src) => <img src={src} width={60} />,
            },
          ]}
        />
      </div>
    </ProtectedRoute>
  );
}
