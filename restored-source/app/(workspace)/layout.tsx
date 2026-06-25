import { AppShell } from "@/components/shell/app-shell";
import { Sidebar } from "@/components/shell/sidebar";

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell
      sidebar={<Sidebar />}
      topBar={null}
    >
      {children}
    </AppShell>
  );
}
