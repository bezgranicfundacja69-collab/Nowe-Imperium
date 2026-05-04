# OmniMarket Security Specification

## Data Invariants
1. Listings must have a valid `sellerId` matching the creator's UID.
2. Conversations can only be read/written by participants.
3. Messages must have a `senderId` matching the auth UID and belong to a conversation where the user is a participant.
4. Transactions can only be accessed by the user they belong to.
5. Reviews must be linked to the reviewer's UID and the target user's subcollection.

## The Dirty Dozen Payloads (Rejected Cases)
1. **Identity Spoofing**: Creating a listing with another user's `sellerId`.
2. **Conversation Peek**: Reading `conversations` where `request.auth.uid` is not in `participants`.
3. **Ghost Message**: Sending a message to a conversation the user is not part of.
4. **Transaction Theft**: Reading or writing someone else's `transactions`.
5. **Price Poisoning**: Setting a listing price to a extremely large value or negative.
6. **Immutable Hack**: Trying to change `sellerId` on an existing listing.
7. **Timestamp Fraud**: Setting `createdAt` to a future or past date instead of `request.time`.
8. **Shadow Review**: Creating a review in another user's subcollection with a fake `reviewerId`.
9. **Listing Overwrite**: Updating a listing owned by someone else.
10. **State Shortcut**: Updating `aiVerified` on a listing without being an admin (if applicable).
11. **Junk ID**: Creating a document with a 1MB string as the ID.
12. **Blanket Query**: Querying all `conversations` without filtering by `participants`.

## Proposed Security Rules Structure
We will use the Master Gate pattern with synchronous lookups where required (e.g., checking conversation participants before allowing messages).
