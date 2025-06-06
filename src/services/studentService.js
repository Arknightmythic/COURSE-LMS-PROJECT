import { apiInsteanceAuth } from "../utils/axios";

export const getStudents = async () => {
  return apiInsteanceAuth.get("/student").then((res) => res.data);
};
export const getDetailStudents = async (id) => {
  return apiInsteanceAuth.get(`/student/${id}`).then((res) => res.data);
};

export const createStudents = async (data) => {
  return apiInsteanceAuth
    .post("/student", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const updateStudents = async (data,id) => {
  return apiInsteanceAuth
    .put(`/student/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const deleteStudent = async (id) => {
  return apiInsteanceAuth.delete(`/student/${id}`).then((res) => res.data);
};
