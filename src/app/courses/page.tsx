'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  Card,
  Typography,
  Popconfirm,
  message,
  Image
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LogoutOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { courseAPI } from '@/services/api';
import { Course } from '@/types/course';

const { Title } = Typography;

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const [searchText, setSearchText] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | undefined>();
  const [filterLevel, setFilterLevel] = useState<string | undefined>();

  const router = useRouter();
  const { logout } = useAuth();

  // Fetch data
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await courseAPI.getAll({
        page: pagination.current,
        limit: pagination.pageSize
      });

      let filteredData = data;

      if (searchText) {
        filteredData = filteredData.filter((course: Course) =>
          course.title.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      if (filterCategory) {
        filteredData = filteredData.filter(
          (course: Course) => course.category === filterCategory
        );
      }

      if (filterLevel) {
        filteredData = filteredData.filter(
          (course: Course) => course.level === filterLevel
        );
      }

      setCourses(filteredData);
      setPagination((prev) => ({ ...prev, total: filteredData.length }));
    } catch (error) {
      message.error('Failed to fetch courses');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [pagination.current, pagination.pageSize, searchText, filterCategory, filterLevel]);

  // Delete
  const handleDelete = async (id: string | number) => {
    try {
      await courseAPI.delete(id);
      message.success('Course deleted successfully');
      fetchCourses();
    } catch {
      message.error('Failed to delete course');
    }
  };

  // Table Columns
  const columns = [
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 100,
      render: (url: string) => (
        <Image
          src={url}
          alt="thumbnail"
          width={60}
          height={60}
          className="object-cover rounded-md"
        />
      )
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_: any, record: Course) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => router.push(`/courses/edit/${record.id}`)}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete course"
            description="Are you sure you want to delete this course?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div className="p-6">
      <Card className="shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="!m-0">
            Course Management
          </Title>

          <Button icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
          <Space wrap>
            <Input
              placeholder="Search by title"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              className="w-[200px]"
            />

            <Select
              placeholder="Filter by category"
              value={filterCategory}
              onChange={setFilterCategory}
              allowClear
              className="w-[160px]"
            >
              <Select.Option value="4SKILLS">4SKILLS</Select.Option>
              <Select.Option value="GRAMMAR">GRAMMAR</Select.Option>
              <Select.Option value="VOCABULARY">VOCABULARY</Select.Option>
              <Select.Option value="SPEAKING">SPEAKING</Select.Option>
              <Select.Option value="WRITING">WRITING</Select.Option>
            </Select>

            <Select
              placeholder="Filter by level"
              value={filterLevel}
              onChange={setFilterLevel}
              allowClear
              className="w-[180px]"
            >
              <Select.Option value="Beginner">Beginner</Select.Option>
              <Select.Option value="Elementary">Elementary</Select.Option>
              <Select.Option value="Intermediate">Intermediate</Select.Option>
              <Select.Option value="Upper Intermediate">Upper Intermediate</Select.Option>
              <Select.Option value="Advanced">Advanced</Select.Option>
              <Select.Option value="Total Comprehension">Total Comprehension</Select.Option>
            </Select>
          </Space>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push('/courses/add')}
          >
            Add New Course
          </Button>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={courses}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} courses`
          }}
          onChange={(pag) =>
            setPagination({
              current: pag.current || 1,
              pageSize: pag.pageSize || 10,
              total: pagination.total
            })
          }
        />
      </Card>
    </div>
  );
};

export default function CoursesPageWrapper() {
  return (
    <ProtectedRoute>
      <CoursesPage />
    </ProtectedRoute>
  );
}
