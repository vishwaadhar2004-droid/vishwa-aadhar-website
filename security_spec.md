# Security Specification for Vishwa Aadhar Enterprises Admin Panel

## 1. Data Invariants
- Only authenticated users can perform write operations (create, update, delete).
- Public users can only read content from specific collections.
- Document IDs must follow valid patterns.
- Fields must be type-checked and size-constrained.

## 2. The Dirty Dozen (Attacker Payloads)

1. **Anonymous Write**: Attempt to update `home_content/main` without being logged in. (Expected: DENIED)
2. **Identity Spoofing**: Logged-in user 'A' tries to set themselves as an owner on a record they shouldn't own (Expected: DENIED)
3. **Type Poisoning**: Attempt to set `heading` in `home_content` to a number instead of a string. (Expected: DENIED)
4. **Shadow Field Injection**: Attempt to add `isAdmin: true` to a team member document. (Expected: DENIED)
5. **Denial of Wallet (ID Poisoning)**: Attempt to create a document with a 1MB string as the ID. (Expected: DENIED)
6. **Denial of Wallet (Size Attack)**: Attempt to set `mainDescription` in `about_page` to a 5MB string. (Expected: DENIED)
7. **Relational Sync Bypass**: Attempt to create a product without a valid slug. (Expected: DENIED)
8. **PII Leak**: Unauthorized attempt to read user private data (if any was stored). (Expected: DENIED)
9. **State Shortcut**: Attempt to bypass terminal states (if any). (Expected: NA for this CMS)
10. **Query Scraping**: Attempting a blanket query without owner restriction (Expected: DENIED if owner-based, though this is a public CMS).
11. **Malicious Link**: Attempt to inject a javascript: protocol link in `mapLink`. (Expected: DENIED via regex)
12. **Zombie Update**: Attempt to update `createdAt` field after creation. (Expected: DENIED)

## 3. Test Cases (Summary)
- `read` success for all public collections.
- `write` fail for unauthenticated.
- `write` success for authenticated.
- `write` fail for invalid schemas.
