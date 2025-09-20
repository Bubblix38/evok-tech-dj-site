import Header from "../Header";

export default function HeaderExample() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-8">
        <p className="text-muted-foreground font-body">Header component with responsive navigation</p>
      </div>
    </div>
  );
}