export let courses = Array.from({ length: 14 }).map((_, i) => ({
  id: i + 1,
  title: `Course ${i + 1}`,
  category: ["4SKILLS", "GRAMMAR", "VOCAB"][i % 3],
  level: ["BEGINNER", "INTERMEDIATE", "ADVANCED"][i % 3],
  numberOfLesson: 10 + i,
  description: "Sample course description",
  thumbnail: "https://dummyjson.com/image/150",
}));
