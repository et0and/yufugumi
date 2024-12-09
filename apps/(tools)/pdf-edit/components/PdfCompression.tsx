import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface PdfCompressionProps {
  compressionLevel: number;
  setCompressionLevel: (value: number) => void;
}

export function PdfCompression({
  compressionLevel,
  setCompressionLevel,
}: PdfCompressionProps) {
  return (
    <div className="space-y-2">
      <Label>Compression level</Label>
      <div className="flex items-center space-x-2">
        <Slider
          defaultValue={[compressionLevel]}
          max={100}
          step={1}
          onValueChange={([value]) => setCompressionLevel(value)}
        />
        <span className="min-w-[3rem] text-sm">{compressionLevel}%</span>
      </div>
    </div>
  );
}
