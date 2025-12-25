"use client";

import { Form, Input, Button, Select, Card } from "antd";
import { Course } from "@/types/course";
import {
  LEVELS,
  CATEGORIES,
} from "@/constants/index";

interface Props {
  initialValues?: Course;
  onSubmit: (values: Course) => Promise<void>;
  loading?: boolean;
}

const CourseForm = ({
  initialValues,
  onSubmit,
  loading,
}: Props) => {
  const [form] = Form.useForm();

  return (
    <Card title="Course Form" style={{ maxWidth: 600 }}>
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true }]}
        >
          <Select options={CATEGORIES} />
        </Form.Item>

        <Form.Item
          label="Level"
          name="level"
          rules={[{ required: true }]}
        >
          <Select options={LEVELS} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Thumbnail URL"
          name="thumbnail"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
        >
          Submit
        </Button>
      </Form>
    </Card>
  );
};

export default CourseForm;
