import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/lib/components/ui/TabsVertical";

export function TokenSettings() {
  return (
    <Tabs className="flex flex-row h-[calc(100vh-110px)]">
      <div className="border-r border-highlight pt-8 px-6 min-w-[10%]">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="guard">Guard</TabsTrigger>
          <TabsTrigger value="extensions">Extensions</TabsTrigger>
        </TabsList>
      </div>
      <div className="pt-8 px-6">
        <TabsContent value="general">General</TabsContent>
        <TabsContent value="permissions">Permissions</TabsContent>
        <TabsContent value="guard">Guard</TabsContent>
        <TabsContent value="extensions">Extensions</TabsContent>
      </div>
    </Tabs>
  );
}
