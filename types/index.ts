export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface Vulnerability {
  id: string;
  name: string;
  severity: Severity;
  location: string;
  description: string;
  fix: string;
  evidence?: string;
  cwe?: string;
}

export interface ScanResult {
  id: string;
  url: string;
  timestamp: number;
  score: number;
  duration: number;
  vulnerabilities: Vulnerability[];
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
    total: number;
  };
  headers: Record<string, string>;
  ssl: SSLInfo | null;
}

export interface SSLInfo {
  valid: boolean;
  issuer: string;
  expires: string;
  daysLeft: number;
  protocol: string;
}

export interface ScanStats {
  totalScans: number;
  criticalFound: number;
  highFound: number;
  mediumFound: number;
  lowFound: number;
}

export interface HoneypotLog {
  ip: string;
  timestamp: number;
  path: string;
  method: string;
  payload: string;
  type: 'sqli' | 'xss' | 'admin' | 'unknown';
}
