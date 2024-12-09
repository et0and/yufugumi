import PdfEditor from "@/components/PdfEditor";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center py-4">
        <h1 className="text-xl font-medium">OdenPDF</h1>
        <h2 className="text-sm pb-8">
          Edit PDF metadata, and export as template to apply later
        </h2>
      </div>
      <PdfEditor />
    </main>
  );
}
