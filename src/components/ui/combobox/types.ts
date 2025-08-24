interface BaseProps {
  data: {
    value: string;
    label: string;
    icon: React.ReactNode | null;
  }[];

  placeholder: string;
  tooltipText: string;
  kbdKey: string;

  label: string;
  icon?: React.ReactNode | null;
}

export interface SingleSelectProps extends BaseProps {
  onChange?: (value: string | null) => void;
  value?: string | null;
}

export interface MultiSelectProps extends BaseProps {
  onChange?: (value: string[]) => void;
  value?: string[];
}
