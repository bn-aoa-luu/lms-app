// src/services/courseApi.ts

const STORAGE_KEY = "courses";

// helper
const getAll = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

const saveAll = (data: any[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const courseApi = {
  getAll: async () => {
    return getAll();
  },

  getById: async (id: string | number) => {
    const courses = getAll();
    const course = courses.find((c: any) => String(c.id) === String(id));
    if (!course) throw new Error("Course not found");
    return course;
  },

  create: async (data: any) => {
    const courses = getAll();
    const newCourse = {
      id: Date.now(), // tạo id
      ...data,
    };
    saveAll([...courses, newCourse]);
    return newCourse;
  },

  update: async (id: string | number, data: any) => {
    const courses = getAll();
    const updated = courses.map((c: any) =>
      String(c.id) === String(id) ? { ...c, ...data } : c
    );
    saveAll(updated);
    return true;
  },

  delete: async (id: string | number) => {
    const courses = getAll();
    const filtered = courses.filter(
      (c: any) => String(c.id) !== String(id)
    );
    saveAll(filtered);
    return true;
  },
};
