"use client";
import React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Flexsearch from "flexsearch";
import { searchQueries } from "@/lib/search-queries";
import { useRouter } from "next/navigation";
import { FileIcon } from "lucide-react";

const searchIndex = new Flexsearch.Index({
  tokenize: "full",
});
searchQueries.forEach((item, index) => {
  searchIndex.add(index, Object.values(item).join(" "));
});

const SearchBoxDialog = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Links">
          {searchQueries.map((query) => (
            <CommandItem
              key={query.url}
              value={query.name}
              onSelect={() => {
                runCommand(() => router.push(query.url as string));
              }}
            >
              <FileIcon className="mr-2 h-4 w-4" />
              {query.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchBoxDialog;
