
import { Input } from "@/components/ui/input"
import { Icon } from "@/components/ui/icon"

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchBar({ searchQuery, onSearchChange }: SearchBarProps): JSX.Element {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
          <Icon className="text-gray-400">🔍</Icon>
        </div>
        <Input
          type="text"
          placeholder="Search notes by title..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 sm:pl-12 py-3 sm:py-4 text-base sm:text-lg shadow-soft"
        />
      </div>
    </div>
  );
}