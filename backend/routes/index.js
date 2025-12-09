import globalErrorHandler from "../middlewares/globalErrorHandler.js";
import invalidRoute from "../middlewares/invalidRoute.js";
import documentRoute from "./documentRoute.js";

const routes = (app) => {
    app.use("/api/documents", documentRoute);
    app.use(invalidRoute);
    app.use(globalErrorHandler);
}

export default routes;