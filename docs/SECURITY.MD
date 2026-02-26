# Security Policy

## Supported Versions

Brand Variant Studio is a modern, entirely client-side application. Due to the nature of local execution via modern web browsers without a persistent backend authentication layer, version support is dictated strictly by the host environment (Vite dependencies).

| Version | Supported          | Runtime Vulnerabilities |
| ------- | ------------------ | ----------------------- |
| > 1.0.0 | :white_check_mark: | Low (Client-side Only)  |
| < 1.0.0 | :x:                | Deprecated              |

## Storage Security
- All user generated designs and selected brand variants, including 'Liked' configurations, are securely kept within the local browser context via **IndexedDB**. 
- There is **no telemetry, no external database, and no server-side sync**. Your data does not leave your local machine environment, effectively nullifying traditional remote extraction vulnerabilities.
- For local cleanup, users can purge their browser cache or utilize the developer tools `Application > IndexedDB` deletion flow.

## Reporting a Vulnerability

If you've spotted a core dependency vulnerability (e.g., within React, Tailwind, Vite, or html2canvas) please open a standard GitHub Issue and append the `[SECURITY]` flag to the ticket name so we can prioritize patching the lock file.

Please adhere to standard disclosure standards—do not abuse vulnerabilities or target individual contributors.
