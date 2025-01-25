import { ChevronDown } from "lucide-react";
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

interface SelectContext {
  open: boolean;
  selectedOption: string | null;
  onSelectedOptionChange: (value: string) => void;
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

interface SelectProps {}
export const Select: React.FC<PropsWithChildren<SelectProps>> & {
  Trigger: typeof SelectTrigger;
  Content: typeof SelectContent;
  Item: typeof SelectItem;
} = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleToggleVisibility = useCallback(
    () => setOpen((prevState) => !prevState),
    []
  );
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleSelectedOptionChange = useCallback((value: string) => {
    setSelectedOption(value);
    handleClose();

    triggerRef.current?.focus();
  }, []);

  const value = useMemo(
    () =>
      ({
        open,
        selectedOption,
        toggleOpen: handleOpen,
        toggleClose: handleClose,
        toggleVisibility: handleToggleVisibility,
        onSelectedOptionChange: handleSelectedOptionChange,
        triggerRef,
      }) satisfies SelectContext,
    [open, selectedOption, handleOpen, handleClose, handleToggleVisibility]
  );

  useClickOutsideListener(containerRef, handleClose);

  return (
    <div className="relative" ref={containerRef}>
      <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
    </div>
  );
};

interface SelectTriggerProps {}
export const SelectTrigger: React.FC<PropsWithChildren<SelectTriggerProps>> = ({
  children,
}) => {
  const { open, triggerRef, toggleVisibility } = useSelectContext();

  return (
    <button
      ref={triggerRef}
      onClick={toggleVisibility}
      className={cn(
        "flex justify-between w-full px-4 py-3 bg-gray-100 rounded-2xl cursor-pointer focus:bg-select-focus focus:outline-none",
        open && "bg-select-focus"
      )}
      aria-expanded={open}
      aria-haspopup="menu"
    >
      {children}
      <ChevronDown />
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
      className="absolute z-10 w-full mt-2 bg-white shadow-xl rounded-xl max-h-64 overflow-hidden"
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
    onSelectedOptionChange(value);
  }, [onSelectedOptionChange, value]);

  const isNameOverflowing = useElementOverflowingListener(nameRef);
  const isDescriptionOverflowing =
    useElementOverflowingListener(descriptionRef);

  return (
    <button
      role="menuitem"
      onClick={handleSelectedOptionChange}
      className="w-full px-4 py-2 hover:bg-select-focus focus:bg-select-focus focus:outline-none"
    >
      <h3
        ref={nameRef}
        className="text-lg font-semibold truncate"
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
    </button>
  );
};

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;
