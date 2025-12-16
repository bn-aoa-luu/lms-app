'use client';

import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, message, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter, useParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { CourseForm } from '@/components/CourseForm';
import { courseAPI } from '@/services/api';
import { Course } from '@/types/course';

const { Title } = Typography;

function EditCoursePage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await courseAPI.getById(id);
        setCourse(data);
      } catch (error) {
        message.error('Failed to fetch course');
        console.error(error);
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await courseAPI.update(id, values);
      message.success('Course updated successfully!');
      router.push('/courses');
    } catch (error) {
      message.error('Failed to update course');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container">
        <Card>
          <Title level={3}>Course not found</Title>
          <Button onClick={() => router.push('/courses')}>Back to Courses</Button>
        </Card>
      </div>
    );
  }

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
        
        <Title level={2}>Edit Course</Title>
        
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <CourseForm 
            initialValues={course} 
            onSubmit={handleSubmit} 
            loading={loading} 
          />
        </div>
      </Card>
    </div>
  );
}

export default function EditCoursePageWrapper() {
  return (
    <ProtectedRoute>
      <EditCoursePage />
    </ProtectedRoute>
  );
}