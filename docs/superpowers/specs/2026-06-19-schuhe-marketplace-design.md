# Gebrauchte Schuhe Marketplace — Design Spec

**Date:** 2026-06-19  
**Project:** Schuhe Marketplace  
**Status:** Design Approved

---

## Overview

Ein Web-basierter Marketplace wo Nutzer gebrauchte Schuhe kaufen und verkaufen können. Zahlungen über Kreditkarte, PayPal oder Stablecoins. Direkter Chat zwischen Käufer und Verkäufer.

---

## Tech Stack

**Frontend:** React (Browser App)  
**Backend:** Node.js + Express (Modularer Monolith)  
**Database:** PostgreSQL  
**Authentication:** Google OAuth, Facebook OAuth, Web3 Wallets (MetaMask)  
**Payments:** Stripe (Kreditkarte), PayPal, Krypto/Stablecoins  

---

## Architecture

```
React Frontend
    ↓ HTTP/WebSocket
Node.js Backend (5 Modules)
    ├── Auth Module
    ├── Products Module
    ├── Payments Module
    ├── Messaging Module
    └── Users Module
    ↓
PostgreSQL Database
```

Jedes Modul ist in separaten Ordnern organisiert mit eigenen Routes, Controllers, Services.

---

## Core Modules

### Auth Module
- Google/Facebook OAuth Login
- Web3 Wallet Connect
- JWT Session Management
- Login/Logout/Register Flows

### Products Module
- Verkäufer können Schuhe auflisten (Titel, Beschreibung, Fotos, Preis)
- Käufer können Schuhe suchen, filtern, anschauen
- Product CRUD Operations

### Payments Module
- Stripe Integration für Kreditkarten
- PayPal Integration
- Krypto/Stablecoin Support
- Order Status Tracking (Pending → Paid → Shipped → Delivered)
- Auszahlungen an Verkäufer

### Messaging Module
- Real-time Chat zwischen Käufer und Verkäufer (WebSocket)
- Nachrichtenhistorie in DB
- Benachrichtigungen bei neuen Nachrichten

### Users Module
- Verkäufer & Käufer Profile
- Bewertungen/Ratings (Phase 2)
- Account Management

---

## Database Schema

```sql
-- Users
users (id, email, name, wallet_address, profile_pic, created_at)

-- Products
products (id, seller_id, title, description, price, photos[], status, created_at)

-- Orders
orders (id, buyer_id, product_id, price, status, created_at)

-- Payments
payments (id, order_id, amount, method, status, created_at)

-- Messages
messages (id, sender_id, receiver_id, content, created_at)

-- Reviews (Phase 2)
reviews (id, from_user_id, to_user_id, rating, text, created_at)
```

---

## MVP Features (Phase 1)

Must-Have für Launch:
- ✅ Nutzer-Authentifizierung (Google, Facebook)
- ✅ Schuhe auflisten & durchsuchen
- ✅ Produkt Kaufen
- ✅ Zahlungen (Stripe + PayPal)
- ✅ Chat zwischen Käufer/Verkäufer
- ✅ Auszahlungen an Verkäufer

Phase 2 (nach Launch):
- Web3 Wallet Login
- Stablecoin Payments
- Bewertungen/Ratings
- Erweiterte Suchfilter

---

## API Endpoints (High-Level)

**Auth:**
- POST /auth/google
- POST /auth/facebook
- POST /auth/web3-connect

**Products:**
- GET /products (search, filter)
- POST /products (create listing)
- GET /products/:id
- DELETE /products/:id

**Orders:**
- POST /orders (create order)
- GET /orders (user's orders)

**Payments:**
- POST /payments/stripe
- POST /payments/paypal
- GET /payments/:id (status)

**Messages:**
- WebSocket: /messages
- GET /messages/:conversationId (history)

---

## Success Criteria

- Schuhe können gelistet und verkauft werden
- Alle 3 Zahlungsmethoden funktionieren
- Chat ist real-time
- Nutzer können Geld abheben
