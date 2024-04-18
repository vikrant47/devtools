import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Input,
  Kbd,
  Listbox,
  ListboxItem,
  ListboxSection,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react';
import React, { ReactNode } from 'react';
import { SearchIcon } from '../icons';
export const ListboxWrapper = ({ children }: { children: ReactNode }) => (
  <div className="w-full border-small px-1 py-2 border-default-200 dark:border-default-100">
    {children}
  </div>
);
export interface SearchResult {
  title: string;
  description: string;
  href: string;
  icon?: string;
}
export interface SearchBarProps {
  searchText: string;
  onSearch: (searchText: string) => void;
  results: SearchResult[];
}
export function SearchBar({ searchText, onSearch, results }: SearchBarProps) {
  return (
    <div className="">
      <Autocomplete
        onKeyDown={(e: any) => {
          if (e.key === 'Enter') {
            window.location.href = '/search?q=' + e.target.value;
          }
        }}
        onSelectionChange={(e) => {
          window.location.href = e + '';
        }}
        className="max-w-xs py=0"
        aria-label="Search"
        placeholder="Search Here"
        scrollShadowProps={{
          isEnabled: true
        }}
        inputProps={{
          classNames: {
            input: 'ml-1',
            inputWrapper: 'h-[40px] py-0'
          }
        }}
        startContent={<SearchIcon className="text-default-400" strokeWidth={2.5} size={20} />}>
        {results.map((item, i) => (
          <AutocompleteItem
            key={item.href}
            onSelect={() => {
              window.location.href = item.href;
            }}>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small">{item.title}</span>
                  <span className="text-tiny text-default-400">{item.description}</span>
                </div>
              </div>
            </div>
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
}
