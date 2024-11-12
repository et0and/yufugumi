import PdfEditor from "@/components/PdfEditor";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-xl font-medium">PDF metadata editor</h1>
        <h2 className="text-sm pb-8">
          Edit metadata, and export as template to apply later
        </h2>
      </div>
      <PdfEditor />
    </main>
  );
}
