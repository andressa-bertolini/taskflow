import { StatCard } from "@/components/stat-card";

const stats = [
  {label: "Projects", value: 3, helper: "1 updated today"},
  {label: "Open tasks", value: 12, helper: "4 due this week"},
  {label: "Completed", value: 28, helper: "7 completed recently"},
];

const projects = [
  { name: "Course Platform", tasks: 12, progress: 75 },
  { name: "Marketing Website", tasks: 8, progress: 45 },
  { name: "Mobile App", tasks: 16, progress: 30 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-medium text-indigo-600">Overview</p>
        <h2 className="mt-1 text-3xl font-bold tracking-light">Your Dashboard</h2>
        <p className="mt-2 text-slate-600">Track your projects and tasks from one place.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Recent Projects</h3>
            <p className="text-sm text-slate-500">A quick view of current progress.</p>
          </div>

          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
            New project
          </button>
        </div>

        <div className="mt-6 space-y-5">
          {projects.map((project) => (
            <article key={project.name}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-medium text-slate-900">{project.name}</h4>
                  <p className="text-sm text-slate-500">{project.tasks} tasks</p>
                </div>
                <span className="text-sm font-medium text-slate-600">{project.progress}%</span>
              </div>

              <div className="mt-3 h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${project.progress}%`}}></div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}