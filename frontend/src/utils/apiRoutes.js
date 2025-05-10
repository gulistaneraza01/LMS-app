import { baseUrl } from "./constaints";

const apiRoutes = {
  //client
  allCourseURL: `${baseUrl}/api/client/getcourses`,
  userDataURL: `${baseUrl}/api/auth/getuser`,
  enrolledCourses: `${baseUrl}/api/client/studentenrolledcourse`,
  becomeEducator: `${baseUrl}/api/client/becomeadmin`,
  purchaseCourseUrl: `${baseUrl}/api/client/purchasecourse`,
  courseProgress: `${baseUrl}/api/client/getcourseprogress`,
  updateCourseProgress: `${baseUrl}/api/client/updatecourseprogress`,
  courseRating: `${baseUrl}/api/client/addcourserating`,

  //admin
  addCourseURL: `${baseUrl}/api/admin/addcourse`,
  getEducatorCourseURL: `${baseUrl}/api/admin/geteducatorcourse`,
  dashboardURL: `${baseUrl}/api/admin/dashboarddata`,
  enrolledStudentURL: `${baseUrl}/api/admin/getenrolledstudent`,
};

export default apiRoutes;
