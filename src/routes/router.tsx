import App from "../App";
import { ProjectDetails } from "../components/projectDetails/ProjectDetails";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/projects/:projectId",
                element: <ProjectDetails />,
            }
        ],
    },
  
];

export default routes;
