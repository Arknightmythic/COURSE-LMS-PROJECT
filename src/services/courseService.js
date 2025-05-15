import { apiInsteanceAuth } from "../utils/axios";

export const getCourse = async () => {
  return apiInsteanceAuth.get("/courses").then((res) => res.data);
};
export const getCourseDetail = async (id) => {
  return apiInsteanceAuth.get(`/courses/${id}`).then((res) => res.data);
};
export const getCategory = async () => {
  return apiInsteanceAuth.get("/categories").then((res) => res.data);
};
export const createCourses = async (data) => {
  return apiInsteanceAuth
    .post("/courses", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};
export const updateCourses = async (data, id) => {
  return apiInsteanceAuth
    .put(`/courses/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const deleteCourse = async (id) => {
  return apiInsteanceAuth.delete(`/courses/${id}`).then((res) => res.data);
};
