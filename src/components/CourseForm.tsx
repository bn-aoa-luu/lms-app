'use client';

import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { Course } from '@/types/course';

export const CourseForm = ({
  initialValues,
  onSubmit,
  loading,
}: {
  initialValues?: Partial<Course>;
  onSubmit: (v: any) => void;
  loading: boolean;
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Description" rules={[{ required: true }]}>
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item name="category" label="Category" rules={[{ required: true }]}>
        <Select
          options={[
            { value: '4SKILLS' },
            { value: 'GRAMMAR' },
            { value: 'VOCABULARY' },
          ]}
        />
      </Form.Item>

      <Form.Item name="level" label="Level" rules={[{ required: true }]}>
        <Select
          options={[
            { value: 'Beginner' },
            { value: 'Elementary' },
            { value: 'Intermediate' },
            { value: 'Advanced' },
          ]}
        />
      </Form.Item>

      <Form.Item name="thumbnail" label="Thumbnail URL" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading} block>
        Save
      </Button>
    </Form>
  );
};
