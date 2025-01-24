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

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, toggleOpen: handleOpen, toggleClose: handleClose }),
    [open, handleOpen, handleClose]
  );

  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  );
};

interface SelectTriggerProps {}
export const SelectTrigger: React.FC<PropsWithChildren<SelectTriggerProps>> = ({
  children,
}) => {
  const { open, toggleOpen } = useSelectContext();

  return (
    <button
      onClick={toggleOpen}
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
export const SelectContent: React.FC<SelectContentProps> = () => {
  return (
    <div>
      <h1>SelectContent</h1>
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
