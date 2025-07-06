import Navbarr from "../../components/utility/Navbarr";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="system">
      <Navbarr />
      {children}
    </main>
  );
}
