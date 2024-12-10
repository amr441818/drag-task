import App from "../App";
import { ProjectDetails } from "../components/projectDetails/ProjectDetails";
import Home from "../pages/Home";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/projects/:projectId",
                element: <ProjectDetails />,
            }
        ],
    },
  
];

export default routes;
