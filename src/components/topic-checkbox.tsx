"use client";

interface TopicCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

export function TopicCheckbox({ checked, onChange }: TopicCheckboxProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onChange();
      }}
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors ${
        checked
          ? "border-green-500 bg-green-500"
          : "border-2 border-border/60 bg-transparent"
      }`}
    >
      {checked && (
        <svg
          viewBox="0 0 12 12"
          fill="none"
          className="h-3 w-3 origin-center transition-transform duration-200"
          style={{ transform: checked ? "scale(1)" : "scale(0)" }}
        >
          <path
            d="M2 6L5 9L10 3"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
