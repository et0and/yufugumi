"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { PDFDocument } from "pdf-lib";
import { useRef, useState } from "react";

export default function PdfEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState<
    {
      pageNumber: number;
    }[]
  >([]);
  const [metadata, setMetadata] = useState({
    filename: "",
    title: "",
    author: "",
    subject: "",
    language: "",
  });
  const importInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsLoading(true);
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      setMetadata({
        filename: selectedFile.name,
        title: pdfDoc.getTitle() || "",
        author: pdfDoc.getAuthor() || "",
        subject: pdfDoc.getSubject() || "",
        language: "",
      });

      await loadPagePreviews(pdfDoc);
      setIsLoading(false);
    }
  };

  const loadPagePreviews = async (pdfDoc: PDFDocument) => {
    const pageCount = pdfDoc.getPageCount();
    const newPages = [];

    for (let i = 0; i < pageCount; i++) {
      newPages.push({
        pageNumber: i + 1,
      });
    }

    setPages(newPages);
  };
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleDragEnd = async (result: any) => {
    if (!result.destination || !file) return;

    const items = Array.from(pages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPages(items);

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const newPdfDoc = await PDFDocument.create();

    for (const page of items) {
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [
        page.pageNumber - 1,
      ]);
      newPdfDoc.addPage(copiedPage);
    }

    const pdfBytes = await newPdfDoc.save();
    const newFile = new File([pdfBytes], file.name, {
      type: "application/pdf",
    });
    setFile(newFile);
  };

  const handleMetadataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setMetadata((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyChanges = async () => {
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    pdfDoc.setTitle(metadata.title);
    pdfDoc.setAuthor(metadata.author);
    pdfDoc.setSubject(metadata.subject);
    pdfDoc.setLanguage(metadata.language);

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = metadata.filename;
    link.click();
  };

  const exportTemplate = () => {
    const templateData = JSON.stringify(metadata, null, 2);
    const blob = new Blob([templateData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "metadata_template.json";
    link.click();
  };

  const handleImportClick = () => {
    importInputRef.current?.click();
  };

  const importTemplate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedMetadata = JSON.parse(event.target?.result as string);
          setMetadata(importedMetadata);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div>
        <Label htmlFor="pdf-upload">Upload PDF</Label>
        <Input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>
      {file && (
        <>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="filename">Filename</Label>
              <Input
                id="filename"
                name="filename"
                value={metadata.filename}
                onChange={handleMetadataChange}
                placeholder="Filename"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={metadata.title}
                onChange={handleMetadataChange}
                placeholder="Title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={metadata.author}
                onChange={handleMetadataChange}
                placeholder="Author"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={metadata.subject}
                onChange={handleMetadataChange}
                placeholder="Subject"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                name="language"
                value={metadata.language}
                onChange={handleMetadataChange}
                placeholder="Language"
              />
            </div>
            <div className="mt-6">
              <Label>Page order</Label>
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[100px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                  <span className="ml-2">Loading pages...</span>
                </div>
              ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="pages" direction="horizontal">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex gap-4 overflow-x-auto p-4"
                      >
                        {pages.map((page, index) => (
                          <Draggable
                            key={page.pageNumber}
                            draggableId={`page-${page.pageNumber}`}
                            index={index}
                          >
                            {(provided) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="p-2 w-[150px]"
                              >
                                <div className="text-center mb-2">
                                  Page {page.pageNumber}
                                </div>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </div>
            <div className="flex space-x-2 pb-4">
              <Button onClick={handleApplyChanges}>Apply changes</Button>
              <Button onClick={exportTemplate} variant="secondary">
                Export template
              </Button>
              <Button onClick={handleImportClick} variant="outline">
                Import template
              </Button>
              <input
                ref={importInputRef}
                type="file"
                accept=".json"
                onChange={importTemplate}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
