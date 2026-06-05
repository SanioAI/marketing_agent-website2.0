import type { LucideProps } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  Ban,
  BarChart3,
  Boxes,
  CircleHelp,
  ClipboardList,
  FolderTree,
  GitBranch,
  Globe,
  Link2,
  Package,
  PenLine,
  Rocket,
  ScrollText,
  Search,
  Shield,
  Tag,
  Type,
  Zap,
} from "lucide-react";

export const appIcons = {
  AlertTriangle,
  ArrowRight,
  Ban,
  BarChart3,
  Boxes,
  CircleHelp,
  ClipboardList,
  FolderTree,
  GitBranch,
  Globe,
  Link2,
  Package,
  PenLine,
  Rocket,
  ScrollText,
  Search,
  Shield,
  Tag,
  Type,
  Zap,
} as const;

export type AppIconName = keyof typeof appIcons;

type AppIconProps = LucideProps & {
  name: AppIconName;
};

export function AppIcon({ name, size = 18, strokeWidth = 1.5, ...props }: AppIconProps) {
  const Icon = appIcons[name];
  return <Icon size={size} strokeWidth={strokeWidth} aria-hidden {...props} />;
}
