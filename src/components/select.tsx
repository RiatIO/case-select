import {
  createContext,
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
export const Select: React.FC<SelectProps> & {
  Trigger: typeof SelectTrigger;
  Content: typeof SelectContent;
  Item: typeof SelectItem;
} = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, toggleOpen: handleOpen, toggleClose: handleClose }),
    [open, handleOpen, handleClose]
  );

  return (
    <SelectContext.Provider value={value}>
      <div>
        <h1>Select</h1>
      </div>
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps {}
export const SelectTrigger: React.FC<SelectTriggerProps> = () => {
  return (
    <div>
      <h1>SelectTrigger</h1>
    </div>
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
