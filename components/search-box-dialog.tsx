"use client";
import React, { useContext } from "react";
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
import { Code2, FileIcon } from "lucide-react";
import { searchBoxContext } from "@/context/search-box-context";

const searchIndex = new Flexsearch.Index({
  tokenize: "full",
});
searchQueries.forEach((item, index) => {
  searchIndex.add(index, Object.values(item).join(" "));
});

const SearchBoxDialog = () => {
  const router = useRouter();

  const { isOpen, setIsOpen } = useContext(searchBoxContext);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, setIsOpen]);

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setIsOpen(false);
      command();
    },
    [setIsOpen],
  );

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
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
              {query.type === "page" ? (
                <FileIcon className="mr-2 h-4 w-4" />
              ) : (
                <Code2 className="mr-2 h-4 w-4" />
              )}
              {query.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchBoxDialog;
