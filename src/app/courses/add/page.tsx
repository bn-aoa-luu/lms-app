'use client';

import { Card, Button, Typography, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { CourseForm } from '@/components/CourseForm';
import { courseAPI } from '@/services/api';
import { useState } from 'react';

export default function AddCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submit = async (v: any) => {
    setLoading(true);
    await courseAPI.create(v);
    message.success('Course created!');
    router.push('/courses');
    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <Card>
        <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
          Back
        </Button>

        <Typography.Title level={3}>Add Course</Typography.Title>

        <CourseForm onSubmit={submit} loading={loading} />
      </Card>
    </ProtectedRoute>
  );
}
