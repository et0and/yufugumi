"use client";

import { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PdfEditor() {
  const [file, setFile] = useState<File | null>(null);
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
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Read the PDF and extract metadata
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      setMetadata({
        filename: selectedFile.name,
        title: pdfDoc.getTitle() || "",
        author: pdfDoc.getAuthor() || "",
        subject: pdfDoc.getSubject() || "",
        language: "", // Left blank for user to fill in
      });
    }
  };

  const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          <div className="flex space-x-2">
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
      )}
    </div>
  );
}
