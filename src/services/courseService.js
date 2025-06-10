import { apiInsteanceAuth } from "../utils/axios";

export const getCourse = async () => {
  return apiInsteanceAuth.get("/courses").then((res) => res.data);
};
export const getCourseDetail = async (id, isPreview = false) => {
  return apiInsteanceAuth
    .get(`/courses/${id}${isPreview ? "?preview=true" : ""}`)
    .then((res) => res.data);
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

export const createContent = async (data) => {
  return apiInsteanceAuth
    .post(`/courses/contents`, data)
    .then((res) => res.data);
};

export const getDetailContent = async (id) => {
  return apiInsteanceAuth
    .get(`/courses/contents/${id}`)
    .then((res) => res.data);
};

export const updateContent = async (data, id) => {
  return apiInsteanceAuth
    .put(`/courses/contents/${id}`, data)
    .then((res) => res.data);
};

export const deleteDetailContent = async (id) => {
  return apiInsteanceAuth
    .delete(`/courses/contents/${id}`)
    .then((res) => res.data);
};

export const getStudentsCourse = async(id) =>{
  return apiInsteanceAuth.get(`/courses/students/${id}`).then((res)=>res.data)
}

export const addStudentsCourse = async(data,id) =>{
  return apiInsteanceAuth.post(`/courses/students/${id}`,data).then((res)=>res.data)
}

export const deleteStudentsCourse = async(data,id) =>{
  return apiInsteanceAuth.put(`/courses/students/${id}`,data).then((res)=>res.data)
}

