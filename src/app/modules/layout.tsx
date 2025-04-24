export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout applies to /modules and /modules/[moduleId]
  // You could add specific sidebars, breadcrumbs, or context providers here if needed.
  return <>{children}</>;
}
