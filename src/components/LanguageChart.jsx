import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import EmptyState from "./EmptyState";

const CHART_COLORS = [
  "#58a6ff",
  "#238636",
  "#f85149",
  "#d29922",
  "#a371f7",
  "#db6d28",
  "#1f6feb",
  "#bc8cff",
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const { name, value } = payload[0].payload;

  return (
    <div className="rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 shadow-lg">
      <p className="text-sm font-semibold text-white">{name}</p>
      <p className="text-xs text-gray-400">
        {value} {value === 1 ? "repository" : "repositories"}
      </p>
    </div>
  );
}

export default function LanguageChart({ data }) {
  if (!data.length) {
    return (
      <section className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Programming Language Statistics
        </h2>

        <EmptyState
          title="No language data"
          description="This user's repositories don't have language information available."
        />
      </section>
    );
  }

  const topLanguages = data.slice(0, 8);

  return (
    <section className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 shadow-md">

      <h2 className="mb-5 text-2xl font-bold text-white">
        Programming Language Statistics
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={topLanguages}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, value }) => `${name} (${value})`}
            >
              {topLanguages.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </section>
  );
}