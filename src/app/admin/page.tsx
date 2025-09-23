import AdminLayout from "./layout";

export default function AdminPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold">Welcome to the Admin Panel</h1>
        <p className="text-muted-foreground">Select a section from the sidebar to start editing.</p>
      </div>
    </AdminLayout>
  );
}
