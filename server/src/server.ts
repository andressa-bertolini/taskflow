import express, {
    type ErrorRequestHandler,
    type RequestHandler,
} from "express";
import cors from "cors";
import "dotenv/config";
import { prisma } from "./lib/prisma.ts";

const app = express();
const port = Number(process.env.PORT) || 5000;

const requestLogger: RequestHandler = (request, _response, next) => {
    console.log(`${request.method} ${request.path}`);
    next();
};

app.use(requestLogger);
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(express.json());

app.get('/api/health', (_request, response) => {
    response.json({message: 'Taskflow API is running'});
});

const getProjects: RequestHandler = async (request, response) => {
    const search = 
        typeof request.query.search === "string"
            ? request.query.search.trim()
            : "";

    const projects = await prisma.project.findMany({
        where: search
        ? {
            name: {
                contains: search,
                mode: "insensitive"
            }
        }
        : undefined,
        orderBy: {
            createdAt: "desc"
        }
    })

    response.json({data: projects});
}

const getProjectById: RequestHandler = async (request, response) => {
    const id = Number(request.params.id);

    if(!Number.isInteger(id)){
        response.status(404).json({message: "Project not found"});
        return;
    }

    const project = await prisma.project.findUnique({
        where: { id }
    });

    if(!project) {
        response.status(404).json({ message: "Project not found" });
        return;
    }

    response.json({data: project});
}

const createProject: RequestHandler = async (request, response) => {
    const body = request.body as
    | { name?: unknown; description?: unknown }
    | undefined;

    if(!body || typeof body.name !== "string" || !body.name.trim()) {
        response.status(400).json({ message: "Project name is required"});
        return;
    }

    const project = await prisma.project.create({
        data: {
            name: body.name.trim(),
            description:
                typeof body.description === "string"
                ? body.description.trim()
                : ""
        }
    });

    response.status(201).json({ data: project });
};

app.get("/api/projects", getProjects);
app.get("/api/projects/:id", getProjectById);
app.post("/api/projects", createProject);

app.use((request, response) => {
    response.status(404).json({
        message: `Route ${request.method} ${request.path} not found`,
    });
});

const errorHandler: ErrorRequestHandler = (
    error,
    _request,
    response,
    _next,
) => {
    console.error(error);
    response.status(500).json({message: "SOmething went wrong"});
}

app.use(errorHandler);

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});