"use client";

import { Card, Form, Input, Button, Select, message } from "antd";
import { useRouter } from "next/navigation";
import { CATEGORIES, LEVELS } from "@/constants";
import { courseApi } from "@/services/api";

const AddCoursePage = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  // ✅ POST /course
  const onFinish = async (values: any) => {
    try {
      await courseApi.create(values); 
      message.success("Course added successfully");
      router.push("/courses");
    } catch (error) {
      message.error("Add course failed");
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <Card title="Add New Course" className="w-full max-w-xl">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ numberOfLesson: 1 }}
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
            label="Number of Lessons"
            name="numberOfLesson"
            rules={[{ required: true }]}
          >
            <Input type="number" min={1} />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Thumbnail URL"
            name="thumbnail"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={() => router.back()}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AddCoursePage;
