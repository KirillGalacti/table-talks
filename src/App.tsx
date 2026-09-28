import { useSearch } from "@/lib/router";
import { SettingsScreen } from "@/screens/settings-screen";
import { HowtoScreen } from "@/screens/howto-screen";
import { TableScreen } from "@/screens/table-screen";
import { ResultScreen } from "@/screens/result-screen";
import { ReportScreen } from "@/screens/report-screen";
import { FullReportScreen } from "@/screens/full-report-screen";
import { HistoryScreen } from "@/screens/history-screen";

export default function App() {
  const search = useSearch();
  const screen = new URLSearchParams(search).get("screen");
  switch (screen) {
    case "howto":
      return <HowtoScreen />;
    case "table":
      return <TableScreen />;
    case "result":
      return <ResultScreen />;
    case "report":
      return <ReportScreen />;
    case "full-report":
      return <FullReportScreen />;
    case "history":
      return <HistoryScreen />;
    default:
      return <SettingsScreen />;
  }
}
