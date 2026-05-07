import { TablesGrid } from "@/widgets/tables-grid";
import { authApi } from "@/shared/lib/api";

export default function TablesPage() {
  const handleTestRequest = async () => {
    try {
      const data = await authApi.test();
      console.log("Fetch: Success!", data);
    } catch (err) {
      console.error("Fetch: Network error", err);
    }
  };
  return (
    <div>
      <p>Hello, tables</p>
      <button onClick={handleTestRequest}>Check protected api call</button>
      <TablesGrid />
    </div>
  );
}
