"use client";

import { useEffect, useState } from "react";
import { Card, Form, Input, Button, Select, message, Spin } from "antd";
import { useParams, useRouter } from "next/navigation";
import { CATEGORIES, LEVELS } from "@/constants";
import { courseApi } from "@/services/api";

const EditCoursePage = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await courseApi.getById(id);
        form.setFieldsValue(data);
      } catch {
        message.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, form]);

  const onFinish = async (values: any) => {
    try {
      await courseApi.update(id, values);
      message.success("Course updated successfully");
      router.push("/courses");
    } catch {
      message.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 flex justify-center">
      <Card title="Edit Course" className="w-full max-w-xl">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Category" name="category" rules={[{ required: true }]}>
            <Select options={CATEGORIES} />
          </Form.Item>

          <Form.Item label="Level" name="level" rules={[{ required: true }]}>
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

          <Form.Item label="Thumbnail URL" name="thumbnail" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={() => router.back()}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default EditCoursePage;
