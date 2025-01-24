interface SelectProps {}
export const Select: React.FC<SelectProps> & {
  Trigger: typeof SelectTrigger;
  Content: typeof SelectContent;
  Item: typeof SelectItem;
} = () => {
  return (
    <div>
      <h1>Select</h1>
    </div>
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
