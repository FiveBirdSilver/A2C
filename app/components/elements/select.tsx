import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CustomSelect() {
  return (
    <Select>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="TYPE" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="cluster">Cluster</SelectItem>
          <SelectItem value="marker">Marker</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
