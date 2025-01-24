import { ChevronDown } from "lucide-react";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface SelectContext {
  open: boolean;
  toggleVisibility: () => void;
  toggleOpen: () => void;
  toggleClose: () => void;
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
  const [open, setOpen] = useState(false);

  const handleToggleVisibility = useCallback(
    () => setOpen((prevState) => !prevState),
    []
  );
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({
      open,
      toggleOpen: handleOpen,
      toggleClose: handleClose,
      toggleVisibility: handleToggleVisibility,
    }),
    [open, handleOpen, handleClose, handleToggleVisibility]
  );

  return (
    <div className="relative">
      <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
    </div>
  );
};

interface SelectTriggerProps {}
export const SelectTrigger: React.FC<PropsWithChildren<SelectTriggerProps>> = ({
  children,
}) => {
  const { open, toggleVisibility } = useSelectContext();

  return (
    <button
      onClick={toggleVisibility}
      className="flex justify-between w-full px-4 py-3 bg-gray-100 rounded-2xl cursor-pointer focus:bg-select-focus focus:outline-none"
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
    <div className="absolute z-10 w-full mt-2 bg-white shadow-xl rounded-xl max-h-64">
      {children}
    </div>
  );
};

interface SelectItemProps {}
export const SelectItem: React.FC<SelectItemProps> = () => {
  return (
    <div>
      <h1>SelectContentItem</h1>
    </div>
  );
};

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;
