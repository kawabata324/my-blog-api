import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { name, version } from "../package.json";
import { makeGetTagsRouteHandler } from "./controllers/tag/get-tags.controller";
import { envConfig } from "./env";
import { setUpDbClientMiddleware } from "./middlewares/setup-db-client";

const app = new OpenAPIHono();

/* API Docs */
app.doc("/openapi.json", {
	openapi: "3.0.0",
	info: {
		version,
		title: name,
		description: "API 仕様書",
	},
});
app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
	type: "http",
	scheme: "bearer",
	bearerFormat: "JWT",
});
app.get("/swagger", swaggerUI({ url: "/openapi.json" }));

/* Middleware */
app.use(setUpDbClientMiddleware);

app.get("/", (c) => {
	return c.text("Hello Hono!!!");
});

/** Tags */
makeGetTagsRouteHandler(app);

const port = envConfig.APP_PORT;
console.log("Listening on port", port);

serve({
	fetch: app.fetch,
	port,
});
