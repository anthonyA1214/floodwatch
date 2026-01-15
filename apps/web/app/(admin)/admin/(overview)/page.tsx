import FloodAlertsCard from "@/components/admin/dashboard-components/floodalerts-card";
import TotalReportsCard from "@/components/admin/dashboard-components/totalreports-card";
import ActiveFloodAlertsCard from "@/components/admin/dashboard-components/activefloodalerts-card";
import SafetyLocationCard from "@/components/admin/dashboard-components/safetylocation-card";

export default function Dashboard() {
  return (
    // dashboard

    <section className="flex-1 bg-white p-8 rounded-2xl">
      <h1 className="text-4xl font-bold text-black">
        Hello, John Doe
      </h1>
      <p className="mt-2 text-gray-600">
        Here’s what is happening with Emergency Aid Hub Today
      </p>

      {/* Cards row */}
      <div className="mt-8 flex gap-6">
        <FloodAlertsCard />
        <TotalReportsCard />
      </div>

      {/* Active Flood Alert */}
      <div className="mt-4 rounded-xl border border-gray-300 bg-white p-6">
        <h1 className="mb-4 text-xl">
          Active Flood Alerts
        </h1>

        <ActiveFloodAlertsCard />
      </div>

      {/* Safety Location */}
      <div className="mt-4 rounded-xl border border-gray-300 bg-white p-6">
        <h1 className="mb-4 text-xl">
          Safety Location
        </h1>

        <SafetyLocationCard />
      </div>
    </section>
  );
}
