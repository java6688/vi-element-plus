import type { h } from "vue";

export type ActionConfig = {
  auth?: string;
  text: string;
  type?: "default" | "primary" | "success" | "warning" | "danger" | "info" | "";
  size?: "large" | "default" | "small";
  icon?: string;
  disabled?: boolean;
  // 是否隐藏按钮
  hidden?: (row: any) => boolean;
  popconfirm?: {
    title?: string;
    onConfirm?: (row: any) => void;
  };
  click?: (row: any) => void;
};

export type TableColumnConfig = {
  prop?: string;
  label?: string;
  type?: "index" | "switch" | "expand" | "tag";
  // 格式化显示内容
  formatValue?: (value: any) => any;
  // render: ({ row }) =>
  //         isEdgeNode(row, "first") && isEdgeNode(row, "last")
  //           ? h(ElTag, { type: "warning" }, () => t("app.noAdjacentNode"))
  //           : null
  // 根据上面注释的render用法，输出render的类型为(row: any) => ReturnType<typeof h> | null
  render?: (row: any) => ReturnType<typeof h> | null;
  align?: "left" | "center" | "right";
  width?: string | number;
  buttons?: ActionConfig[];
  switchConfig?: {
    inlinePrompt?: boolean;
    activeText?: string;
    inactiveText?: string;
    onChange?: (row: any, value: boolean | string | number) => void;
  };
  tagConfig?: {
    type?: "success" | "info" | "warning" | "danger";
    formatType?: (value: any) => any;
  };
};
