import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import {
  CourseDetail,
  CourseList,
  Dashboard,
  Error,
  Home,
  MyCourse,
  MyEnrollments,
  Player,
  StudentEnrolled,
} from "./pages";
import Educator from "./layouts/Educator";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="course" element={<CourseList />} />
        <Route path="course/:id" element={<CourseDetail />} />
        <Route path="myEnrollment" element={<MyEnrollments />} />
        <Route path="player/:courseId" element={<Player />} />
      </Route>

      <Route path="/educator" element={<Educator />}>
        <Route index element={<Dashboard />} />
        <Route path="addCourse" element={<CourseDetail />} />
        <Route path="myCourse" element={<MyCourse />} />
        <Route path="studentEnrolled" element={<StudentEnrolled />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Route>
  )
);

function App() {
  return (
    <div className="min-h-screen bg-white">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
