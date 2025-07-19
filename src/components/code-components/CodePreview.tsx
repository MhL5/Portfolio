import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type ReactNode } from "react";

type CodePreviewProps = {
  codeChildren: ReactNode;
  previewChildren: ReactNode;
};

export default function CodePreview({
  previewChildren,
  codeChildren,
}: CodePreviewProps) {
  return (
    <Tabs defaultValue="preview" className="w-full">
      <TabsList className="flex w-fit">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="preview">
        <div className="bg-background flex h-96 items-center justify-center overflow-auto rounded-lg border p-4">
          {previewChildren}
        </div>
      </TabsContent>

      <TabsContent value="code">{codeChildren}</TabsContent>
    </Tabs>
  );
}
