import type { ReactNode, SVGProps } from 'react'

// Base icon wrapper that correctly applies size to width/height
function Icon({ size = 18, children, className, ...rest }: SVGProps<SVGSVGElement> & { size?: number; children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  )
}

// ---------- Navigation Icons ----------

export function OverviewIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </Icon>
  )
}

export function ConnectionIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </Icon>
  )
}

export function ExplorerIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </Icon>
  )
}

export function SimulatorIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </Icon>
  )
}

export function TestIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m9 15 2 2 4-4" />
    </Icon>
  )
}

export function WebhookIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M18 16.98h-5.99c-1.1 0-1.95.69-2.95 1.05A4.01 4.01 0 0 1 5.15 16" />
      <path d="M18 16.98h-5.99" />
      <path d="M10.5 7.5a4 4 0 1 1-5.66 5.66" />
      <path d="M7.5 7.5A4 4 0 0 0 3.5 12" />
      <circle cx="18" cy="4.98" r="2" />
    </Icon>
  )
}

export function HealthIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Icon>
  )
}

export function ApiIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </Icon>
  )
}

export function VersionsIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </Icon>
  )
}

export function AlertsIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </Icon>
  )
}

export function DiagnosticsIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </Icon>
  )
}

export function ErrorsIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </Icon>
  )
}

export function MigrationsIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </Icon>
  )
}

export function ClaudeIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </Icon>
  )
}

export function McpIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M8 16h4" />
    </Icon>
  )
}

export function SettingsIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </Icon>
  )
}

export function ChevronIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <polyline points="6 9 12 15 18 9" />
    </Icon>
  )
}

export function GitHubIcon({ size = 18, className, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...rest}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

// ---------- Utility Icons ----------

export function BellIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </Icon>
  )
}

export function BookIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </Icon>
  )
}

export function PlayIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </Icon>
  )
}

export function CheckIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  )
}

export function WarningIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </Icon>
  )
}

export function XIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  )
}

export function ArrowRightIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </Icon>
  )
}

export function ExternalLinkIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </Icon>
  )
}

export function ShieldIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </Icon>
  )
}

export function KeyIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </Icon>
  )
}

export function UsersIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Icon>
  )
}

export function CreditCardIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </Icon>
  )
}

export function GlobeIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </Icon>
  )
}

export function ZapIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </Icon>
  )
}

export function BarChartIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </Icon>
  )
}

export function SendIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </Icon>
  )
}

export function TargetIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </Icon>
  )
}

export function ClockIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </Icon>
  )
}

export function TrendingUpIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </Icon>
  )
}

export function TrendingDownIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </Icon>
  )
}

export function RefreshIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </Icon>
  )
}

export function LayersIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </Icon>
  )
}

export function CodeIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </Icon>
  )
}

export function DatabaseIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </Icon>
  )
}

export function FileTextIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </Icon>
  )
}

export function TagIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </Icon>
  )
}

export function LockIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </Icon>
  )
}

export function HelpIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </Icon>
  )
}

export function CopyIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </Icon>
  )
}

export function MailIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </Icon>
  )
}

export function SlackIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
      <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />
      <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />
      <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" />
      <path d="M14 20.5c0 .83-.67 1.5-1.5 1.5S11 21.33 11 20.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5z" />
      <path d="M10 9.5C10 10.33 9.33 11 8.5 11h-5C2.67 11 2 10.33 2 9.5S2.67 8 3.5 8h5c.83 0 1.5.67 1.5 1.5z" />
      <path d="M10 4.5C10 5.33 9.33 6 8.5 6S7 5.33 7 4.5 7.67 3 8.5 3s1.5.67 1.5 1.5z" />
    </Icon>
  )
}

// ---------- Theme Icons ----------

export function SunIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </Icon>
  )
}

export function MoonIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </Icon>
  )
}

export function ArrowLeftIcon({ size = 18, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <Icon size={size} {...rest}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </Icon>
  )
}
