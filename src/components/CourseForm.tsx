'use client';

import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { Course } from '@/types/course';

const { TextArea } = Input;

interface CourseFormProps {
  initialValues?: Course;
  onSubmit: (values: any) => void;
  loading?: boolean;
}

export const CourseForm: React.FC<CourseFormProps> = ({ initialValues, onSubmit, loading }) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Course Title"
        name="title"
        rules={[{ required: true, message: 'Please input course title!' }]}
      >
        <Input placeholder="Enter course title" />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please select category!' }]}
      >
        <Select placeholder="Select category">
          <Select.Option value="4SKILLS">4SKILLS</Select.Option>
          <Select.Option value="GRAMMAR">GRAMMAR</Select.Option>
          <Select.Option value="VOCABULARY">VOCABULARY</Select.Option>
          <Select.Option value="SPEAKING">SPEAKING</Select.Option>
          <Select.Option value="WRITING">WRITING</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Level"
        name="level"
        rules={[{ required: true, message: 'Please select level!' }]}
      >
        <Select placeholder="Select level">
          <Select.Option value="Beginner">Beginner</Select.Option>
          <Select.Option value="Elementary">Elementary</Select.Option>
          <Select.Option value="Intermediate">Intermediate</Select.Option>
          <Select.Option value="Upper Intermediate">Upper Intermediate</Select.Option>
          <Select.Option value="Advanced">Advanced</Select.Option>
          <Select.Option value="Total Comprehension">Total Comprehension</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input description!' }]}
      >
        <TextArea rows={4} placeholder="Enter course description" />
      </Form.Item>

      <Form.Item
        label="Thumbnail URL"
        name="thumbnail"
        rules={[
          { required: true, message: 'Please input thumbnail URL!' },
          { type: 'url', message: 'Please enter a valid URL!' }
        ]}
      >
        <Input placeholder="https://example.com/image.jpg" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          {initialValues ? 'Update Course' : 'Create Course'}
        </Button>
      </Form.Item>
    </Form>
  );
};