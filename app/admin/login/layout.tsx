// This layout overrides the parent admin layout for the login route only
// so the sidebar is NOT rendered on the login page.
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
