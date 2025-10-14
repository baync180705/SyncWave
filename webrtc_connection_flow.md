# WebRTC Functioning and NAT Traversal

## Overview
**WebRTC (Web Real-Time Communication)** enables browsers or devices to establish **direct peer-to-peer (P2P)** communication for audio, video, and data transfer without requiring an intermediate server for media flow.  

Since most devices are behind **NATs (Network Address Translators)** or **firewalls**, peers cannot directly connect without assistance. WebRTC uses the **ICE (Interactive Connectivity Establishment)** framework with **STUN** and **TURN** servers to discover and maintain possible communication paths.

---

## Key Concepts

### 1. P2P vs Server-Mediated Connections
- **P2P:** Devices connect directly to each other; media flows over UDP.  
- **Server-Mediated:** Media is relayed through a central server, e.g., **TURN**, usually when P2P is blocked.

### 2. Built-in WebRTC Features
- **Audio/video encoding & decoding:** Built-in support for multiple codecs.  
- **NAT traversal:** Automatic handling via ICE, STUN, and TURN. (NAT Traversal refers to techniques that figure out how to reach a device behind a NAT so peers can connect directly.)
- **Jitter handling:** Smooths out network latency variations for real-time media.

---

## NAT and IP Concepts

### NAT (Network Address Translation)
- Routers assign devices **private IPs** inside a LAN (e.g., `192.168.1.10`).  
- Devices share a single **public IP** on the Internet (e.g., `203.0.113.42`).  
- NAT maps outgoing packets from private IPs to public IP/port pairs.

### Device Behind NAT
- Any device inside a private network using NAT.  
- Not directly reachable from the Internet.  
- NAT + firewall protect devices by blocking unsolicited inbound traffic.

### Public vs Local IP
- **Local IP:** Private, only valid inside the LAN.  
- **Public IP:** Assigned by ISP; visible on the Internet.  
- Router maps **local IP:port → public IP:port** for Internet communication.

---

## Firewall
- **Purpose:** Controls incoming/outgoing traffic based on rules.  
- Can block UDP traffic, arbitrary ports, or unknown protocols.  
- May prevent direct P2P connections in WebRTC → fallback to TURN.

---

## SDP and ICE

### SDP (Session Description Protocol)
- SDP is a **text-based format** that describes a device's **media capabilities** for a WebRTC session.  
- It includes:
  - Media types (audio, video, data)  
  - Codec information  (A codec is a technology that compresses digital media files (like audio, video, or images) for efficient storage and transmission, and then decompresses them for playback)
  - Network placeholders (IP addresses/ports, sometimes `0.0.0.0`)  
- Exchanged via **signaling** (TCP/WebSocket/HTTPS).  
- SDP is sent as an **offer** from one peer and returned as an **answer** from the other.

### ICE (Interactive Connectivity Establishment)
- ICE is the **framework** WebRTC uses to find all possible network paths between peers.  
- ICE gathers **candidates**:
  - **Host candidates:** Local IPs  
  - **Server-reflexive candidates:** Public IPs discovered via STUN  
  - **Relay candidates:** TURN server addresses for fallback  
- ICE performs **connectivity checks** to find the best path for P2P communication.

### Trickle ICE
- Instead of waiting for all ICE candidates to be discovered before sending SDP:  
  - Candidates are **sent incrementally** to the peer via signaling.  
  - This allows **faster connection setup**.  
- SDP may contain placeholders at first; as candidates are discovered, they “trickle in” to complete the connectivity information.

### Summary
- **SDP:** Describes media and initial connection info.  
- **ICE:** Finds usable network paths for P2P communication.  
- **Trickle ICE:** Sends candidates incrementally for faster connection setup.

---

## WebRTC Connection Setup

### 1. Signaling
- **Signaling:** Exchanging connection metadata (SDP, ICE candidates) over TCP (usually WebSocket/HTTPS).  
- **SDP (Session Description Protocol):** Describes media capabilities, codecs, and placeholder network info.  
- **ICE Candidates:** Possible network addresses/ports for communication.

### 2. SDP Handshake
- Initial SDP offer/answer describes **media types and capabilities**.  
- ICE candidates may be **trickled** afterward as they are discovered.  
- SDP handshake is typically done **once**, then candidates are incrementally shared.

### 3. ICE Candidate Gathering
- **Host candidates:** Local IPs.  
- **Server-reflexive candidates:** Public IP/port discovered via STUN.  
- **Relay candidates:** TURN server addresses for fallback.

---

## NAT Traversal

**NAT Traversal:** Techniques to allow devices behind NAT/firewall to be reachable for P2P connections.

### Steps
1. Device contacts **STUN server** to discover public IP and port.  
2. ICE candidates are sent via signaling to the peer (trickle ICE).  
3. Peer attempts direct connection to discovered public IP/port.  
4. **Router/NAT forwards packets** to the correct device.  
5. If blocked by firewall or symmetric NAT, fallback to **TURN relay**.

### Example

| Path | Status |
|------|--------|
| Direct P2P (Bob → Alice public IP) | ❌ Blocked by firewall/NAT |
| TURN Relay (Bob → TURN → Alice) | ✅ Allowed, works through NAT/firewall |

---

## STUN and TURN Servers

### STUN (Session Traversal Utilities for NAT)
- Helps a device discover **its public IP and port** as seen from the Internet.  
- Sends a request to the STUN server; the server replies with observed public IP/port.  
- Simple conceptually, but production servers handle multiple protocols, NAT types, and security.

### TURN (Traversal Using Relays around NAT)
- Acts as a **relay server** for media when direct P2P fails.  
- Works for symmetric NATs and restrictive firewalls.  
- Keeps an **active outbound connection** open from the device to relay traffic.  
- Relay addresses (TURN candidates) are shared via ICE to the peer.

---

## Symmetric NAT Handling
- Symmetric NAT assigns a **different public port for each destination**.  
- STUN alone may not allow direct P2P.  
- TURN ensures connectivity by relaying traffic over the stable connection the client opened to TURN.  

---

## Summary Flow

1. Device behind NAT → discovers public IP via STUN.  
2. Generates ICE candidates (host, server-reflexive, relay).  
3. Sends candidates to peer using signaling (TCP/WebSocket).  
4. Peer attempts direct P2P connection.  
5. If blocked by NAT/firewall → TURN relays the traffic.  
6. P2P connection established or relayed through TURN.  

---
