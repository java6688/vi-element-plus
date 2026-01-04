import type { CascaderProps } from "element-plus";

// FormItemConfig的type属性有三种可选值：input、select和cascader。
export enum FormItemType {
  INPUT = "input",
  SELECT = "select",
  CASCADER = "cascader"
}

type Option = Record<string, string | number>;

export type FormItemConfig = {
  prop: string;
  type?: FormItemType;
  label?: string;
  required?: boolean;
  placeholder?: string;
  // 是否隐藏item
  hidden?: (row: any) => boolean;
  // 类样式
  classList?: string[];
  selectConfig?: {
    label: string;
    value: string;
    options: Option[];
    visibleChange: (visible: boolean) => void;
  };
  cascaderConfig?: {
    options: Option[];
    props: CascaderProps;
    change?: (value: any) => void;
    visibleChange?: (visible: boolean) => void;
  };
};
