## GitHub Copilot Chat

- Extension Version: 0.22.4 (prod)
- VS Code: vscode/1.95.3
- OS: Windows

## Network

User Settings:
```json
  "github.copilot.advanced": {
    "debug.useElectronFetcher": true,
    "debug.useNodeFetcher": false
  }
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 20.205.243.168 (16 ms)
- DNS ipv6 Lookup: Error: getaddrinfo ENOTFOUND api.github.com
- Electron Fetcher (configured): HTTP 200 (490 ms)
- Node Fetcher: HTTP 200 (234 ms)
- Helix Fetcher: HTTP 200 (755 ms)

Connecting to https://api.individual.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.114.22 (13 ms)
- DNS ipv6 Lookup: Error: getaddrinfo ENOTFOUND api.individual.githubcopilot.com
- Electron Fetcher (configured): HTTP 200 (981 ms)
- Node Fetcher: HTTP 200 (900 ms)
- Helix Fetcher: HTTP 200 (997 ms)

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).