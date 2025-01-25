import { ChevronDown, LoaderCircle } from "lucide-react";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  useClickOutsideListener,
  useElementOverflowingListener,
} from "../../hooks";
import { cn } from "../utils";
import { textToColor } from "../../utils/text-to-color";

interface SelectContext {
  open: boolean;
  selectedOptionName: string | undefined;
  selectedOptionValue: string | undefined;
  loading?: boolean;
  error?: boolean;
  onSelectedOptionChange: (name: string, value: string) => void;
  toggleVisibility: () => void;
  toggleOpen: () => void;
  toggleClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement>;
}

const SelectContext = createContext<SelectContext | null>(null);
const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(
      "Select compound components cannot be rendered outside the Select component"
    );
  }
  return context;
};

interface SelectProps {
  id?: string;
  name?: string;
  option?: string;
  onChange?: (value: string) => void;
  loading?: boolean;
  error?: boolean;
}
export const Select: React.FC<PropsWithChildren<SelectProps>> & {
  Trigger: typeof SelectTrigger;
  Content: typeof SelectContent;
  Item: typeof SelectItem;
} = ({ name, id, option, onChange, error, loading, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);

  const [selectedOptionName, setSelectedOptionName] = useState<
    string | undefined
  >(undefined);
  const [selectedOptionValue, setSelectedOptionValue] = useState(option);
  const [prevOptionValue, setPrevOptionValue] = useState(option);
  if (prevOptionValue !== option) {
    setSelectedOptionValue(option);
    setPrevOptionValue(option);
  }

  const handleToggleVisibility = useCallback(
    () => setOpen((prevState) => !prevState),
    []
  );
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleSelectedOptionChange = useCallback(
    (name: string, value: string) => {
      setSelectedOptionName(name);
      setSelectedOptionValue(value);

      onChange?.(value);

      handleClose();
      triggerRef.current?.focus();
    },
    [handleClose, onChange]
  );

  const value = useMemo(
    () =>
      ({
        open,
        selectedOptionName,
        selectedOptionValue,
        loading,
        error,
        toggleOpen: handleOpen,
        toggleClose: handleClose,
        toggleVisibility: handleToggleVisibility,
        onSelectedOptionChange: handleSelectedOptionChange,
        triggerRef,
      }) satisfies SelectContext,
    [
      open,
      selectedOptionName,
      selectedOptionValue,
      loading,
      error,
      handleOpen,
      handleClose,
      handleToggleVisibility,
      handleSelectedOptionChange,
    ]
  );

  useClickOutsideListener(containerRef, handleClose);

  return (
    <div className="relative w-128" ref={containerRef}>
      <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
      <input
        type="hidden"
        name={name}
        id={id}
        value={selectedOptionValue ?? ""}
      />
    </div>
  );
};

interface SelectTriggerProps {}
export const SelectTrigger: React.FC<PropsWithChildren<SelectTriggerProps>> = ({
  children,
}) => {
  const {
    open,
    selectedOptionName,
    error,
    loading,
    triggerRef,
    toggleVisibility,
  } = useSelectContext();

  return (
    <button
      ref={triggerRef}
      onClick={toggleVisibility}
      disabled={loading || error}
      className={cn(
        "flex justify-between w-full px-4 py-3 bg-gray-100 rounded-2xl cursor-pointer focus:bg-select-focus focus:outline-none",
        open && "bg-select-focus",
        error && "bg-red-100",
        (error || loading) && "cursor-not-allowed"
      )}
      aria-expanded={open}
      aria-haspopup="menu"
    >
      <div className="flex gap-3 flex-1 items-center">
        {selectedOptionName ? renderTextColorDot(selectedOptionName) : null}
        {selectedOptionName ?? children}
      </div>

      {loading ? <LoaderCircle className="animate-spin" /> : <ChevronDown />}
    </button>
  );
};

interface SelectContentProps {}
export const SelectContent: React.FC<PropsWithChildren<SelectContentProps>> = ({
  children,
}) => {
  const { open } = useSelectContext();

  if (!open) {
    return null;
  }

  return (
    <div
      className="absolute z-10 w-full mt-2 bg-white shadow-xl rounded-xl max-h-64 overflow-y-auto"
      role="menu"
    >
      {children}
    </div>
  );
};

interface SelectItemProps {
  value: string;
  name: string;
  description?: string;
}
export const SelectItem: React.FC<SelectItemProps> = ({
  value,
  name,
  description,
}) => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const { onSelectedOptionChange } = useSelectContext();

  const handleSelectedOptionChange = useCallback(() => {
    onSelectedOptionChange(name, value);
  }, [onSelectedOptionChange, name, value]);

  const isNameOverflowing = useElementOverflowingListener(nameRef);
  const isDescriptionOverflowing =
    useElementOverflowingListener(descriptionRef);

  return (
    <button
      role="menuitem"
      onClick={handleSelectedOptionChange}
      className={cn(
        "flex items-center gap-3 w-full px-4 py-2 hover:bg-select-focus focus:bg-select-focus focus:outline-none"
        // selectedOption === value && "bg-sky-500"
      )}
    >
      {renderTextColorDot(name)}
      <div className="overflow-hidden">
        <h3
          ref={nameRef}
          className="text-lg text-left truncate"
          title={isNameOverflowing ? name : undefined}
        >
          {name}
        </h3>
        <p
          ref={descriptionRef}
          className="text-sm text-gray-500 truncate"
          title={isDescriptionOverflowing ? description : undefined}
        >
          {description}
        </p>
      </div>
    </button>
  );
};

const renderTextColorDot = (text: string) => {
  return (
    <span
      className="block min-w-4 max-h-4 min-h-4 rounded-xl"
      style={{ backgroundColor: textToColor(text) }}
    />
  );
};

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;
