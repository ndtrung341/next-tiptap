import { Table as TiptapTable } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";

export const Table = TiptapTable.extend({
  addExtensions() {
    return [TableRow, TableHeader, TableCell];
  },
}).configure({
  cellMinWidth: 35,
  resizable: true,
});
