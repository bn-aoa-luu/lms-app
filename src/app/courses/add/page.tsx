'use client';

import React, { useState } from 'react';
import { Card, Typography, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { CourseForm } from '@/components/CourseForm';
import { courseAPI } from '@/services/api';

const { Title } = Typography;

function AddCoursePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await courseAPI.create(values);
      message.success('Course created successfully!');
      router.push('/courses');
    } catch (error) {
      message.error('Failed to create course');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Card>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.back()}
          style={{ marginBottom: 16 }}
        >
          Back
        </Button>
        
        <Title level={2}>Add New Course</Title>
        
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <CourseForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </Card>
    </div>
  );
}

export default function AddCoursePageWrapper() {
  return (
    <ProtectedRoute>
      <AddCoursePage />
    </ProtectedRoute>
  );
}