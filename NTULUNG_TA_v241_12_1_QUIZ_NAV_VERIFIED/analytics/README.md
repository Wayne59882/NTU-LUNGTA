# Site activity counters

`site_metrics.sqlite3` is created at runtime and is intentionally not packaged.
The counter stores only random browser/session identifiers and timestamps; it does not store IP addresses, names, emails, or question content.

- **Online now**: distinct anonymous browser IDs with a heartbeat during the last 90 seconds.
- **Total visitors**: distinct anonymous browser IDs ever registered by this deployment.

Counts are approximate because clearing browser storage or using another browser/device creates a new anonymous browser ID.
